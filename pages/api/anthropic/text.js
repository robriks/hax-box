import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  const messages = req.body;

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  });

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-20250514",
      max_tokens: 4096,
      messages: messages,
    });

    const content = response?.content?.map((item) => item.text).join(" ");

    res.status(200).json({ data: content });
  } catch (error) {
    console.error("Error fetching response from Anthropic:", error);
    res.status(500).json({ error: "Failed to fetch response from Anthropic" });
  }
}
