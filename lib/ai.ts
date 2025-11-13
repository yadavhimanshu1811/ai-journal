import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// -------- SUMMARY ----------
export async function summarizeText(text: string) {
  try {
    const result = await model.generateContent(
      `Summarize the following journal entry in 2-3 sentences. Be concise and clear.\n\n${text}`
    );
    return result.response.text();
  } catch (err) {
    console.log("SUMMARY ERROR:", err);
    return "Summary unavailable.";
  }
}

// -------- SENTIMENT ----------
export async function detectMood(text: string) {
  try {
    const result = await model.generateContent(
      `Classify the mood of this journal entry as exactly one word: positive, negative, or neutral.\n\n${text}`
    );
    const label = result.response.text().toLowerCase();

    if (label.includes("positive")) return "positive";
    if (label.includes("negative")) return "negative";
    return "neutral";
  } catch (err) {
    console.log("SENTIMENT ERROR:", err);
    return "neutral";
  }
}