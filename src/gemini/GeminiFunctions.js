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


export const sendMsg = async (prompt, image) => {
  try{
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const imageData = await readImageAsDataUrl(image);
  
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1], // Remove data URL prefix
        mimeType: image.type
      }
    };
  
    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text().replace(/^```json|```$/g, '').trim();
    console.log(responseText);
    const jsonResult = JSON.parse(responseText);
    console.log(jsonResult)
    return jsonResult;
  } 
  catch (error) {
    console.log(error)
  }
}

const readImageAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

let initialContext = null; // Store the initial context globally

export const sendChat = async (prompt, inventory = [], forecast = []) => {
  try {
    const chat = getChatSession();

    // If context is not set, set it initially
    if (!initialContext) {
      initialContext = `
        You are a farm assistant chatbot. Here is the current inventory of crops and their details:

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

        Your task is to answer the user's queries related to these crops, providing storage advice, health status, and potential issues based on weather and inventory details.
        Respond concisely, using the available context and avoiding unnecessary explanations.
      `;
    }

    const completePrompt = initialContext + "\n" + prompt; // Combine context and prompt

    const result = await chat.sendMessage(completePrompt);
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
      - "sellByDate": estimated date when the crop should be sold by (in YYYY-MM-DD format), based on its shelf life and current storage conditions
      - "spoilagePrediction": (a number between 0 and 1 representing spoilage risk, where 0 = very safe and 1 = extremely high spoilage risk)

    2. "summary":
      - "totalPotentialRevenue": number (sum of all crop values, (based on average US market price × amount in kg) for each crop summed up)
      - "potentialLossIfNoAction": number (estimated loss due to risky conditions based on the revenue you found)
      - "comment": brief analysis (e.g., risk outlook, revenue tips)

    Also, for risk factors, keep them varried, so if theyre not so great varry from medium to high risk at your own discretion where it fits best but keep varried results for graph purposes

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