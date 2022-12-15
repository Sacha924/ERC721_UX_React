import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Layout from "./Layout";

export default function FakeMeebits() {
  const [tokenId, setTokenId] = useState(1);
  const [errorMess, setErrorMess] = useState(null);

  const web3 = new Web3(window.ethereum);

  //   const contractAdressFMB = "0xD1d148Be044AEB4948B48A03BeA2874871a26003";
  //   const contractABIFMB = require("../contractABI/ABIFakeMeebits.json").abi;
  //   const contractInstanceFMB = new web3.eth.Contract(contractABIFMB, contractAdressFMB);

  const contractAdressFMBC = "0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55";
  const contractABIFMBC = require("../contractABI/ABIFakeMeebitsClaimer.json").abi;
  const contractInstanceFMBC = new web3.eth.Contract(contractABIFMBC, contractAdressFMBC);
  const jsonSig = require("../sig.json");

  const mintToken = async () => {
    const accounts = await web3.eth.getAccounts();
    const isTokenClaimed = await contractInstanceFMBC.methods
      .tokensThatWereClaimed(tokenId)
      .call()
      .catch((e) => setErrorMess(e.message));
    if (!isTokenClaimed) {
      const _signature = jsonSig[tokenId].signature;
      await contractInstanceFMBC.methods
        .claimAToken(tokenId, _signature)
        .send({ from: accounts[0] })
        .catch((e) => setErrorMess(e.message));
      setErrorMess(null);
    } else setErrorMess("The token is already claimed, sorry ! You should try a different tokenID :)");
  };

  return (
    <>
      <Layout></Layout>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input style={{ width: "100px", margin: "100px 0px 100px 10px" }} type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
        <button style={{ fontSize: "30px", width: "200px", height: "50px", marginLeft: "10px" }} onClick={mintToken}>
          Mint
        </button>
      </div>

      {errorMess}
    </>
  );
}
