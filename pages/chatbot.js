import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from "../styles/Home.module.css";

const Chatbot = () => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(null);
    const [active, setActive] = useState('');
    const [conversation, setConversation] = useState([]);
    const [history, setHistory] = useState([]);

    const onSubmit = async (data) => {

        const api_key = process.env.api_key;
        // set loading state to initialized
        setLoading(true);

        // make the post request
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt: data.prompt,
                model: 'text-davinci-003',
                max_tokens: 1024,
                temperature: 0.5
            },
            {
                headers: {
                    'Authorization': `Bearer ${api_key}`
                }
            }
        ).then((res) => {
            const msgs = {
                input: data.prompt,
                output: res.data.choices[0].text
            }
            setActive(msgs);
            setConversation([...conversation, msgs]);
            setHistory(conversation);
            // Reset loading state to false after request
            setLoading(false);
        })
    };

    return (
        <div className={styles.container}>
            <div className='flex justify-center'>
                <div className='max-w-screen-md text-sm sm:text-lg'>
                    <div className='space-y-4'>
                        {history.map((item, i) => (
                            <div className='space-y-4' key={i}>
                                <div className='flex w-full space-x-4'>
                                    <div className='w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 overflow-x-scroll'>
                                        <div className='w-14 shrink-0 p-1 mb-4 border-2 border-violet-500 bg-violet-400 rounded-full float-right shadow-xl'>
                                            <p className='text-center text-[11px] text-white font-semibold'>Human:&nbsp;</p>
                                        </div>
                                        <div className='mx-4 mt-12 sm:mt-16'>
                                            <p className='font-medium'>{item.input}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full space-x-4'>
                                    <div className='w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 overflow-x-scroll'>
                                        <div className='w-14 shrink-0 p-1 mb-4 border-2 border-sky-500 bg-sky-400 rounded-full float-left shadow-xl'>
                                            <p className='text-center text-[11px] text-white font-semibold'>AI:&nbsp;</p>
                                        </div>
                                        <div className='mx-4 mt-12 sm:mt-16'>
                                            <p className='font-medium'>{item.output}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 mb-4'>
                        {
                            Boolean(active) && (
                                <div className='space-y-4'>
                                    <div className='flex w-full space-x-4'>
                                        <div className='w-full ml-8 rounded-xl p-3 shadow-xl border-2 border-violet-300 bg-violet-100 text-gray-700 overflow-x-scroll'>
                                            <div className='w-14 shrink-0 p-1 mb-4 border-2 border-violet-500 bg-violet-400 rounded-full float-right shadow-xl'>
                                                <p className='text-center text-[11px] text-white font-semibold'>Human:&nbsp;</p>
                                            </div>
                                            <div className='mx-4 mt-12 sm:mt-16'>
                                                <p className='font-medium'>{active.input}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-full space-x-4'>
                                        <div className='w-full mr-8 rounded-xl p-3 shadow-xl border-2 border-sky-300 bg-sky-100 text-gray-700 overflow-x-scroll'>
                                            <div className='w-14 shrink-0 p-1 mb-4 border-2 border-sky-500 bg-sky-400 rounded-full float-left shadow-xl'>
                                                <p className='text-center text-[11px] text-white font-semibold'>AI:&nbsp;</p>
                                            </div>
                                            <div className='mx-4 mt-12 sm:mt-16'>
                                                <p className='font-medium'>{active.output}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='mb-6 mt-6'>
                        {
                            Boolean(loading) && (
                                <div className="flex justify-center w-1/2 rounded-xl p-3 px-4 mb-4 hover:animate-bounce animate-pulse bg-sky-400 border-2 border-sky-800 shadow-xl text-center text-white text-xs font-medium text-white">
                                    AI fren in da kompooter is typing...
                                </div>
                            )
                        }
                    </div>
                    <div className='mt-8'>
                        <p className='mr-10 sm:mx-20 text-right text-xs text-gray-400'>Suggestion: 'Tell me a story!'</p>
                        <div className='flex place-content-end'>
                            <h1 className='place-self-center float-left mr-6 text-4xl sm:mr-12 sm:text-5xl'>🤖</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="place-self-end mt-2 rounded-full">
                                <input
                                    {...register("prompt")}
                                    type="text"
                                    placeholder="Chat with the AI!"
                                    name="prompt"
                                    className="place-self-end py-2 px-3 rounded-full text-right border-2 border-violet-200 focus:mt-3 focus:border-none focus:outline-none focus:outline-[5px] focus:outline-violet-400 focus:animate-pulse hover:outline hover:outline-4 hover:outline-violet-200 shadow-xl"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Chatbot;