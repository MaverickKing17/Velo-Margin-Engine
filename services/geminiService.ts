
import { GoogleGenAI } from "@google/genai";
import { CarListing } from "../types";

export const getCarInsights = async (car: CarListing): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a 2026 luxury car arbitrage expert for the GTA (Greater Toronto Area) market, analyze this specific unit:
    Vehicle: ${car.year} ${car.make} ${car.model} ${car.trim}
    Price: $${car.price.toLocaleString()} CAD
    Odometer: ${car.odometer} KM
    VIN: ${car.vin}
    CPO Status: ${car.cpoStatus ? 'Platinum Certified' : 'Standard'}
    Software-Defined Value (FoD): $${car.hiddenSoftwareValueCad} unlockable via OTA
    Market Velocity (DTT): ${car.daysToTurnGta} days in GTA vs ${car.daysToTurnUs} days in US
    
    Analysis Requirements (2026 Audit Standards):
    1. Hidden Value (FoD): Explain the profit potential of unlocking software modules (e.g., Performance Boosts, ADAS upgrades).
    2. Market Velocity Arbitrage: Contrast the Days-to-Turn delta. Why is this unit a "Faster Turn" in the US?
    3. FX Protection: Verify the settlement risk based on current 1.38 settlement rate.

    Provide a concise "2026 Broker Intelligence" summary in 3 bullet points. 
    Focus on the "Hidden Software Margin" and "Velocity Arbitrage."
    
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
    return response.text || "2026 Market Intelligence unavailable at this time.";
  } catch (error) {
    console.error("Gemini 2026 Audit Error:", error);
    return "Failed to load real-time 2026 market insights.";
  }
};
