import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Layout from "./Layout";

const FakeBayc = () => {

  const [allInfo, setAllInfo] = useState({
    supply: null,
    name: null,
    claimButton: "Claim Token",
  });

  useEffect(() => {
    getTokenSupplyAndName();
  }, []);

  const contractAdress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
  const abi = require("../contractABI/ABIFakeBAYC.json").abi;

  let web3 = new Web3(window.ethereum);
  // The web3.eth.Contract object makes it easy to interact with smart contracts on the ethereum blockchain. When you create a new contract object you give it the json interface of the respective smart contract and web3 will auto convert all calls into low level ABI calls over RPC for you.
  const contractInstance = new web3.eth.Contract(abi, contractAdress);

  const getTokenSupplyAndName = async () => {
    const _supply = await contractInstance.methods.tokenCounter().call(); //Function that we can read from the contract
    const _name = await contractInstance.methods.name().call(); //Function that we can read from the contract
    setAllInfo({
      supply: _supply,
      name: _name,
      claimButton: "Claim Token",
    });
  };

  const claimToken = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    await contractInstance.methods
      .claimAToken() //Function that we can write from the contract
      .send({ from: accounts[0] })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Layout></Layout>
      <h3>Token Supply : {allInfo.supply}</h3>
      <h3>Token Name : {allInfo.name}</h3>
      <button onClick={claimToken}>{allInfo.claimButton}</button>
    </>
  );
};

export default FakeBayc;
