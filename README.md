# 🔗 Decentralized File Sharing DApp

---

## 📌 Overview

Built a decentralized file sharing application that allows users to securely upload, store, and manage files using blockchain and IPFS.

The system uses a smart contract to store file metadata on-chain while actual files are stored on IPFS, ensuring decentralization and data integrity.

---

## 💡 Features

- 🔐 Connect wallet (MetaMask)
- 📤 Upload files to IPFS (Pinata)
- 📁 Store file references on blockchain
- 📂 View uploaded files
- ❌ Delete files from contract storage
- 🔗 Decentralized architecture

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Ethers.js

### Blockchain
- Solidity (Smart Contract)
- Hardhat (Development & deployment)

### Storage
- IPFS (via Pinata)

---

## 🏗️ Architecture

User → React App → MetaMask  
             ↓  
        Smart Contract (Ethereum)  
             ↓  
            IPFS (File Storage)

---

## 🧠 Key Implementation

- Smart contract to store file metadata (name + IPFS hash)
- Wallet integration using Ethers.js
- File uploads using Pinata API
- Dynamic UI to fetch and display user files
- Interaction with blockchain using signer-based transactions

---

## 🚧 Current Status

- Running locally with Hardhat
- Planned deployment on Ethereum testnet (Sepolia)

---

## 🚀 Future Improvements

- Access control for shared files
- File sharing between users
- Better UI/UX for file management
- Secure API key handling using backend

---

## ▶️ Run Locally

```bash
git clone https://github.com/bestorbust/decentralized-file-sharing
cd decentralized-file-sharing
npm install
npm start
