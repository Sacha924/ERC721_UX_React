import React, { useState } from "react";
import { ethers } from "ethers";
import Layout from "./Layout";

// QUAND UN state est modif chainInfo est relancé
//JE REPREND MON CODE QUI FONCTIONNE MAIS CELUI CI EST A OPTIMISE, LE FONCTIONNEMENT DE ASYNC et des USESTATE sont MAL ABORDEs
const ChainInfo = () => {
  const [allInfo, setAllInfo] = useState({
    errorMessage: null,
    defaultAccount: null,
    userBalance: null,
    connButtonText: "Connect Wallet",
    chainId: null,
    blockNumber: null,
  });

  //Note from https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents :
  // For any non-trivial Ethereum web application — a.k.a. dapp, web3 site etc. — to work, you will have to:

  // Detect the Ethereum provider (window.ethereum)
  // Detect which Ethereum network the user is connected to
  // Get the user's Ethereum account(s)

  //This function will be called when the user click on the button to connect his wallet. When he's clicking on the button, we want to show  the ChainId, the last block number, and user address on /chain-info + [feature] his balance
  const connectWalletHandler = async () => {
    //Does the user have metamask ?
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      const result = await window.ethereum.request({ method: "eth_requestAccounts" }).catch((e) =>
        setAllInfo({
          errorMessage: e.message,
          ...allInfo,
        })
      );

      const balance = await window.ethereum.request({ method: "eth_getBalance", params: [result[0].toString(), "latest"] }).catch((e) =>
        setAllInfo({
          errorMessage: e.message,
          ...allInfo,
        })
      );

      const [id, number] = await getChainIdAndBlockNumber();

      setAllInfo({
        errorMessage: null,
        defaultAccount: result[0],
        userBalance: ethers.utils.formatEther(balance),
        connButtonText: "Wallet Connected",
        chainId: id,
        blockNumber: number,
      });
    } else {
      setAllInfo({
        errorMessage: "Please install MetaMask browser extension to interact",
        ...allInfo,
      });
    }
  };

  // update account, will cause component re-render ||| This method will setup our Account (address), and our balance

  async function getChainIdAndBlockNumber() {
    // Get the provider from the global window object
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the ChainId and the last block number
    const id = await provider.getNetwork().then((network) => network.chainId);
    const number = await provider.getBlockNumber();

    // Update the state with the values
    return [id, number];
  }

  // listen for account changes (not necessary bc we listen the 1st time we connect)
  // window.ethereum.on("accountsChanged", accountChangedHandler);

  return (
    <>
      <Layout></Layout>
      <div className="ChainInfo">
        <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
        <button onClick={connectWalletHandler}>{allInfo.connButtonText}</button>
        {allInfo.chainId == 11155111 && (
          <div>
            <div className="accountDisplay">
              <h3>Address: {allInfo.defaultAccount}</h3>
            </div>
            <div className="balanceDisplay">
              <h3>Balance: {allInfo.userBalance}</h3>
            </div>
            <div className="chainIdDisplay">
              <h3>ChainId: {allInfo.chainId}</h3>
            </div>
            <div className="blockNumberDisplay">
              <h3>BlockNumber: {allInfo.blockNumber}</h3>
            </div>
          </div>
        )}

        {allInfo.errorMessage}
      </div>
      {allInfo.chainId != 11155111 && allInfo.chainId != null && window.open("./NotFound", "_self")}
    </>
  );
};

export default ChainInfo;
