const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model:  "gemini-2.0-flash-lite"  });
    const prompt = `Review the following code for quality and improvements:\n\n${code}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ review: text });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: "AI service failed" });
  }
};