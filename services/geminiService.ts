
import { GoogleGenAI } from "@google/genai";
import { CarListing } from "../types";

export const getCarInsights = async (car: CarListing): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a luxury car expert, analyze this vehicle for a Toronto-based broker:
    Vehicle: ${car.year} ${car.make} ${car.model} ${car.trim}
    Price: $${car.price.toLocaleString()} CAD
    Odometer: ${car.odometer} KM
    Rarity Keywords: ${car.rarityKeywords.join(', ')}
    Description: ${car.description}

    Provide a concise, 3-bullet point "Broker Intel" summary. 
    Focus on market rarity in the GTA, desirability for US export, and specific margin opportunities (e.g., "manual transmissions in this year are fetching 20% premiums in Florida").
    Return ONLY the 3 bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    return response.text || "Insight unavailable at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to load AI insights.";
  }
};
