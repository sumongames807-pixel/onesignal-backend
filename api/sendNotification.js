export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { title, message } = req.body;

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YOUR_REST_API_KEY"   // apna OneSignal REST API Key daal
      },
      body: JSON.stringify({
        app_id: "YOUR_ONESIGNAL_APP_ID",   // apna OneSignal App ID daal
        included_segments: ["All"],
        headings: { en: title },
        contents: { en: message }
      })
    });

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
