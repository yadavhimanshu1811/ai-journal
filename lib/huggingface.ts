export async function summarizeText(text: string) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await response.json();

    if (data.error) return "Summary unavailable";

    return data[0]?.summary_text || "Summary unavailable";
  } catch {
    return "Summary unavailable";
  }
}

export async function detectMood(text: string) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();

    if (!Array.isArray(result)) return "neutral";

    const scores = result[0];
    const labels = ["negative", "neutral", "positive"];
    const maxIdx = scores.indexOf(Math.max(...scores));

    return labels[maxIdx];
  } catch {
    return "neutral";
  }
}