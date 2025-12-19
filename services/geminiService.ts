
import { GoogleGenAI, Type } from "@google/genai";

export class MathAIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async solveAndExplain(expression: string, result: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `I just calculated ${expression} and got ${result}. Can you provide a clear, step-by-step mathematical explanation of how this works, any interesting properties of this result, or practical applications?`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              explanation: {
                type: Type.STRING,
                description: "A high-level summary of the mathematical concept.",
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Sequential steps to solve or understand the expression.",
              },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Related mathematical tips or shortcuts.",
              }
            },
            required: ["explanation", "steps", "tips"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("AI Insight Error:", error);
      throw error;
    }
  }

  async answerWordProblem(problem: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Solve this math word problem and provide the numeric answer along with an explanation: "${problem}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              result: { type: Type.STRING },
              explanation: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["result", "explanation", "steps"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Word Problem Error:", error);
      throw error;
    }
  }
}

export const mathService = new MathAIService();
