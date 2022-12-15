# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Infos

The purpose of this project is to perform a number of actions via different "fake nft" contracts deployed on the Seploia testnet.

Feel free to navigate accross the website.

Contracts
Fake BAYC ( 0x1dA89342716B14602664626CD3482b47D5C2005E on Sepolia )
Fake Nefturians (0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED on Sepolia )
Fake Meebits (0xD1d148Be044AEB4948B48A03BeA2874871a26003 on Sepolia )
Fake Meebits Claimer (0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55 on Sepolia )

I start by doing npx create-react-app erc721-front
Then I do npm i -D react-router-dom, clean all the stuff that I don't need, and run npm start.

Structure :
index.html --> our web page

folder pages --> contain all the different page of the project

app.js and index.js, learn the difference : https://stackoverflow.com/questions/50493069/why-does-create-react-app-creates-both-app-js-and-index-js

Layout.jsx allows us to navigate between the different pages.

We use a lot `send()` and `call()` in our file. The send and call methods are two different ways to interact with an Ethereum contract. The send method allows a user to send ethers or tokens to a contract, then the execution changes the internal variables of the contract. The call method does not send funds and does not change the variables of the contract, it is used to get information from the contract. Therefore, you should use the send method when you want to change the variables of the contract, and the call method when you only want to get information from the contract.

A structure of code that we use a lot :
`const contractAdress = "0x1d...";`
`const abi = require("../contractABI/ABIname.json").abi;`
`let web3 = new Web3(window.ethereum);`
`const contractInstance = new web3.eth.Contract(abi, contractAdress);`

Purpose of this code : new web3.eth.Contract(abi, contractAdress) --> When you create a new contract object you give it the json interface of the respective smart contract and web3 will auto convert all calls into low level ABI calls over RPC for you.

To create this contract object we need the contract address, the ABI of the smart contract, and our provider (that's what we instantiated before).

With this contract object, we can call functions of the SM with, for example in our case : `contractInstance.methods.theNameOfTheFunction().call()` (you can also use send as we have seen above)

Another line of code that we see a lot and which was very usefull for us is `window.ethereum.request(.....)`

MetaMask injects a global API into websites visited by its users at window.ethereum. This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.

So request is used to to submit RPC requests to Ethereum via MetaMask. It returns a Promise that resolves to the result of the RPC method call.

See more on https://docs.metamask.io/guide/ethereum-provider.html#methods
