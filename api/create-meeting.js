const { callGraphAPI, corsHeaders } = require('./_utils');

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subject, startTime, endTime, attendeeEmail, description } = req.body;

    // Validate input
    if (!subject || !startTime || !endTime || !attendeeEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create meeting event
    const event = {
      subject: subject,
      body: {
        contentType: 'HTML',
        content: description || 'Meeting scheduled via web portal',
      },
      start: {
        dateTime: new Date(startTime).toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(endTime).toISOString(),
        timeZone: 'UTC',
      },
      attendees: [
        {
          emailAddress: {
            address: attendeeEmail,
            name: attendeeEmail.split('@')[0],
          },
          type: 'required',
        },
      ],
      isOnlineMeeting: true,
      onlineMeetingProvider: 'teamsForBusiness',
    };

    // Create event in organizer's calendar
    const createdEvent = await callGraphAPI(
      `/users/${process.env.ORGANIZER_EMAIL}/calendar/events`,
      'POST',
      event
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      message: 'Meeting created successfully',
      meetingId: createdEvent.id,
      onlineMeetingUrl: createdEvent.onlineMeeting?.joinUrl,
      event: {
        id: createdEvent.id,
        subject: createdEvent.subject,
        start: createdEvent.start.dateTime,
        end: createdEvent.end.dateTime,
        attendeeEmail: attendeeEmail,
      },
    });
  } catch (error) {
    console.error('Error creating meeting:', error.response?.data || error.message);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({
      error: 'Failed to create meeting',
      details: error.response?.data?.error?.message || error.message,
    });
  }
};
