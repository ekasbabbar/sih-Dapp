import { useCallback, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    setConnecting(true);
    try {
      const p = new BrowserProvider(window.ethereum);
      const accounts = await p.send("eth_requestAccounts", []);
      const network = await p.getNetwork();
      setProvider(p);
      setAccount(accounts[0] || null);
      setChainId(Number(network.chainId));
      return { account: accounts[0], provider: p, chainId: Number(network.chainId) };
    } finally {
      setConnecting(false);
    }
  }, []);

  // Keep in sync with wallet changes
  useEffect(() => {
    if (!window.ethereum) return;
    const onAccountsChanged = (accs) => setAccount(accs[0] || null);
    const onChainChanged = () => window.location.reload();
    window.ethereum.on?.("accountsChanged", onAccountsChanged);
    window.ethereum.on?.("chainChanged", onChainChanged);
    return () => {
      window.ethereum.removeListener?.("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener?.("chainChanged", onChainChanged);
    };
  }, []);

  return { account, provider, chainId, connect, connecting };
}


