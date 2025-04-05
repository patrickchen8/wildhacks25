import { GenerativeModel } from "@google/generative-ai";
import { genAI } from "./GeminiConfig";

let session = null;

export const getChatSession = () => {
  if (!session) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    session = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1024,
      },
    });
  }
  return session;
};

export const sendHarvestChat = async (prompt) => {
  try {
    const chat = getChatSession();
    const result = await chat.sendMessage(prompt);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "⚠️ There was a problem responding to your question.";
  }
};