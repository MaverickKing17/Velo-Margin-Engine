
import { GoogleGenAI } from "@google/genai";
import { CarListing } from "../types";

export const getCarInsights = async (car: CarListing): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a luxury car arbitrage expert for the GTA (Greater Toronto Area) market, analyze this vehicle:
    Vehicle: ${car.year} ${car.make} ${car.model} ${car.trim}
    Price: $${car.price.toLocaleString()} CAD
    Odometer: ${car.odometer} KM
    Rarity Keywords: ${car.rarityKeywords.join(', ')}
    Description: ${car.description}

    Evaluation Logic Requirements:
    1. Mileage Tiers: Units under 10,000km are "Collector Grade" (+15% Vibe). Units 10k-30k are "Driver Grade" (Neutral).
    2. Color Premium: "Hero" or "Launch" colors (e.g., Shark Blue, Python Green, Rosso Corsa) command a $10k-$15k premium over "Standard" colors (Silver, Black, White) in the US export market.
    3. Spec Rarity: Mention if the trim (e.g., Weissach, Touring, Pista) is a "Hard Asset" that holds value better.

    Provide a 3-bullet point "Broker Intel" summary. 
    Focus on:
    - Valuation vs. standard market inventory.
    - Specific desirability for US export (target states like FL, CA, TX).
    - Profit margin risk (e.g., high mileage impact on resale).
    
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
