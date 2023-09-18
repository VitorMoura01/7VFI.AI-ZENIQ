import { MetaMaskSDK } from "@metamask/sdk";

const web3Service = {
  connectMetamask: async () => {
    if (window.ethereum?.isConnected()) {
      const response = await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });
      return response
    }
  },
};

export default web3Service;
