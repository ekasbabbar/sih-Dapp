import { useEffect, useMemo, useState } from "react";
import { Contract } from "ethers";
import { marketplaceAddress, marketplaceABI } from "../config/marketplaceConfig";

export function useMarketplaceContract(provider) {
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function resolveSigner() {
      if (!provider) {
        if (mounted) setSigner(null);
        return;
      }
      const s = await provider.getSigner();
      if (mounted) setSigner(s);
    }
    resolveSigner();
    return () => { mounted = false; };
  }, [provider]);

  const contract = useMemo(() => {
    if (!signer) return null;
    return new Contract(marketplaceAddress, marketplaceABI, signer);
  }, [signer]);

  return contract;
}


