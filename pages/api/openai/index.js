import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  // check request values to determine which endpoint to use
  const _image = req.body.imageBuffer ? req.body.imageBuffer : null;
  const _prompt = req.body.prompt;

  const _n = 1;
  const _size = "512x512";

  const OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;
  const configuration = new Configuration({
    apiKey: OPENAI_API_TOKEN,
  });
  const openai = new OpenAIApi(configuration);

  let body;
  let response;

  if (!_image && _prompt) {
    // generations
    body = {
      prompt: `${_prompt}`,
      n: _n,
      size: _size,
    };
    response = await openai.createImage(body);
  } else {
    console.log("error determining endpoint");
  }

  // send the fetch response url back to frontend client
  // using shorthand for setting response content type to 'application/json'
  res.end(JSON.stringify({ data: response.data.data[0].url }));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
