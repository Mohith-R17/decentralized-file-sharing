import React from "react";

const FileList = ({ uploadedFiles, onDelete }) => {
    const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
    };

    const shareLink = async (link) => {
    if (navigator.share) {
        try {
        await navigator.share({
            title: "Check out this file!",
            url: link,
        });
        } catch (error) {
        console.error("Sharing failed:", error);
        }
    } else {
        alert("Web Share not supported. Use copy instead.");
    }
    };

    return (
    <div style={{ padding: "1rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>My Files:</h3>
        {uploadedFiles.length === 0 ? (
        <p>No files uploaded yet.</p>
        ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {uploadedFiles.map((file, index) => {
            const link = `https://gateway.pinata.cloud/ipfs/${file.fileHash}`;
            return (
                <li
                key={index}
                style={{
                    marginBottom: "1rem",
                    background: "#f0f0f0",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                }}
                >
                <strong style={{ fontSize: "1.1rem" }}>{file.fileName}</strong>
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "#007bff",
                      textDecoration: "underline",
                    }}
                    >
                    View
                    </a>
                    <button
                    onClick={() => copyToClipboard(link)}
                    style={{
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    >
                    Copy Link
                    </button>
                    <button
                    onClick={() => shareLink(link)}
                    style={{
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    >
                    Share
                    </button>
                    <button
                    onClick={() => onDelete(index)}
                    style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    >
                    Delete
                    </button>
                </div>
                </li>
            );
            })}
        </ul>
        )}
    </div>
    );
};

export default FileList;
