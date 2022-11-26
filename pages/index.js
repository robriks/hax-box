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
        <Image src={gm} height='512' width='512' alt='gif of KweenBirb saying gm' className='flex rounded-3xl' />
        <div className='w-3/4 p-4 items-stretch'>
          <p className='text-xs font-bold'>
            GM! Welcome to my personal page, where you&apos;ll find my metaversal footprint in its entirety.
          </p>
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
