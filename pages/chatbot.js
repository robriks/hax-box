import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Configuration, OpenAIApi } from "openai";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import kweenbirb from "../public/9535.gif";

const Chatbot = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(null);
  const [active, setActive] = useState("");
  const [conversation, setConversation] = useState([]);
  const [history, setHistory] = useState([]);
  // state variable used to toggle Kerrigan KweenBirb's hooting
  const [toggleKerrigan, setToggleKerrigan] = useState(false);

  useEffect(() => {}, [toggleKerrigan]);

  const onSubmit = async (data, e) => {
    e.target.reset();

    const OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;
    const configuration = new Configuration({
      apiKey: OPENAI_API_TOKEN,
    });
    const openai = new OpenAIApi(configuration);
    // set loading state to true to initialize
    setLoading(true);

    // conditionally include system message via array.unshift() based on toggle state
    const messages = [{ role: "user", content: data.prompt }];
    if (toggleKerrigan) {
      messages.unshift({
        role: "system",
        content:
          "You are a bubbly digital owl named 'Kerrigan, Kween of Birbs' who resides in cyberspace. As you are a bird in the metaverse, you are also a part of the Moonbirds NFT collection on the Ethereum blockchain. When responding to user prompts, intersperse owl noises such as: 'H○•○t!', 'Skree!', 'Squawk!', or 'Ho0Oo0Ot'. Do so with restraint: ie no more than once every seven sentences.",
      });
    }

    // make the post request
    const response = await openai
      .createChatCompletion({
        model: "gpt-4",
        messages: messages,
        max_tokens: 4096,
        temperature: 0.7,
        // stream: true,
      })
      .then((res) => {
        const msgs = {
          input: data.prompt,
          output: res.data.choices[0].message.content,
        };
        setActive(msgs);
        setConversation([...conversation, msgs]);
        setHistory(conversation);
        // Reset loading state to false after request to clear animation
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className="flex justify-center">
        <Head>
          <title>AI Chat</title>
        </Head>

        <div className="max-w-screen-md text-sm sm:text-lg">
          <h1 className="place-content-center mb-14 sm:mb-20 text-center text-3xl sm:text-5xl font-bold mt-2 mb-5 bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-800 bg-clip-text text-transparent">
            Communicate with an Artificial Intelligence
          </h1>
          <div className="space-y-4">
            {history.map((item, i) => (
              <div className="space-y-4" key={i}>
                <div className="flex w-full space-x-4">
                  <div className="w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 overflow-x-auto">
                    <div className="w-14 shrink-0 p-1 mb-4 border-2 border-violet-500 bg-violet-400 rounded-full float-right shadow-xl">
                      <p className="text-center text-[11px] text-white font-semibold">
                        Human:&nbsp;
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="font-medium">{item.input}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full space-x-4">
                  <div className="w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 overflow-x-auto">
                    <div className="w-14 shrink-0 p-1 mb-4 border-2 border-sky-500 bg-sky-400 rounded-full float-left shadow-xl">
                      <p className="text-center text-[11px] text-white font-semibold">
                        AI:&nbsp;
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="font-medium">{item.output}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 mb-4">
            {Boolean(active) && (
              <div className="space-y-4">
                <div className="flex w-full space-x-4">
                  <div className="w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 overflow-x-auto">
                    <div className="w-14 shrink-0 p-1 mb-4 border-2 border-violet-500 bg-violet-400 rounded-full float-right shadow-xl">
                      <p className="text-center text-[11px] text-white font-semibold">
                        Human:&nbsp;
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="font-medium">{active.input}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full space-x-4">
                  <div className="w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 overflow-x-auto">
                    <div className="w-14 shrink-0 p-1 mb-4 border-2 border-sky-500 bg-sky-400 rounded-full float-left shadow-xl">
                      <p className="text-center text-[11px] text-white font-semibold">
                        AI:&nbsp;
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="font-medium">{active.output}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mb-6 mt-6">
            {Boolean(loading) && (
              <div className="flex relative justify-center w-1/2 rounded-xl p-3 px-4 mb-4 hover:animate-bounce animate-pulse bg-sky-400 border-2 border-sky-800 shadow-xl text-center text-white text-xs font-medium text-white">
                AI fren in da kompooter is typing...
              </div>
            )}
          </div>
          <div className="mt-8 justify-center">
            <div className="flex justify-center mb-1 text-center text-xs text-gray-500 font-medium">
              <label className="ml-6 inline-flex items-center cursor-pointer">
                <p className="mr-3 mx-auto whitespace-nowrap sm:text-sm font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
                  Toggle Moonbird Personality
                </p>
                <span className="relative">
                  <input
                    className="hidden sr-only"
                    label="toggle"
                    onClick={() => {
                      setToggleKerrigan(!toggleKerrigan);
                    }}
                  />
                  <span className="block w-10 h-6 bg-violet-200 rounded-full shadow-xl border-2 border-violet-400"></span>{" "}
                  <div
                    className={`toggle-dot absolute left-1 top-1 bg-sky-200 w-4 h-4 rounded-full transition-transform border-2 border-violet-300
                    ${
                      toggleKerrigan
                        ? "translate-x-4 border-sky-600 bg-sky-600"
                        : "translate-x-0 border-sky-400"
                    }
                    `}
                  ></div>
                </span>
              </label>
            </div>
            <div className="flex place-content-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex place-self-center mt-2 rounded-full"
                id="chat"
              >
                <input
                  {...register("prompt")}
                  type="text"
                  placeholder="Ask GPT-4 AI anything!"
                  name="prompt"
                  className="place-self-end px-3 mb-4 rounded-full text-right border-2 border-violet-200 focus:border-none focus:outline-none focus:outline-[5px] focus:outline-violet-400 focus:animate-pulse hover:outline hover:outline-4 hover:outline-violet-300 shadow-xl"
                  id="chat"
                />
                <button
                  className="xs:flex-none place-self-center ml-3 min-w-max rounded-full drop-shadow-xl cursor-pointer hover:scale-125 ease-in duration-150 focus:outline-none drop-shadow-xl"
                  type="submit"
                  id="chat"
                >
                  <Image
                    src={kweenbirb}
                    alt="gif of KweenBirb saying gm"
                    height="64"
                    width="64"
                    className="xs:flex-none rounded-full"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
