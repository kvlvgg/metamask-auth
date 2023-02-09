import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";

export {};

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
    web3: Web3;
  }
}
