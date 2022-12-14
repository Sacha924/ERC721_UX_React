import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Layout from "./Layout";
import { IpfsImage } from "react-ipfs-image";

export default function FakeBaycTokenInfo() {
  const [tokenInfo, setTokenInfo] = useState({
    tokenID: 84,
    metadatas: null,
    tokenImage: null,
    errorMessage: null,
  });

  useEffect(() => {
    getTokenInfo(tokenInfo.tokenID);
  }, []);

  const contractAdress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
  const abi = require("../contractABI/ABIFakeBAYC.json").abi;

  let web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(abi, contractAdress);

  const getTokenInfo = async (_tokenId) => {
    const _tokenURI = await contractInstance.methods
      .tokenURI(_tokenId)
      .call()
      .catch((e) =>
        setTokenInfo({
          ...tokenInfo,
          errorMessage: "There is a problem, the token ID didn't exist",
        })
      );
    const jsonURI = await fetch(_tokenURI).then((res) => res.json());
    setTokenInfo({
      tokenID: _tokenId,
      metadatas: jsonURI.attributes,
      tokenImage: jsonURI.image,
      errorMessage: null,
    });
  };

  return (
    <>
      <Layout></Layout>
      <input type="number" value={tokenInfo.tokenID} min={0} onChange={(e) => getTokenInfo(Number.parseInt(e.target.value))} />
      {tokenInfo.errorMessage == null && (
        <div>
          <h3>Token ID : {tokenInfo.tokenID}</h3>
          {tokenInfo.metadatas != null && (
            <ul>
              {tokenInfo.metadatas.map((item) => (
                <li>
                  {item.trait_type} : {item.value}
                </li>
              ))}
            </ul>
          )}

          {tokenInfo.tokenImage != null && <IpfsImage hash={tokenInfo.tokenImage} />}
        </div>
      )}
      <h1 id="errorBAYC">{tokenInfo.errorMessage}</h1>
    </>
  );
}
