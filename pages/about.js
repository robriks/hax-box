import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import markus from '../public/markus.jpg';


export default function NFT() {
    return (
        <div className={styles.container}>
            <div className="flex items-center justify-center">
                Coming soon!
                {/* -blockchain dev cert
                -cryptocurrency forensics
                -dapp development
                -governance smart contracts
                -tokens: ERC20, ERC721 nfts
                -AI art
                -portraits
                -music
                -performing, teaching */}
            </div>
            {/* <div class="bg-fixed" style='background-image: url(../public/markus.jpg)'></div> */}

        </div>
    )
}