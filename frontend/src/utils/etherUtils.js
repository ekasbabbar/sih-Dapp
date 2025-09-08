import { ethers } from "ethers";

export function toWei(ethString) {
  if (!ethString) return 0n;
  try {
    return ethers.parseEther(String(ethString));
  } catch {
    return 0n;
  }
}

export function fromWei(wei) {
  try {
    return ethers.formatEther(wei ?? 0n);
  } catch {
    return "0";
  }
}


