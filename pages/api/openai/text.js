import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const messages = req.body;

  const OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;
  const configuration = new Configuration({
    apiKey: OPENAI_API_TOKEN,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: messages,
    max_tokens: 4096,
    temperature: 0.7,
  });

  // send the fetch response url back to frontend client
  // using shorthand for setting response content type to 'application/json'
  res.status(200).json({ data: response?.data?.choices[0]?.message.content });
}
