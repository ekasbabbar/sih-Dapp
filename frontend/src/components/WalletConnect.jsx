import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function WalletConnect({ onConnected }) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  async function connect() {
    try {
      setError("");
      setConnecting(true);
      if (!window.ethereum) throw new Error("MetaMask not found");
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      onConnected(accounts[0], provider);
    } catch (e) {
      setError(e.message || "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  }

  return (
    <div className="card" style={{ display: "inline-block" }}>
      <button onClick={connect} disabled={connecting}>
        {connecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {error && <div className="muted" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  );
}


