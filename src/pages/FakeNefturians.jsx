import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Layout from "./Layout";

export default function FakeNefturians() {
  const [price, setPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const contractAdress = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";
  const abi = require("../contractABI/ABIFakeNefturian.json").abi;
  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(abi, contractAdress);

  useEffect(() => {
    getTokenPrice();
  }, []);

  const getTokenPrice = async () => {
    const _price = await contractInstance.methods
      .tokenPrice()
      .call()
      .catch((e) => setErrorMessage(e.message));
    setPrice(_price / Math.pow(10, 18));
  };

  const mint = async () => {
    if (price !== null) {
      const accounts = await web3.eth.getAccounts();
      await contractInstance.methods.buyAToken().send({
        from: accounts[0],
        value: web3.utils.toWei((price + 0.00001).toString(), "ether"), //We call a payable function and add 0.00001 to the minimal price to be sure that we can buy the function
      });
    }
  };

  return (
    <>
      <Layout></Layout>
      <h3>Price : {price} Eth</h3>
      <button onClick={mint}> Buy Token </button>
      {errorMessage !== null && <h3>Something went wrong : {errorMessage}</h3>}
    </>
  );
}
