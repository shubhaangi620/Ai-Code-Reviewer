const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  console.log("body:", req.body);

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await aiService(code);
    return res.json({ review: response });
  } catch (err) {
    console.error("Gemini error:", err.message);

    return res.status(500).json({
      error: "AI service failed",
      details: err.message
    });
  }
};
