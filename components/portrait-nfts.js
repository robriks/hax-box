import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function LoadPortraitNFTs() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        const res = await axios.get('/api/nft/loadNFTs');
        // console.log(res); return;
        setNfts(res.data)
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
        </div>
    )
}