import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import gm from '../public/marsterlund.gif'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Markus&apos;s Personal Page</title>
      </Head>

      <div className="flex justify-center items-center">
        <Image src={gm} alt='gif of KweenBirb saying gm' className='flex rounded-3xl' />
        <div className='max-w-xs sm:max-w-sm p-6 mx-auto ml-2 rounded-full shadow-xl bg-gray-100'>
          <h1 className='text-sm text-center italic font-bold leading-normal'>
            ~ GM! ~
          </h1>
          <h2 className='text-xs text-center italic font-bold leading-normal'>
            Welcome to my personal page, where you&apos;ll find my metaversal footprint in its entirety:
            from blockchain and AI to orchestral music!
          </h2>
          <p className='text-center text-sm pt-2 text-gray-400'>- Markus Osterlund</p>
        </div>
      </div>
      <div className='flex justify-center mt-8'>
        <Link href='/stablediffusion'>
          <a className="text-md text-blue-500">While you&apos;re here, try playing around with text to image AI!</a>
        </Link>
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
            <p className='text-sm text-blue-500'> Blog entries on Web3 events and Solidity security vulnerabilities </p>
          </Link>
        </li>
        <li className='text-sm mb-2'>
          <Link href='https://github.com/robriks/ethernaut-solutions'>
            <p className='text-sm text-blue-500'> Solutions to Ethernaut, the Ethereum CTF that teaches you Solidity by hacking </p>
          </Link>
        </li>
      </div>
    </div >
  );
}
