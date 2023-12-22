import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Transaction = () => {

    const [transaction, setTransaction] = useState({
        blockNumber: "loading . . .",
        hash: "loading . . .",
        miner: "loading . . .",
        gasUsed: "loading . . .",
        timestamp: "loading . . .",
    });

    const { tHash } = useParams();


    useEffect(() => {
        async function getTransaction() {
            setTransaction(await alchemy.core.getTransactionReceipt(tHash));
        }
        getTransaction();

    }, []);
    return (
        <div >
            <h2>About transactions: {transaction.transactionHash} </h2>
            <p>blockNumber: {transaction.blockNumber} </p>
            <p>from: {transaction.from} </p>
            <p>to: {transaction.to} </p>
            <p>blockHash: {transaction.blockHash} </p>
            <p>transactionHash: {transaction.transactionHash} </p>
            <p>gas Used: {transaction.gasUsed.toString()} </p>
            <p>confirmations:  {transaction.confirmations} </p>

        </div >
    );
};

export default Transaction;