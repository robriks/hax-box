import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { create } from 'ipfs-http-client';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoadPortraitNFTs from "../components/portrait-nfts.js";

// import { nftFactoryAddress } from '../config';
// import NFTGenerator from '../artifacts/contracts/NFTGenerator.sol/NFTGenerator.json';

const projectId = process.env.INFURA_IPFS_ID;
const projectSecret = process.env.INFURA_IPFS_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export default function GenerateNFT() {
    const [fileUrl, setFileUrl] = useState(null);

    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(
                file,
                { progress: (prog) => console.log(prog) }
            )
            const url = 'https://horn.infura-ipfs.io/ipfs/' + added.path;
            setFileUrl(url);
            console.log(url);
        } catch (err) {
            console.log(err);
        }
    }

    async function mintYourNFT() {
        console.log('not implemented yet');
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>NFT Generator</title>
            </Head>

            <div className="divide-y-2 divide-dotted divide-gray-300 space-y-8">
                <section>
                    <div className="mx-auto max-w-screen-xl lg:flex">
                        <div className="mx-auto max-w-3xl text-center">
                            <h1 className="place-content-center mb-14 sm:mb-20 text-center text-3xl sm:text-5xl font-bold mt-2 mb-5 bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-800 bg-clip-text text-transparent">
                                Generate Your Own NFTs
                            </h1>
                            <div className="flex items-center place-self-center backdrop-blur-xs rounded-3xl mt-8 sm:mx-12 sm:my-4 md:mx-20 lg:mx-6 shadow-2xl">
                                <div className="p-5 text-[11px] font-medium text-gray-800 leading-snug sm:text-base lg:text-lg">
                                    <div className="object-contain">
                                        <a className="text-[13px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
                                            Mint custom content as NFTs&nbsp;
                                        </a>
                                        on Ethereum&apos;s&nbsp;
                                        <Link href="https://polygon.technology/">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline">
                                                Polygon&nbsp;
                                            </a>
                                        </Link>
                                        or&nbsp;
                                        <Link href="https://arbitrum.io/">
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline">
                                                Arbitrum&nbsp;
                                            </a>
                                        </Link>
                                        blockchains in three steps:
                                        <ul className="list-disc my-1 sm:my-4 sm:text-sm text-gray-800 font-normal">
                                            <p><a className="text-base text-violet-500">★&nbsp;</a>Upload picture, video, or music</p>
                                            <p><a className="text-base text-violet-500">★&nbsp;</a>Connect Web3 wallet</p>
                                            <p><a className="text-base text-violet-500">★&nbsp;</a>Submit mint transaction</p>
                                        </ul>
                                        Protocol gas fees cost less than 10 cents!
                                        <p className="mt-2 font-normal text-[10px] sm:text-xs text-gray-600">
                                            These NFTs are&nbsp;
                                            <Link href="https://polygon.technology/">
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline">
                                                    hosted on IPFS
                                                </a>
                                            </Link>
                                            &nbsp;and minted as a unique tokenId by a generic smart contract I&apos;ve already coded and deployed.
                                            <br className="mb-1 sm:mb-2" />
                                            ** For personalized NFT projects or deployments to other chains such as mainnet Ethereum, contact me.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex justify-center mb-3">
                    <div className="mt-8 mb-3 w-96 text-center">
                        <p className="mb-5 text-[18px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
                            <a className="text-[18px] text-gray-800">1.&nbsp;&nbsp;</a>
                            Upload a file (&nbsp;to IPFS&nbsp;)
                        </p>
                        <input
                            className="form-control block w-full px-2 py-1.5 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-4 border-indigo-300 rounded-2xl transition  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="formFileLg"
                            type="file"
                            name="Metadata"
                            onChange={onChange}
                        />
                        {
                            fileUrl && (
                                // convert to <Image> !!!
                                <img className="rounded-md" fill="true" alt="Uploaded IPFS Image" src={fileUrl} />
                            )
                        }
                    </div>
                </section>
                <section className="items-center">
                    <div className="mt-8 text-center">
                        <p className="mb-6 text-[18px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
                            <a className="text-[18px] text-gray-800">2.&nbsp;&nbsp;</a>
                            Connect Web3 wallet
                        </p>
                        <div className="flex justify-center">
                            <ConnectButton />
                        </div>
                        <div className="mt-4 md:mt-6 text-sm text-gray-600">
                            Any Web3 wallet will do, such as&nbsp;
                            <Link href="https://metamask.io">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline">
                                    Metamask
                                </a>
                            </Link>
                            &nbsp;or&nbsp;
                            <Link href="https://www.coinbase.com/wallet">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline">
                                    Coinbase Wallet
                                </a>
                            </Link>
                        </div>
                        <div className="mt-10 text-xs text-gray-500">
                            Confused?
                            <p>Complete my&nbsp;
                                <Link href="https://www.coinbase.com/wallet">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline">
                                        Web3 tutorial: HuskyCoin
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="items-center">
                    <div className="mt-8 mb-3 text-center">
                        <p className="mb-6 text-[18px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-900 bg-clip-text text-transparent">
                            <a className="text-[18px] text-gray-800">3.&nbsp;&nbsp;</a>
                            Submit mint transaction
                        </p>
                        <div>
                            <button
                                onClick={mintYourNFT}
                                className='px-4 rounded-full font-medium bg-gradient-to-r from-sky-300 via-indigo-400 to-purple-700 shadow-xl text-white p-2 border-2 border-violet-300 hover:outline hover:outline-4 hover:outline-violet-300 hover:animate-bounce hover:from-sky-500 hover:via-indigo-600 hover:to-purple-900'
                                type="submit"
                            >Mint NFT
                            </button>
                            <p className="mx-6 mt-4 md:mt-6 text-xs text-gray-500">
                                To pay the protocol&apos;s gas fee, ensure you have at least $0.10 worth of either $MATIC (on Polygon) or $ETH (on Arbitrum)
                            </p>
                        </div>
                    </div>
                </section>
                <section className="font-medium text-center text-xs sm:text-base md:text-lg text-gray-800">
                    <div className="md:mx-20 lg:mx-48">
                        <p className="mx-4 mt-5">Check out these AI-generated portraits 👦🏻👦🏻 hosted on the Arweave blockchain that we turned into Polygon NFTs! 😍😍</p>
                        {<LoadPortraitNFTs />}
                    </div>
                </section>
            </div>
        </div>
    )
}