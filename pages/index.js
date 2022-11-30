import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import gm from '../public/marsterlund.gif';

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Markus&apos;s Personal Page</title>
      </Head>


      <section className="text-black">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-800 bg-clip-text text-2xl font-bold text-transparent mb-3 sm:text-3xl">
              From Classical Music To Blockchain:
            </h1>
            <h2 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-800 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
              Horn
            </h2>
            <h2 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-800 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              and
            </h2>
            <h2 className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-800 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
              Technology
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href='/about'>
                <a className="block w-full rounded-full border border-indigo-400 px-12 py-3 text-sm font-semibold text-white hover:bg-indigo-700 bg-indigo-400 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto shadow-xl">
                  About Me
                </a>
              </Link>
              <Link href='/stablediffusion'>
                <a className="block w-full rounded-full border border-indigo-400 px-12 py-3 text-sm font-semibold text-white hover:bg-indigo-700 bg-indigo-400 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto shadow-xl">
                  Try txt2img AI
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section >
      <div className="flex items-center justify-center mt-8">
        <div className='hover:scale-125 sm:p-12 max-w-sm drop-shadow-2xl'>
          <a href='https://twitter.com/marsterlund'>
            <Image src={gm} alt='gif of KweenBirb saying gm' height='512' width='512' className='flex rounded-3xl' />
          </a>
        </div>
        <div className='max-w-sm max-h-sm p-6 ml-2 rounded-full shadow-2xl bg-indigo-100'>
          <h2 className='text-[10px] text-center italic font-bold leading-normal'>
            ~ GM! ~
          </h2>
          <h2 className='text-[10px] text-center italic font-bold leading-normal'>
            Welcome to my personal page, where you&apos;ll find my metaversal footprint in its entirety:
            from blockchain and interest in AI to orchestral music!
          </h2>
          <p className='text-center text-sm pt-2 text-gray-400'>- Markus Osterlund </p>
          <p className='text-center text-sm '> 📯📯 </p>
        </div>
      </div>
      <div className='justify-center mt-8'>
        <p className='mb-2'>Need a smart contract dev?</p>
        <p className='mb-2'>Got an idea for a token/NFT?</p>
        <p className='mb-4'>Not sure if a Blockchain solution is right for your business?</p>
        <p className='text-sm text-gray-600'>Contact me or inquire about a consultation!</p>
        <p className='mt-4 mb-4'>Just looking around?</p>
        <p className='text-sm text-gray-600'>While you&apos;re here, try playing around with my
          <Link href='/stablediffusion'>
            <a className="text-md text-blue-500"> text to image AI tool </a>
          </Link>
          or turn your pictures/videos into NFTs
          <Link href='/nft'>
            <a className='text-md text-blue-500'> using my NFT generator!</a>
          </Link>
        </p>
      </div>
      <div className="flex justify-center">
        <p className='mt-8'>Here&apos;s a few of my other projects:</p>
      </div>
      <div className='mt-4'>
        <li className='text-sm mb-2'>
          <Link href='/stablediffusion'>
            <a className='text-sm text-blue-500'> An AI-powered text to image generator </a>
          </Link>
        </li>
        <li className='text-sm mb-2'>
          <Link href='/nft'>
            <a className='text-sm text-blue-500'> A tool for you to turn your pictures, videos, or audio into NFTs! </a>
          </Link>
        </li>
        <li className='text-sm mb-2'>
          <Link href='https://huskycoin.vercel.app'>
            <a className='text-sm text-blue-500'> Web3 tutorials </a>
          </Link>
        </li>
        <li className='text-sm mb-2'>
          <Link href='https://mirror.xyz/0x65b54a4646369d8ad83cb58a5a6b39f22fcd8cee'>
            <a className='text-sm text-blue-500'> Blog entries on Web3 events and Solidity security vulnerabilities </a>
          </Link>
        </li>
        <li className='text-sm mb-2'>
          <Link href='https://github.com/robriks/ethernaut-solutions'>
            <a className='text-sm text-blue-500'> Solutions to Ethernaut, the Ethereum CTF that teaches you Solidity by hacking </a>
          </Link>
        </li>
      </div>
    </div >
  );
}
