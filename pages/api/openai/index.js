import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  // check request values to determine which endpoint to use
  const _image = req.body.imageBuffer ? req.body.imageBuffer : null;
  const _mask = req.body.mask;
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

  if (_image && _prompt) {
    // format png data with name entirely in memory
    const pngBuffer = Buffer.from(_image);
    pngBuffer.name = "img.png";
    const maskBuffer = Buffer.from(_mask);
    maskBuffer.name = "mask.png";

    body = {
      image: pngBuffer,
      prompt: `${_prompt}`,
      mask: maskBuffer,
      n: _n,
      size: _size,
    };

    // use edits endpoint
    response = await openai.createImageEdit(
      body.image,
      body.prompt,
      body.mask,
      body.n,
      body.size
    );
  } else if (_image && !_prompt) {
    // format png data with name entirely in memory
    const pngBuffer = Buffer.from(_image);
    pngBuffer.name = "img.png";

    body = {
      image: pngBuffer,
      n: _n,
      size: _size,
    };

    // use variations endpoint
    response = await openai.createImageVariation(body.image, body.n, body.size);
  } else if (!_image && _prompt) {
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
  if (response.error) {
    console.log(response.error);
  }

  // send the fetch response url back to frontend client
  // using shorthand for setting response content type to 'application/json'
  res.status(200).json({ data: response?.data?.data[0].url });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb",
    },
  },
};
