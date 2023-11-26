import { ethers } from "ethers";
import axios from "axios";

import { portraitsAddress } from "../../../config";
import Portraits from '../../../src/Prince.json';

const apiKey = process.env.INFURA_ID;

export default async function handler(req, res) {
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${apiKey}`);
    const portraitsContract = new ethers.Contract(portraitsAddress, Portraits.abi, provider);
    let items = [];
    const promises = Array.from({ length: 2 }).map(async (value, i) => {
        let metadata1 = await portraitsContract.tokenURI(i + 1);
        const arHash = metadata1.toString().slice(5);
        const json = await axios.get(`https://arweave.net/${arHash}`);
        return `https://arweave.net/${json.data.image.slice(5)}`;
    });

    items = await Promise.all(promises);
    res.status(200).json(items);
}