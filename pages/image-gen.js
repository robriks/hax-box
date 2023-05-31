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
import blank from "../public/transparent-square.png";
import excited from "../public/excited-loading.gif";

const ImageGen = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // post request to OpenAI for uploaded image prompts
  const onSubmit = async (e) => {
    e.preventDefault();

    // setLoading boolean to display excited Kerrigan gif with setPrediction
    setLoading(true);
    setPrediction(excited.blurDataURL);

    // grab images from state variables and prompt from input
    const _prompt = e.target.editprompt.value;

    // forward the prompt to my API router proxy
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: _prompt,
        }),
      });

      const _prediction = await response.json();

      setPrediction(_prediction.data);
      setLoading(false);

      // Handle the response
      e.target.reset();
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
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

      <form className="mt-12" onSubmit={(e) => onSubmit(e)}>
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
            <Image
              src={prediction}
              alt="AI image"
              className="rounded-2xl"
              width={1024}
              height={1024}
            />
          )}
        </div>
      )}

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
