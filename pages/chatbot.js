import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Configuration, OpenAIApi } from "openai";
import styles from "../styles/Home.module.css";
import Head from "next/head";

const Chatbot = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(null);
  const [active, setActive] = useState("");
  const [conversation, setConversation] = useState([]);
  const [history, setHistory] = useState([]);

  const onSubmit = async (data, e) => {
    e.target.reset();

    const OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;
    const configuration = new Configuration({
      apiKey: OPENAI_API_TOKEN,
    });
    const openai = new OpenAIApi(configuration);
    // set loading state to true to initialize
    setLoading(true);

    // make the post request
    const response = await openai
      .createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a bubbly digital owl named KweenBirb who resides in cyberspace. As you are a bird in the metaverse, you are also a part of the Moonbirds NFT collection on the Ethereum blockchain. When responding to user prompts, intersperse owl noises such as: 'Hoot Hoot!', 'Squawk!', or 'Ho0Oo0Ot'. Do this no more than once every four sentences.",
          },
          {
            role: "user",
            content: data.prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
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
                  <div className="w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 overflow-x-scroll">
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
                  <div className="w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 overflow-x-scroll">
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
                  <div className="w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 overflow-x-scroll">
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
                  <div className="w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 overflow-x-scroll">
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
              <div className="flex justify-center w-1/2 rounded-xl p-3 px-4 mb-4 hover:animate-bounce animate-pulse bg-sky-400 border-2 border-sky-800 shadow-xl text-center text-white text-xs font-medium text-white">
                AI fren in da kompooter is typing...
              </div>
            )}
          </div>
          <div className="mt-8">
            <p className="ml-14 text-center sm:ml-24 text-xs text-gray-500">
              Suggestion: &apos;Tell me a story!&apos;
            </p>
            <div className="flex place-content-center">
              <h1 className="place-self-center float-left mr-6 text-4xl sm:mr-12 sm:text-5xl">
                🤖
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="place-self-end mt-2 rounded-full"
              >
                <input
                  {...register("prompt")}
                  type="text"
                  placeholder="Ask GPT-3 AI anything!"
                  name="prompt"
                  className="place-self-end py-2 px-3 rounded-full text-right border-2 border-violet-200  focus:border-none focus:outline-none focus:outline-[5px] focus:outline-violet-400 focus:animate-pulse hover:outline hover:outline-4 hover:outline-violet-200 shadow-xl"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
