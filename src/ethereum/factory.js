import Web3 from 'web3';
import ethersProvider from './ether';
import { abiCT } from "./contractTools";

const ethers = require('ethers');
const address = '0xac7eba938a3bfb754cd7915b05454e9471b9f3b7'; //kovan address

const metamaskSigner = ethersProvider.getSigner();

export const instance = new ethers.Contract(address, abiCT, metamaskSigner);