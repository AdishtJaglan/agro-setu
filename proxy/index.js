const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const { userMessage } = req.body;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
    });

    const aiResponse = response.text;

    res.json({ message: aiResponse });
  } catch (error) {
    console.error(
      "Error proxying request:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to process your request",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
