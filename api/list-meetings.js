const { callGraphAPI, corsHeaders } = require('./_utils');

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get current and future events from organizer's calendar
    const now = new Date().toISOString();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90); // Next 90 days
    
    const endpoint = `/users/${process.env.ORGANIZER_EMAIL}/calendar/events?$filter=start/dateTime ge '${now}' and start/dateTime le '${futureDate.toISOString()}'&$orderby=start/dateTime&$top=50`;
    
    const response = await callGraphAPI(endpoint, 'GET');

    // Format the meetings
    const meetings = response.value.map(event => ({
      id: event.id,
      meeting_id: event.id,
      subject: event.subject,
      start_time: event.start.dateTime,
      end_time: event.end.dateTime,
      attendee_email: event.attendees && event.attendees.length > 0 
        ? event.attendees[0].emailAddress.address 
        : 'No attendees',
      onlineMeetingUrl: event.onlineMeeting?.joinUrl || null,
      created_at: event.createdDateTime,
    }));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      meetings: meetings,
      count: meetings.length,
    });
  } catch (error) {
    console.error('Error fetching meetings:', error.response?.data || error.message);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({
      error: 'Failed to fetch meetings',
      details: error.response?.data?.error?.message || error.message,
    });
  }
};
