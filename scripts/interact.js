// interact.js

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// get contract information
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
// console.log(JSON.stringify(contract.abi));
// [   {"inputs":[{"internalType":"string","name":"initMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},
//     {"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"oldStr","type":"string"},{"indexed":false,"internalType":"string","name":"newStr","type":"string"}],"name":"UpdatedMessages","type":"event"},
//     {"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
//     {"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"}]


const ethers = require('ethers');
// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);
// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
// Contract
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

//
async function main() {
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);
  // The message is: Hello World!

  console.log("Updating the message...");
  const tx = await helloWorldContract.update("This is the new message.");
  await tx.wait();

  const newMessage = await helloWorldContract.message();
  console.log("The new message is: " + newMessage);
}

main();
