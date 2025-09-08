import { useState } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";
import TxStatusToast from "./components/TxStatusToast.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { marketplaceAddress, marketplaceABI } from "./config/marketplaceConfig";

function App() {
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);
  const [role, setRole] = useState("buyer"); // 👈 default role

  // Inputs
  const [product, setProduct] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [listingId, setListingId] = useState(1);
  const [bidValue, setBidValue] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("MetaMask not found");
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setAccount(accounts[0]);

    const contract = new Contract(marketplaceAddress, marketplaceABI, signer);
    setMarketplace(contract);

    setStatus("Wallet connected & contract loaded ✅");
  }

  async function createListing() {
    if (!marketplace) return setStatus("Contract not loaded ❌");
    try {
      const wei = ethers.parseEther(reservePrice);
      setProcessing(true);
      setStatus("Requesting signature in wallet ⏳...");
      const tx = await marketplace.createListing(product, wei);
      setStatus(`Transaction submitted ⏳... hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Listing created ✅");
    } catch (err) {
      console.error(err);
      setStatus("Listing failed ❌");
    } finally {
      setProcessing(false);
    }
  }

  async function placeBid() {
    if (!marketplace) return setStatus("Contract not loaded ❌");
    try {
      const value = ethers.parseEther(bidValue);
      setProcessing(true);
      setStatus("Requesting signature in wallet ⏳...");
      const tx = await marketplace.placeBid(listingId, { value });
      setStatus(`Transaction submitted ⏳... hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Bid placed ✅");
    } catch (err) {
      console.error(err);
      setStatus("Bid failed ❌");
    } finally {
      setProcessing(false);
    }
  }

  async function fetchListing() {
    if (!marketplace) return setStatus("Contract not loaded ❌");
    try {
      setProcessing(true);
      setStatus("Fetching listing ⏳...");
      const id = BigInt(String(listingId || "0"));
      if (id <= 0n) throw new Error("Invalid listing id");

      const l = await marketplace.listings(id);
      // Some contracts keep highest bid in a separate call
      let highestBidEth = "0";
      let highestBidder = l.highestBidder;
      try {
        const hb = await marketplace.getHighestBid(id);
        highestBidEth = ethers.formatEther(hb.amount);
        highestBidder = hb.bidder;
      } catch {
        highestBidEth = ethers.formatEther(l.highestBid ?? 0n);
      }

      const reserveEth = ethers.formatEther(l.reservePrice ?? 0n);
      setStatus(
        `Product: ${l.product || ""} | Reserve: ${reserveEth} ETH | Highest Bid: ${highestBidEth} ETH | Highest Bidder: ${highestBidder}`
      );
    } catch (err) {
      console.error(err);
      setStatus("Fetch failed ❌");
    } finally {
      setProcessing(false);
    }
  }

  async function endAuction() {
    if (!marketplace) return setStatus("Contract not loaded ❌");
    try {
      setProcessing(true);
      setStatus("Requesting signature in wallet ⏳...");
      const tx = await marketplace.endAuction(listingId);
      setStatus(`Transaction submitted ⏳... hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Auction ended ✅");
    } catch (err) {
      console.error(err);
      setStatus("End auction failed ❌");
    } finally {
      setProcessing(false);
    }
  }

  async function releaseFunds() {
    if (!marketplace) return setStatus("Contract not loaded ❌");
    try {
      setProcessing(true);
      setStatus("Requesting signature in wallet ⏳...");
      const tx = await marketplace.releaseFunds(listingId);
      setStatus(`Transaction submitted ⏳... hash: ${tx.hash}`);
      await tx.wait();
      setStatus("Funds released ✅");
    } catch (err) {
      console.error(err);
      setStatus("Release funds failed ❌");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="container card" style={{ width: "100%", maxWidth: 800 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1 style={{ margin: 0 }}>Marketplace DApp</h1>
          <ThemeToggle />
        </div>

      {!account ? (
        <button onClick={connectWallet} disabled={processing}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>

          {/* Role Toggle */}
          <div>
            <label>
              <input
                type="radio"
                value="seller"
                checked={role === "seller"}
                onChange={(e) => setRole(e.target.value)}
              />
              Farmer (Seller)
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                value="buyer"
                checked={role === "buyer"}
                onChange={(e) => setRole(e.target.value)}
              />
              Distributor (Buyer)
            </label>
          </div>

          {/* Seller Menu */}
          {role === "seller" && (
            <>
              <h2>Create Listing</h2>
              <input
                placeholder="Product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
              <input
                placeholder="Reserve price (ETH)"
                value={reservePrice}
                onChange={(e) => setReservePrice(e.target.value)}
              />
              <button onClick={createListing} disabled={processing}>Create Listing</button>

              <h2>Manage Auction</h2>
              <input
                placeholder="Listing ID"
                value={listingId}
                onChange={(e) => setListingId(e.target.value)}
              />
              <button onClick={endAuction} disabled={processing}>End Auction</button>
            </>
          )}

          {/* Buyer Menu */}
          {role === "buyer" && (
            <>
              <h2>Place Bid</h2>
              <input
                placeholder="Listing ID"
                value={listingId}
                onChange={(e) => setListingId(e.target.value)}
              />
              <input
                placeholder="Bid amount (ETH)"
                value={bidValue}
                onChange={(e) => setBidValue(e.target.value)}
              />
              <button onClick={placeBid} disabled={processing}>Place Bid</button>

              <h2>Confirm Delivery</h2>
              <input
                placeholder="Listing ID"
                value={listingId}
                onChange={(e) => setListingId(e.target.value)}
              />
              <button onClick={releaseFunds} disabled={processing}>Release Funds</button>
            </>
          )}

          <h2>Fetch Listing</h2>
          <input
            placeholder="Listing ID"
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
          />
          <button onClick={fetchListing}>Fetch Details</button>
        </>
      )}

        <TxStatusToast status={status} />
      </div>
    </div>
  );
}

export default App;
