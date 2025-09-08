import { useState } from "react";

export default function CreateListing({ onCreate }) {
  const [product, setProduct] = useState("");
  const [reserve, setReserve] = useState("");

  return (
    <div className="container">
      <div className="card col">
        <h2>Create Listing</h2>
        <input placeholder="Product name" value={product} onChange={(e) => setProduct(e.target.value)} />
        <input placeholder="Reserve price (ETH)" value={reserve} onChange={(e) => setReserve(e.target.value)} />
        <div className="row">
          <button onClick={() => onCreate?.({ product, reserve })}>Create</button>
        </div>
      </div>
    </div>
  );
}


