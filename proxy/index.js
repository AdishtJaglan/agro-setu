import { GoogleGenerativeAI } from '@google/generative-ai';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST requests to /api/gemini
    if (request.method !== "POST" || !request.url.endsWith("/api/gemini")) {
      return new Response("Not Found", { status: 404 });
    }

    try {
      const { userMessage } = await request.json();
      
      // Initialize Google Generative AI with the API key from environment
      const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      // Generate content
      const result = await model.generateContent(userMessage);
      const response = result.response;
      const text = response.text();

      // Return the response
      return new Response(JSON.stringify({ message: text }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to process your request",
          details: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};
