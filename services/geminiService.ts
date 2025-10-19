
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, SEO-friendly title for the video, under 60 characters."
    },
    hashtags: {
      type: Type.ARRAY,
      description: "An array of 5-7 relevant and trending hashtags.",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ['title', 'hashtags']
};

export async function generateVideoMetadata(videoUrl: string) {
  const prompt = `You are a viral social media expert. Analyze the content of the video at this URL: ${videoUrl}. Based on its content, generate a catchy, SEO-friendly title and 5-7 relevant hashtags.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  try {
    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (error) {
    console.error("Error parsing Gemini JSON response:", response.text, error);
    throw new Error("Failed to parse AI response. The format was invalid.");
  }
}
