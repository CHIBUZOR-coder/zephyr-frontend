// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   PhantomWalletAdapter,
//   SolflareWalletAdapter,
// } from "@solana/wallet-adapter-wallets";
// import { clusterApiUrl } from "@solana/web3.js";

// export const network = WalletAdapterNetwork.Devnet;

// // Generates the correct RPC URL for Devnet
// // Example: https://api.devnet.solana.com

// export const endpoint = clusterApiUrl(network);

// export const wallets = [
//   new PhantomWalletAdapter(),
//   new SolflareWalletAdapter({ network }),
// ];
// wallet.ts
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const network = WalletAdapterNetwork.Devnet;
export const endpoint = clusterApiUrl(network);
export const wallets = [];
