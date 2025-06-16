
import { GoogleGenAI } from "@google/genai";
import type { GeminiServiceResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set.");
  // This won't stop the app from loading but API calls will fail.
  // In a real production app, you might want to handle this more gracefully or prevent app initialization.
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "NO_API_KEY_CONFIGURED" }); // Provide a fallback to prevent constructor error if API_KEY is undefined

export const generateAIProofObjectives = async (
  systemInstruction: string,
  userPrompt: string
): Promise<GeminiServiceResponse> => {
  if (!API_KEY) {
     return { success: false, error: "API sleutel is niet geconfigureerd. Controleer de serverconfiguratie." };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        // Default thinking is enabled, which is generally good for quality.
        // If low latency is critical (e.g., game AI), one might add:
        // thinkingConfig: { thinkingBudget: 0 }
      },
    });
    
    // With responseMimeType: "application/json", the text should be a raw JSON string.
    let jsonStr = response.text.trim();

    // Although responseMimeType: "application/json" should prevent markdown,
    // this is a safety measure in case the API wraps it.
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'string')) {
      return { success: true, data: parsedData };
    } else {
      console.error("Gemini API returned unexpected JSON structure:", parsedData);
      return { success: false, error: "De AI gaf een antwoord in een onverwacht formaat. Probeer het opnieuw of pas uw invoer aan." };
    }
  } catch (e: any) {
    console.error("Error generating AI proof objectives:", e);
    let errorMessage = "Er is een fout opgetreden bij het communiceren met de AI.";
    if (e.message) {
        // Avoid exposing too technical details from raw e.message if it's an API error object.
        if (e.message.includes("API key not valid")) {
            errorMessage = "De geconfigureerde API sleutel is ongeldig.";
        } else if (e.message.toLowerCase().includes("quota")) {
            errorMessage = "Het API quotum is overschreden. Probeer het later opnieuw.";
        } else {
            // General error message from the client or a non-specific API error
            // errorMessage += ` Details: ${e.message}`; // Optionally add more detail
        }
    }
     // Check for GoogleGenAI specific error structures if available, e.g. e.response
    if (e.response && e.response.data && e.response.data.error && e.response.data.error.message) {
        errorMessage = `AI Fout: ${e.response.data.error.message}`;
    }
    return { success: false, error: errorMessage };
  }
};
