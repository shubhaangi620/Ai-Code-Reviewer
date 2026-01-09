// listmodels.js
require("dotenv").config(); // Load API key from .env

const apiKey = process.env.GOOGLE_GEMINI_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
  try {
    // Use Node.js built-in fetch
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("API error:", data.error);
      return;
    }

    console.log("Available Google Gemini models:\n");
    data.models.forEach((model) => {
      console.log("Model name:", model.name);
      console.log("Supported methods:", model.supportedGenerationMethods?.join(", "));
      console.log("-----");
    });

  } catch (err) {
    console.error("Request failed:", err);
  }
}

listModels();
