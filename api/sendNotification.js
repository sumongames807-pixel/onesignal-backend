const axios = require('axios');

export default async function handler(request, response) {
  // Allow requests from your app
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const { creatorName } = request.body;

  // ⚠️ Hardcoded for testing — not safe for production
  const ONE_SIGNAL_APP_ID = "7ab1982b-a43a-46a4-8e36-65d711a1a253";
  const ONE_SIGNAL_REST_API_KEY = "rha4cu6kqe2hffa6ihmphz3ol";

  const message = {
    app_id: ONE_SIGNAL_APP_ID,
    contents: { "en": `${creatorName} has created a new Challenge! Tap to join.` },
    headings: { "en": "🔥 New Challenge Available!" },
    included_segments: ["All"]
  };

  try {
    await axios.post('https://onesignal.com/api/v1/notifications', message, {
      headers: {
        'Authorization': `Basic ${ONE_SIGNAL_REST_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return response.status(500).json({ success: false });
  }
}
