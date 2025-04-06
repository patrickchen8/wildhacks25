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

export const sendChat = async (prompt) => {
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

export const sendHarvestChat = async (inventory, forecast = []) => {
  try {
    const chat = getChatSession();

    const prompt = `
    You are an assistant for smallholder farmers managing post-harvest crops.

    Analyze the following inventory and 5-day weather forecast, and return a JSON object with:

    1. "recommendations": an array where each item includes:
      - "crop": name of the crop
      - "riskLevel": "Low", "Medium", or "High"
      - "recommendation": short storage advice
      - "action": e.g. "Sell now", "Improve storage", "Safe for now"
      - "totalPotentialRevenue": estimated revenue in USD (based on average US market price × amount in kg)

    2. "summary":
      - "totalPotentialRevenue": number (sum of all crop values, (based on average US market price × amount in kg) for each crop summed up)
      - "potentialLossIfNoAction": number (estimated loss due to risky conditions based on the revenue you found)
      - "comment": brief analysis (e.g., risk outlook, revenue tips)

    Use realistic US market prices from the past week. Use the data below:

    Inventory:
    ${inventory.map(item => `
    Crop: ${item.crop}
    Storage Type: ${item.storageType}
    Health Status: ${item.healthStatus}
    Amount: ${item.amount}
    Harvest Date: ${item.harvestDate}
    Sell By Date: ${item.sellByDate}
    Last Update: ${item.lastUpdate}
    `).join("\n")}

    Weather Forecast:
    ${forecast.map(day => `
    Date: ${day.date}
    Condition: ${day.day.condition.text}
    Max Temp: ${day.day.maxtemp_c}°C
    Min Temp: ${day.day.mintemp_c}°C
    Humidity: ${day.day.avghumidity}%
    Chance of Rain: ${day.day.daily_chance_of_rain}%
    `).join("\n")}

    Respond with ONLY valid JSON and no extra text.
    `;

    let responseText = (await chat.sendMessage(prompt)).response.text();

    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```(json)?/g, "").trim();
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini API error:", error);
    return [];
  }
};