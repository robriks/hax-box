import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { portraitsAddress } from '../config.js';
import Portraits from '../src/Prince.json';

const apiKey = process.env.INFURA_ID;

export default function LoadPortraitNFTs() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${apiKey}`)
        const portraitsContract = new ethers.Contract(portraitsAddress, Portraits.abi, provider)
        let items = []
        for (let i = 1; i < 3; i++) {
            let metadata1 = await portraitsContract.tokenURI(i)
            metadata1 = await axios.get('https://arweave.net/' + metadata1.slice(5))
            const portrait = 'https://arweave.net/' + metadata1.data.image.slice(5)
            items.push(portrait)
        }

        setNfts(items)
        setLoadingState('loaded')
    }

    return (
        <div className="mt-6">
            <div>
                <div className="flex place-content-center space-x-2 sm:space-x-4">
                    {nfts.map((nft, i) => (
                        <div key={i} className="place-self-center w-40 sm:w-56">
                            <Image
                                className="rounded-2xl object-contain"
                                alt="AI Portrait NFTs"
                                height="256"
                                width="256"
                                src={nft}
                            />
                        </div>
                    )
                    )}
                </div>
            </div>
        </div >
    )
}