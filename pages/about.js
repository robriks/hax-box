import Head from "next/head";
import Image from "next/image";
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
                <div className="place-self-center backdrop-blur-3xl rounded-3xl mt-4 mx-4 sm:mx-4 sm:my-4 shadow-xl">
                    <p className="p-6 text-sm sm:text-xs lg:text-lg sm:place-self-center sm:ml-2 md:text-md sm:max-w-prose">
                        <a className="text-[16px] sm:text-sm lg:text-xl font-bold">
                            An orchestral musician
                        </a> by day and smart contract programmer by night, Markus Osterlund's two main professional foci are music and technology.
                        His work oscillates between weekly performances with the National Symphony Orchestra and late nights fiddling with his Solidity smart contracts or Javascript webapps like the one you're on now:
                        <a href="https://horn.technology" className="text-blue-500"> horn.technology</a>
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <p className='font-medium'>Need a Solidity/JS dev? Looking to integrate a token with your business? Not sure if a blockchain solution is right for you?</p>
                <p className="">Inquire for a consultation!</p>
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