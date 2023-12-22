import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const About = () => {

    const [block, setBlock] = useState({
        number: "loading . . .",
        hash: "loading . . .",
        miner: "loading . . .",
        timestamp: "loading . . .",
        transactions: []
    });

    useEffect(() => {
        async function getBlock() {
            setBlock(await alchemy.core.getBlockWithTransactions());
        }
        getBlock();
        console.log('block-------', block)
        console.log('block-------', block)


    }, []);
    return (
        <div >
            <h2>About Block {block.number} </h2>
            <div>Hash: {block.hash}</div>
            <div>Miner: {block.miner}</div>
            <div>Timestamp: {block.timestamp}</div>

            <h2>Transaction list</h2>
            {
                block.transactions.map((name, index) => (
                    <p> <Link to={`/transaction/${name.hash}`}>{name.hash}</Link>  </p>
                ))
            }
        </div >
    );
};

export default About;