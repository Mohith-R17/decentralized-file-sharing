import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import FileList from './components/FileList';
import FileSharingJSON from "./abi/FileSharing.json";

const CONTRACT_ADDRESS = "0x7f179A312992Dd79887d7a1e650Ab194920e17f3";
const CONTRACT_ABI = FileSharingJSON.abi;

function App() {
  const [account, setAccount] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      window.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      loadMyFiles();
    }
  };

  const loadMyFiles = async () => {
    const files = await window.contract.getMyFiles();
    setUploadedFiles(files);
  };

  const uploadToPinata = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "bb841395fcae9adfb693",
        pinata_secret_api_key: "869313d137ee940b01bcffb8f1c7971f0cd456ab256165125c0381d2e66875cb",
      },
    });

    const hash = res.data.IpfsHash;
    await window.contract.uploadFile(fileName, hash);
    alert("File uploaded!");
    loadMyFiles();
  };

  const deleteFile = async (index) =>{
    try{
      await window.contract.deleteFile(index);
      alert("File deleted!");
      loadMyFiles();
    }
    catch(error){
      alert("Error deleting file");
      console.error(error);
      }
  }

  return (
    <div>
      <h2> Decentralized File Sharing DApp</h2>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
      </button>

      <br /><br />
      <input
        type="text"
        placeholder="File name"
        onChange={(e) => setFileName(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadToPinata}>Upload File</button>

      <FileList uploadedFiles={uploadedFiles} onDelete={deleteFile} />
    </div>
  );
}

export default App;
