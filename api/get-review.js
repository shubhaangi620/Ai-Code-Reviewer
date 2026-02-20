const aiService = require("../backend/src/services/ai.service");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await aiService(code);
    return res.status(200).json({ review: response });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: "AI service failed" });
  }
}