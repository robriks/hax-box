import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import imageCompression from "browser-image-compression";
import Modal from "react-modal";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import kweenbirb from "../public/9535.gif";
import kweenbirbDark from "../public/9535DM.png";

Modal.setAppElement("#__next");

const Chatbot = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(null);
  const [active, setActive] = useState("");
  const [conversation, setConversation] = useState([]);
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // for toggling Anthropic::Claude vs OpenAI::GPT
  const [toggleGPT, setToggleGPT] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [toggleGPT, file]);

  const onSubmit = async (data, e) => {
    const _prompt = ref.current.value;
    ref.current.value = "";
    resizeTextarea(e);

    // set loading state to true to initialize
    setLoading(true);

    const current = {
      role: "user",
      content: [{ type: "text", text: _prompt }],
    };
    // prepend conversation context to provide full chat history
    const messages = [...conversation, current];

    let endpoint = "";
    if (toggleGPT) {
      endpoint = "/api/openai/text";
      // If detected, add base64 encoding of uploaded image (not an https URL)
      if (imageUrl) {
        current.content.push({
          type: "image_url",
          image_url: {
            url: imageUrl,
          },
        });
      }
    } else {
      endpoint = "/api/anthropic/text";
      if (imageUrl) {
        current.content.push({
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: imageUrl.split(",")[1], // Extract base64 data from data URL
          },
        });
      }
    }

    // make the post request via serverless API proxy route
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const _answer = await response.json();

      const msgs = [
        { role: "user", content: _prompt },
        { role: "assistant", content: _answer.data },
      ];

      setActive(msgs);
      setConversation([...conversation, ...msgs]);
      setHistory(conversation);
      // Reset loading state to false after request to clear animation
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  const resizeTextarea = (e) => {
    const element = ref.current;

    if (element?.style) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleFileCompression = async (file) => {
    setFile(file);
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 768,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleFileChange = (e) => {
    handleFileCompression(e.target.files[0]);
    closeModal();
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
                  <div
                    className={`w-full ${
                      i % 2 === 0 ? "ml-8" : "mr-8"
                    } rounded-xl p-3 shadow-xl 
                  ${
                    i % 2 === 0
                      ? "border-2 border-violet-300 bg-violet-100 text-gray-700 dark:border-violet-300 dark:bg-violet-600 dark:text-gray-100"
                      : "border-2 border-sky-300 bg-sky-100 text-gray-700 dark:border-sky-300 dark:bg-sky-600 dark:text-gray-100"
                  } overflow-x-auto`}
                  >
                    <div
                      className={`w-14 shrink-0 p-1 mb-4 
                    ${
                      i % 2 === 0
                        ? "border-2 border-violet-500 bg-violet-400 dark:border-violet-300 dark:bg-violet-400"
                        : "border-2 border-sky-500 bg-sky-400 dark:border-sky-300 dark:bg-sky-400"
                    } rounded-full 
                    ${i % 2 === 0 ? "float-right" : "float-left"} shadow-xl`}
                    >
                      <p className="text-center text-[11px] text-white font-semibold">
                        {" "}
                        {i % 2 === 0 ? "Human" : "AI"}:&nbsp;{" "}
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="whitespace-pre-wrap font-medium">
                        {item?.content}
                      </p>
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
                  <div className="w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 dark:border-violet-300 dark:bg-violet-600 dark:text-gray-100 overflow-x-auto">
                    <div className="w-14 shrink-0 p-1 mb-4 border-2 border-violet-500 bg-violet-400 dark:border-violet-300 dark:bg-violet-400 rounded-full float-right shadow-xl">
                      <p className="text-center text-[11px] text-white font-semibold">
                        Human:&nbsp;
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="whitespace-pre-wrap font-medium">
                        {active[0].content}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full space-x-4">
                  <div className="w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 dark:border-sky-300 dark:bg-sky-600 dark:text-gray-100 overflow-x-auto">
                    <div className="w-14 shrink-0 p-1 mb-4 border-2 border-sky-500 bg-sky-400 dark:border-sky-300 dark:bg-sky-400 rounded-full float-left shadow-xl">
                      <p className="text-center text-[11px] text-white font-semibold">
                        AI:&nbsp;
                      </p>
                    </div>
                    <div className="mx-4 mt-12 sm:mt-16">
                      <p className="whitespace-pre-wrap font-medium">
                        {active[1].content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mb-6 mt-6">
            {Boolean(loading) && (
              <div className="flex relative justify-center w-1/2 rounded-xl p-3 px-4 mb-4 hover:animate-bounce animate-pulse bg-sky-400 border-2 border-sky-800 dark:border-sky-300 shadow-xl text-center text-white text-xs font-medium text-white">
                AI fren in da kompooter is typing...
              </div>
            )}
          </div>
          {/* Toggle for Claude vs GPT */}
          <div className="flex justify-center mb-1 text-center text-xs text-gray-500 font-medium">
            <label className="ml-6 inline-flex items-center cursor-pointer">
              <p className="mr-3 mx-auto whitespace-nowrap sm:text-sm font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 dark:via-indigo-300 dark:to-purple-600 bg-clip-text text-transparent">
                Toggle Claude vs GPT
              </p>
              <span className="relative">
                <input
                  className="hidden sr-only"
                  label="toggle"
                  onClick={() => {
                    setToggleGPT(!toggleGPT);
                  }}
                />
                <span className="block w-10 h-6 bg-violet-300 rounded-full shadow-xl border-2 border-violet-400"></span>{" "}
                <div
                  className={`toggle-dot absolute left-1 top-1 bg-sky-200 w-4 h-4 rounded-full transition-transform border-2 border-violet-300
                    ${
                      mounted && toggleGPT
                        ? "translate-x-4 border-sky-600 bg-sky-600"
                        : "translate-x-0 border-sky-400"
                    }
                    `}
                ></div>
              </span>
            </label>
          </div>
          <div className="flex flex-col place-content-center justify-center w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col place-self-center mt-2 rounded-full"
              id="chat"
            >
              <div className="flex place-self-center">
                <textarea
                  {...register("prompt")}
                  ref={ref}
                  onInput={resizeTextarea}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit((data) => onSubmit(data, e))();
                    }
                  }}
                  type="text"
                  rows={1}
                  placeholder="Send a message!"
                  name="prompt"
                  className="flex resize overflow-hidden place-self-center px-5 rounded-2xl bg-violet-100 dark:bg-indigo-300 dark:hover:bg-indigo-400 dark:focus:bg-indigo-400 dark:border-indigo-100 border-4 border-violet-400 hover:bg-violet-200 focus:bg-violet-200 focus:outline-none focus:border-4 focus:border-violet-500 focus:animate-pulse text-black shadow-xl"
                  id="chat-input"
                />
                <button
                  className="xs:flex-none place-self-center ml-3 min-w-max rounded-full drop-shadow-xl cursor-pointer hover:scale-125 ease-in duration-150 focus:outline-none drop-shadow-xl"
                  type="submit"
                  id="chat-button"
                  onClick={handleSubmit(onSubmit)}
                >
                  {mounted && theme === "light" && (
                    <div>
                      <Image
                        src={kweenbirb}
                        alt="gif of KweenBirb saying gm"
                        height="70"
                        width="70"
                        className="xs:flex-none rounded-full"
                      />
                    </div>
                  )}
                  {mounted && theme === "dark" && (
                    <div>
                      <Image
                        src={kweenbirbDark}
                        alt="darkmode KweenBirb"
                        height="70"
                        width="70"
                        className="xs:flex-none rounded-full"
                      />
                    </div>
                  )}
                </button>
              </div>
              <div className="flex flex-col items-center mt-4">
                <p className="mb-3 text-center text-xs text-gray-600 dark:text-gray-200">
                  Upload an image to accompany your message! The AI will look at
                  the image and respond with relevant information.
                </p>
                <button
                  type="button"
                  onClick={openModal}
                  className="mb-4 form-control block px-4 py-2 shadow-xl text-xs font-normal text-gray-200 bg-violet-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:bg-indigo-400 hover:bg-violet-700 focus:bg-violet-200 focus:outline-none focus:border-4 focus:border-violet-500 focus:animate-pulse bg-clip-padding rounded-2xl transition focus:text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none hover:border-violet-400"
                >
                  Upload Image
                </button>
              </div>
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
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="File Upload Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-200 p-8 rounded-lg shadow-xl max-w-md w-full z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={closeModal}
            className="text-xl text-gray-900 font-bold cursor-pointer ml-auto"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-4 text-2xl text-violet-500 text-center font-bold">
          Select an image
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="mb-4 form control block px-2 py-1 shadow-xl text-xs font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-4 border-violet-200 rounded-2xl transition focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:border-violet-400"
          />
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-indigo-500 text-white rounded-full shadow-xl hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;
