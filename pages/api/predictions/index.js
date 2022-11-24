export default async function handler(req, res) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of prompthero/openjourney, fetched from:
      // https://replicate.com/prompthero/openjourney/versions
      // !! I like this model but may change this in the future to support even cooler stable-diffusion v2 models
      version:
        "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
      input: req.body,
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
