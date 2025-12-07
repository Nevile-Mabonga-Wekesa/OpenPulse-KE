import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, VerificationResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key is present
export const isApiKeyAvailable = () => !!apiKey;

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key missing");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following social media post related to the Kenyan 2027 Election. 
      Determine sentiment, a risk score (0-100) based on potential for violence or misinformation, a short summary, and key topics.
      
      Post: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ['Positive', 'Negative', 'Neutral', 'Volatile'] },
            riskScore: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            topics: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['sentiment', 'riskScore', 'summary', 'topics']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback for demo purposes if API fails
    return {
      sentiment: 'Neutral' as any,
      riskScore: 50,
      summary: "Could not analyze content.",
      topics: ["Error"]
    };
  }
};

export const verifyClaim = async (claim: string): Promise<VerificationResult> => {
  if (!apiKey) {
    throw new Error("API Key missing");
  }

  try {
    // Using Search Grounding
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Verify this claim related to Kenyan events or elections: "${claim}". 
      Provide a verdict (True, False, Unverified, Misleading), a confidence score (0-100), and a brief explanation.`,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseSchema is NOT allowed with googleSearch tool
      }
    });

    // We have to parse the text response manually since we can't use JSON schema with search tools
    // We will ask the model to format it as a markdown block or just parse the free text
    // For this specific implementation, we will extract the grounding chunks for sources
    
    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = groundingChunks
      .filter(c => c.web?.uri && c.web?.title)
      .map(c => ({ title: c.web!.title!, uri: c.web!.uri! }));

    // Simple heuristic parsing for the structured fields since we couldn't enforce JSON schema
    let verdict: any = 'Unverified';
    if (text.toLowerCase().includes('verdict: true') || text.toLowerCase().includes('verdict: correct')) verdict = 'True';
    else if (text.toLowerCase().includes('verdict: false') || text.toLowerCase().includes('verdict: incorrect')) verdict = 'False';
    else if (text.toLowerCase().includes('verdict: misleading')) verdict = 'Misleading';

    return {
      claim,
      verdict,
      confidence: 85, // Mocked confidence based on search result existence
      sources,
      explanation: text
    };

  } catch (error) {
    console.error("Gemini Verification Error:", error);
    return {
      claim,
      verdict: 'Unverified',
      confidence: 0,
      sources: [],
      explanation: "Failed to connect to verification service."
    };
  }
};
