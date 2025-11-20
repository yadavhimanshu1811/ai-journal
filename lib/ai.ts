import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

// ---------- SUMMARY ----------
//summarizeText(text) takes any text, sends it to the Groq API, and asks the Llama-3.1-8B-Instant model to summarize it in 2–3 sentences.
export async function summarizeText(text: string) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Summarize the text in 2–3 concise sentences.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.log("SUMMARY ERROR:", err);
    return "Summary unavailable.";
  }
}

// ---------- MOOD ----------
export async function detectMood(text: string) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Respond with ONLY one word: positive, negative, or neutral.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 5,
    });

    const out = response.choices[0].message.content?.toLowerCase() || "";

    if (out.includes("positive")) return "positive";
    if (out.includes("negative")) return "negative";
    return "neutral";
  } catch (err) {
    console.log("MOOD ERROR:", err);
    return "neutral";
  }
}