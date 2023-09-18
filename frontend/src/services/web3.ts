import { MetaMaskSDK, MetaMaskSDKOptions } from "@metamask/sdk";

const options: MetaMaskSDKOptions = {
  injectProvider: false,
  // checkInstallationImmediately: true,
  dappMetadata: { name: "7vision", url: "https://7vfi.ai" },
  preferDesktop: true,
};

const MMSDK = new MetaMaskSDK(options);
// ethereum.isConnected
const web3Service = {
  connectMetamask: async () => {
    const ethereum = MMSDK.getProvider();

    // console.log(ethereum);
    await ethereum.request({ method: "eth_requestAccounts", params: [] });
  },
};

export default web3Service;
