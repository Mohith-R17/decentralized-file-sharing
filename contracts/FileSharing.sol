// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharing {
    struct File {
        string fileName;
        string fileHash;
    }

    mapping(address => File[]) private userFiles;

    event FileUploaded(address indexed user, string fileName, string fileHash);
    event FileDeleted(address indexed user, uint256 fileIndex);

    function uploadFile(string memory _fileName, string memory _fileHash) public {
        userFiles[msg.sender].push(File(_fileName, _fileHash));
        emit FileUploaded(msg.sender, _fileName, _fileHash);
    }

    function getMyFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }

    function deleteFile(uint256 _index) public {
        require(_index < userFiles[msg.sender].length, "Invalid file index");
        for (uint256 i = _index; i < userFiles[msg.sender].length - 1; i++) {
            userFiles[msg.sender][i] = userFiles[msg.sender][i + 1];
        }
        userFiles[msg.sender].pop(); // Remove the last file after shifting
        emit FileDeleted(msg.sender, _index);
    }
}
