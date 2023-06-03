import sharp from "sharp";
// Make sure the content type of the response is set to 'application/json' to support jpgs
export default async function handler(req, res) {
  const imgBuffer = Buffer.from(req.body.base64Img.split(",")[1], "base64");

  const pngBuffer = await sharp(imgBuffer)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer()
    .catch(function () {
      console.log("error resizing image :(");
    });

  res.status(200).json({ data: pngBuffer });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb",
    },
  },
};
