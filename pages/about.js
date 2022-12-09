import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import markus from '../public/markus.jpg';
import gradient from '../public/gradient.png';


export default function NFT() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About Markus</title>
            </Head>

            <div className="justify-center sm:flex">
                <div className='relative flex p-6 rounded-3xl shadow-2xl'>
                    {/* img is originally 1080 * 1350 */}
                    <div className="max-w-xs min-w-fit">
                        <Image
                            src={markus}
                            fill='true'
                            alt='Headshot'
                            className="rounded-3xl"
                        />
                    </div>
                    <h1 className="max-w-md backdrop-blur-md absolute flex px-2 py-1 sm:p-3 md:px-2 md:py-5 lg:px-4 lg:py-7 rounded-xl sm:rounded-2xl whitespace-nowrap text-violet-100 text-[16px] sm:text-xs md:text-[18px] lg:text-[24px] font-extrabold leading-9 top-3/4 sm:top-2/3 left-1/2 -translate-x-1/2">
                        About Markus Osterlund
                    </h1>
                </div>
                <div className="place-self-center backdrop-blur-xs rounded-3xl mt-4 mx-4 sm:mx-4 sm:my-4 shadow-xl">
                    <p className="p-6 text-sm sm:text-xs lg:text-lg sm:place-self-center sm:ml-2 md:text-md sm:max-w-prose">
                        <a className="text-[16px] sm:text-sm lg:text-xl font-bold">
                            An orchestral musician
                        </a> by day and smart contract programmer by night, Markus Osterlund&apos;s two main professional foci are music and technology.
                        His work oscillates between weekly performances with the National Symphony Orchestra and late nights fiddling with his Solidity smart contracts or Javascript webapps like the one you&apos;re on now:
                        <a href="https://horn.technology" className="text-blue-500"> horn.technology</a>
                    </p>
                </div>
            </div>
            <div className="mt-8 text-sm">
                <p className='font-medium mb-2'>Need a Solidity/JS developer? Looking to integrate a Web3 token/NFT with your business? In need of a blockchain or AI infra consultation?</p>
                <p className="">Contact me with inquiries!</p>
                <div className="flex justify-center">
                    <p className='mt-8 text-base font-bold'>Projects:</p>
                </div>
                <div className='grid gap-2 grid-cols-3 grid-rows-2 mt-4 text-sm'>
                    <span className='rounded-xl border-2 border-indigo-200 p-2'>
                        <Link href='/stablediffusion'>
                            <a className='text-sm text-blue-500 hover:underline'>
                                An AI-powered chat app to communicate with an Artificial Intelligence
                            </a>
                        </Link>
                    </span>
                    <span className="rounded-xl border-2 border-indigo-200 p-2">
                        <Link href='/stablediffusion'>
                            <a className='text-sm text-blue-500 hover:underline'>
                                An AI-powered text to image generator
                            </a>
                        </Link>
                    </span>
                    <span className='rounded-xl border-2 border-indigo-200 p-2'>
                        <Link href='/nft'>
                            <a className='text-sm text-blue-500 hover:underline'>
                                A tool for you to turn your pictures, videos, or audio into NFTs!
                            </a>
                        </Link>
                    </span>
                    <span className='rounded-xl border-2 border-indigo-200 p-2'>
                        <Link href='https://huskycoin.vercel.app'>
                            <a className='text-sm text-blue-500 hover:underline'>
                                Web3 tutorials
                            </a>
                        </Link>
                    </span>
                    <span className='rounded-xl border-2 border-indigo-200 p-2'>
                        <Link href='https://mirror.xyz/0x65b54a4646369d8ad83cb58a5a6b39f22fcd8cee'>
                            <a className='text-sm text-blue-500 hover:underline'>
                                Blog entries on Web3 events and Solidity security vulnerabilities, hosted on-chain on Ethereum!
                            </a>
                        </Link>
                    </span>
                    <span className='rounded-xl border-2 border-indigo-200 p-2'>
                        <Link href='https://github.com/robriks/ethernaut-solutions'>
                            <a className='text-sm text-blue-500 hover:underline'>
                                Solutions to Ethernaut, the Ethereum CTF that teaches you Solidity by hacking
                            </a>
                        </Link>
                    </span>
                </div>
            </div>



            {/* 
                -portrait NFTs
                -blockchain dev cert
                -cryptocurrency forensics
                -dapp development
                -governance smart contracts
                -tokens: ERC20, ERC721 nfts
                -AI art
                -portraits
                -music
                -performing, teaching */}
        </div>
    )
}