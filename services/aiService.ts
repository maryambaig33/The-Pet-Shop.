import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "../types";

export const getPetRecommendations = async (lifestyle: string): Promise<AIRecommendation[]> => {
  try {
    // Initialize client here to avoid top-level crashes if env vars are not ready during module load
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-2.5-flash";
    
    const schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          breed: { type: Type.STRING, description: "Name of the pet breed or type" },
          reason: { type: Type.STRING, description: "Why this is a good match for the user" },
          careLevel: { type: Type.STRING, description: "Low, Medium, or High maintenance" },
          matchPercentage: { type: Type.INTEGER, description: "A number between 0 and 100 indicating match strength" }
        },
        required: ["breed", "reason", "careLevel", "matchPercentage"],
      }
    };

    const response = await ai.models.generateContent({
      model,
      contents: `You are a veterinary behaviorist and pet matchmaker. 
      Based on this user's lifestyle description: "${lifestyle}", 
      recommend 3 specific pet breeds or types (cats, dogs, or small animals).
      Be honest about care levels.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a helpful, warm, and knowledgeable pet expert.",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    // Robust JSON parsing: Find the array start and end to ignore potential preambles
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');

    if (firstBracket === -1 || lastBracket === -1 || firstBracket > lastBracket) {
      throw new Error("Invalid JSON format received");
    }
    
    const jsonString = text.substring(firstBracket, lastBracket + 1);
    return JSON.parse(jsonString) as AIRecommendation[];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

export const getPetCareAdvice = async (query: string): Promise<string> => {
  try {
    // Initialize client here to avoid top-level crashes
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: "You are a friendly veterinary assistant. Keep answers concise (under 100 words), practical, and encouraging. Use emojis occasionally.",
      }
    });
    
    return response.text || "I'm having trouble thinking right now. Please ask again!";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Sorry, I couldn't connect to the pet knowledge base.";
  }
};