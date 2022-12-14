// Display all the tokens {userAddress} id's has with nft name and description from metadata and token
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Layout from "./Layout";

export default function FakeNefturiansUserInfo() {
  const [listNFT, setListNFT] = useState([]);

  const contractAdress = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";
  const abi = require("../contractABI/ABIFakeNefturian.json").abi;
  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(abi, contractAdress);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let myList = [];
    // const accounts = await window.ethereum.request({method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();
    const BALANCE = await contractInstance.methods.balanceOf(accounts[0]).call();
    const TOTAL_SUPPLY = await contractInstance.methods.totalSupply().call();
    console.log(BALANCE);
    let tokenID = 1;
    while (myList.length < BALANCE || tokenID > TOTAL_SUPPLY) {
      const owner = await contractInstance.methods.ownerOf(tokenID).call();
      if (owner == accounts[0]) {
        const tokenURI = await contractInstance.methods.tokenURI(tokenID).call();
        const response = await fetch(tokenURI);
        const data = await response.json();
        myList.push({
          id: tokenID,
          name: data.name,
          description: data.description,
          imageLink: "https://api.nefturians.io/nefturians/images/" + tokenID,
        });
      }
      tokenID++;
    }
    setListNFT(myList);
    console.log(myList);
  };

  return (
    <>
      <Layout></Layout>
      {listNFT.map((item) => (
        <div className="fakeNeftElem">
          <ul>
            <li>
              <strong>Id</strong> : {item.id}
            </li>
            <li>
              <strong>Name</strong>:{item.name}
            </li>
            <li>
              <strong>Description</strong>:{item.description}
            </li>
          </ul>
          <img className="fakeNeftImage" src={item.imageLink} />
        </div>
      ))}
    </>
  );
}
