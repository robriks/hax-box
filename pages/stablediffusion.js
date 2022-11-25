import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function StableDiffusion() {

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
            }),
        });
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>AI Text To Image</title>
            </Head>

            <h1 className="flex place-content-center text-3xl font-bold mt-8 mb-6">Generate images from text using AI</h1>
            <form className="flex justify-center" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <input className="rounded-xl" type="text" name="prompt" placeholder="Enter your prompt here" />
                    <button className="ml-4 rounded-xl bg-purple-600 hover:bg-purple-800 shadow-xl text-white text-md" type="submit">Create!</button>
                </div>
            </form>
            <p className="flex justify-center m-4 text-gray-400 text-xs"> {prediction ? '( ' + prediction.status + ' )' : ''} </p>

            {prediction && (
                <div className="flex justify-center">
                    {prediction.output && (
                        <Image
                            src={prediction.output[prediction.output.length - 1]}
                            alt="output"
                            width={500}
                            height={500}
                        />
                    )}
                </div>
            )}

            {error && <div>{error}</div>}

            
            <p className="flex justify-center m-2 text-sm text-black">
                Lost? Try this to start:
            </p>
            <p className="flex justify-center text-sm text-gray-600">&quot;Portrait of faerie queen, intricate, elegant, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, 8k&quot;</p>
            <p className="text-xs ml-6 mr-6 mt-20 text-gray-400">
                    Credit for this Stable Diffusion + MidJourney v4 model goes to{' '}
                    <a className="text-blue-500" href="https://replicate.com/prompthero/openjourney">prompthero/openjourney</a>
            </p>
        </div>
    );
}