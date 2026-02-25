const { callGraphAPI, corsHeaders } = require('./_utils');

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get meeting ID from query parameter
    const { meetingId } = req.query;

    if (!meetingId) {
      return res.status(400).json({ error: 'Missing meeting ID' });
    }

    // Cancel the event in Outlook
    await callGraphAPI(
      `/users/${process.env.ORGANIZER_EMAIL}/calendar/events/${meetingId}`,
      'DELETE'
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      success: true,
      message: 'Meeting cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling meeting:', error.response?.data || error.message);
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Handle 404 - meeting already deleted
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        error: 'Meeting not found',
        details: 'Meeting may have already been cancelled',
      });
    }
    
    res.status(500).json({
      error: 'Failed to cancel meeting',
      details: error.response?.data?.error?.message || error.message,
    });
  }
};
