import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import caseyinput from "../public/caseyinput.jpg";
import markusinput from "../public/markusinput.jpg";
import casey from "../public/casey.png";
import mage from "../public/mage.png";
import cleric from "../public/cleric.png";
import warrior from "../public/warrior.png";
import excited from "../public/excited-loading.gif";

const ImageGen = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [maskBuffer, setMaskBuffer] = useState(null);
  const [imageBuffer, setImageBuffer] = useState(null);

  useEffect(() => {
    const bufferizeMask = async () => {
      const res = await fetch("/transparent.png");
      const maskBlob = await res.blob();
      const _maskBuffer = Buffer.from(await maskBlob.arrayBuffer());

      return _maskBuffer;
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);

      if (imageUrl) {
        const prepFile = async () => {
          // fetch mask buffer
          const maskBuffer = await bufferizeMask();
          // fetch image file's base64 url encoding
          const _base64Img = (await fetch(imageUrl)).url;
          const pngBuffer = await bufferize(_base64Img);

          setMaskBuffer(maskBuffer);
          setImageBuffer(pngBuffer.data);
        };

        prepFile();
      }
    }
  }, [file, imageUrl]);

  useEffect(() => {
    if (!editMode) {
      setFile(null);
      setImageUrl(null);
      setImageBuffer(null);
    }
  }, [editMode]);

  const bufferize = async (b64Img) => {
    // send base64 mask or image to my API router proxy and receive JSON containing buffer
    const _pngBuffer = await fetch("/api/image-gen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base64Img: b64Img,
      }),
    });

    // add name attribute to json for OpenAI endpoint
    const pngBuffer = await _pngBuffer.json();
    return pngBuffer.data;
  };

  // post request to OpenAI for uploaded image prompts
  const onSubmit = async (e) => {
    e.preventDefault();

    // setLoading boolean to display excited Kerrigan gif with setPrediction
    setLoading(true);
    setPrediction(excited.blurDataURL);

    // grab images from state variables and prompt from input
    const _imageBuffer = imageBuffer;
    const _maskBuffer = maskBuffer;
    const _prompt = e.target.editprompt.value;

    // forward the prompt to my API router proxy
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBuffer: _imageBuffer,
          mask: _maskBuffer,
          prompt: _prompt,
        }),
      });

      const _prediction = await response.json();

      setPrediction(_prediction.data);
      setLoading(false);

      // Handle the response
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Generated Images</title>
      </Head>

      <h1 className="flex place-content-center text-center text-3xl sm:text-5xl font-bold mt-2 mb-5 bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-800 bg-clip-text text-transparent">
        Generate & Edit Images with AI
      </h1>

      {editMode && (
        <div className="justify-center p-2 sm:p-8">
          <div className="place-self-center backdrop-blur-xs rounded-3xl sm:mx-4 sm:my-4 md:mx-12 lg:mx-48 shadow-xl">
            <div className="p-4 mx-auto sm:whitespace-nowrap text-center text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              Edit Mode
              <p className="text-center text-xs font-medium text-gray-600 whitespace-normal">
                Create new variations from your own images. Variations can be
                random or you may provide a text prompt for more precise changes
              </p>
            </div>
          </div>
        </div>
      )}

      <form className="mt-4" onSubmit={(e) => onSubmit(e)}>
        {editMode && (
          <div>
            <div className="flex justify-center">
              <input
                className="mb-4 form-control block px-2 py-1.5 shadow-xl text-xl font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-4 border-violet-200 rounded-2xl transition focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:border-violet-400"
                type="file"
                name="upload"
                accept="image/png, image/jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <p className="text-center text-xs text-gray-600">
              Upload an image and then describe the desired end result in full,
              emphasizing any changes
            </p>
            {imageUrl && (
              <div className="my-4 flex justify-center">
                <Image
                  width={250}
                  height={250}
                  alt="Uploaded Image"
                  src={imageUrl}
                />
              </div>
            )}
            <p className="flex justify-center mb-6 text-xs text-gray-600">
              For a random variation, leave prompt blank
            </p>
          </div>
        )}

        <div className="flex justify-center mb-3 text-center text-base text-gray-800 font-medium">
          <label className="ml-6 inline-flex items-center cursor-pointer">
            <p className="mr-3 mx-auto whitespace-nowrap sm:text-lg font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
              Toggle Edit Mode
            </p>
            <span className="relative">
              <input
                className="hidden sr-only"
                label="toggle"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              />
              <span className="block w-10 h-6 bg-violet-200 rounded-full shadow-xl border-2 border-violet-400"></span>{" "}
              <div
                className={`toggle-dot absolute left-1 top-1 bg-sky-200 w-4 h-4 rounded-full transition-transform border-2 border-violet-300
                    ${
                      editMode
                        ? "translate-x-4 border-sky-600 bg-sky-600"
                        : "translate-x-0 border-sky-400"
                    }
                    `}
              ></div>
            </span>
          </label>
        </div>

        <div className="flex justify-center">
          <input
            className="p-3 rounded-full text-right border-2 border-violet-200 focus:border-none focus:outline-none focus:outline-[5px] focus:outline-violet-400 focus:animate-pulse hover:outline hover:outline-4 hover:outline-violet-200 shadow-xl"
            type="text"
            name="editprompt"
            placeholder="Describe an image to the AI!"
          />
          <button
            className="ml-4 rounded-full bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-700 shadow-xl text-white p-2 border-2 border-violet-300 hover:outline hover:outline-4 hover:outline-violet-200 hover:animate-bounce hover:from-sky-500 hover:via-indigo-600 hover:to-purple-900"
            type="submit"
          >
            Create!
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center mt-8">
          <Image
            src={excited}
            alt="loading..."
            className="rounded-2xl"
            width={200}
            height={200}
          />
        </div>
      )}

      {prediction && (
        <div className="flex justify-center mt-8">
          {prediction && (
            <Image src={prediction} alt="output" width={512} height={512} />
          )}
        </div>
      )}

      {error && <div>{error}</div>}

      <div className="justify-center text-center mt-10 p-6">
        <h2 className="text-xs mb-4 text-gray-500">
          Looping output images as inputs to edit mode allows for fine-tuned
          results:
        </h2>
        <div className="flex place-content-center mb-4">
          <Image
            src={markusinput}
            alt="Portrait input image"
            className="rounded-xl"
            width={150}
            height={150}
          />
          <p className="place-self-center whitespace-nowrap">
            &nbsp;--&gt;&nbsp;
          </p>
          <Image
            src={cleric}
            alt="Portrait input image"
            className="rounded-xl"
            width={150}
            height={150}
          />
          <Image
            src={warrior}
            alt="Portrait input image"
            className="rounded-xl"
            width={150}
            height={150}
          />
        </div>
        <div className="flex place-content-center">
          <Image
            src={caseyinput}
            alt="Portrait input image"
            className="rounded-xl"
            width={150}
            height={150}
          />
          <p className="place-self-center whitespace-nowrap">
            &nbsp;--&gt;&nbsp;
          </p>
          <Image
            src={mage}
            alt="Portrait input image"
            className="rounded-xl"
            width={150}
            height={150}
          />
          <Image
            src={casey}
            alt="Portrait input image"
            className="rounded-xl"
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
