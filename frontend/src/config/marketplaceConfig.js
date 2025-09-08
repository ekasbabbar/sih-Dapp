// Update marketplaceAddress and marketplaceABI to match your deployed contract.
// For local dev, you can hardcode a dummy address and minimal ABI for now.

export const marketplaceAddress = "0x0000000000000000000000000000000000000000";

export const marketplaceABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "product", "type": "string" },
      { "internalType": "uint256", "name": "reservePrice", "type": "uint256" }
    ],
    "name": "createListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "listingId", "type": "uint256" }
    ],
    "name": "endAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "listingId", "type": "uint256" }
    ],
    "name": "releaseFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "listingId", "type": "uint256" }
    ],
    "name": "listings",
    "outputs": [
      { "internalType": "string", "name": "product", "type": "string" },
      { "internalType": "uint256", "name": "reservePrice", "type": "uint256" },
      { "internalType": "address", "name": "seller", "type": "address" },
      { "internalType": "address", "name": "highestBidder", "type": "address" },
      { "internalType": "uint256", "name": "highestBid", "type": "uint256" },
      { "internalType": "bool", "name": "ended", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "listingId", "type": "uint256" }
    ],
    "name": "getHighestBid",
    "outputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "address", "name": "bidder", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "listingId", "type": "uint256" }
    ],
    "name": "placeBid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];


