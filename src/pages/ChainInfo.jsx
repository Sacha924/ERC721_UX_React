import React, { useState } from "react";
import { ethers } from "ethers";
import Layout from "./Layout";

// QUAND UN state est modif chainInfo est relancé

const ChainInfo = () => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [chainId, setChainId] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);

  //Note from https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents :
  // For any non-trivial Ethereum web application — a.k.a. dapp, web3 site etc. — to work, you will have to:

  // Detect the Ethereum provider (window.ethereum)
  // Detect which Ethereum network the user is connected to
  // Get the user's Ethereum account(s)

  //This function will be called when the user click on the button to connect his wallet. When he's clicking on the button, we want to show  the ChainId, the last block number, and user address on /chain-info + [feature] his balance
  const connectWalletHandler = () => {
    //Does the user have metamask ?
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      // Use request to submit RPC requests to Ethereum via MetaMask. It returns a Promise that resolves to the result of the RPC method call.
      //  This method allows the user to authorize Ethereum to provide the account information (the account address, the address and the publicKey
      //  of the account's current Ethereum provider, and the chain ID of the Ethereum chain the account is connected to) to the dapp.
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getChainIdAndBlockNumber();
        })
        .catch((error) => {
          // If the request fails for any reason, the Promise will reject with an Ethereum RPC Error.
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render ||| This method will setup our Account (address), and our balance
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    window.ethereum
      .request({ method: "eth_getBalance", params: [newAccount.toString(), "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  async function getChainIdAndBlockNumber() {
    // Get the provider from the global window object
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the ChainId and the last block number
    const id = await provider.getNetwork().then((network) => network.chainId);
    const number = await provider.getBlockNumber();

    // Update the state with the values
    setChainId(id);
    setBlockNumber(number);
  }

  // listen for account changes (not necessary bc we listen the 1st time we connect)
  // window.ethereum.on("accountsChanged", accountChangedHandler);

  return (
    <>
      <Layout></Layout>
      <div className="ChainInfo">
        <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
        <button onClick={connectWalletHandler}>{connButtonText}</button>
        {chainId == 11155111 && (
          <div>
            <div className="accountDisplay">
              <h3>Address: {defaultAccount}</h3>
            </div>
            <div className="balanceDisplay">
              <h3>Balance: {userBalance}</h3>
            </div>
            <div className="chainIdDisplay">
              <h3>ChainId: {chainId}</h3>
            </div>
            <div className="blockNumberDisplay">
              <h3>BlockNumber: {blockNumber}</h3>
            </div>
          </div>
        )}

        {errorMessage}
      </div>
      {chainId != 11155111 && chainId != null && window.open("./NotFound", "_self")}
    </>
  );
};

export default ChainInfo;
