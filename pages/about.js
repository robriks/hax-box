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
                <div className='max-w-md relative flex p-6 sm:w-2/3 rounded-3xl shadow-2xl'>
                    {/* img is originally 1080 * 1350 */}
                    <Image
                        src={markus}
                        fill
                        alt='Headshot'
                        className="rounded-3xl h-auto"
                    />
                    <h1 className="max-w-md backdrop-blur-xl absolute flex p-2 sm:p-3 md:p-5 lg:p-7 rounded-2xl whitespace-nowrap text-violet-100 text-[16px] sm:text-sm md:text-[18px] lg:text-[26px] font-extrabold leading-9 top-3/4 left-1/2 -translate-x-1/2">
                        About Markus Osterlund
                    </h1>
                </div>
                <p className="p-6 text-sm sm:place-self-center sm:ml-2">hi how are you this is page is still in testing pay no mind</p>
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