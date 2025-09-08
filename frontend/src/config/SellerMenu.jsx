export default function SellerMenu({ product, reservePrice, listingId, onChangeProduct, onChangeReservePrice, onChangeListingId, onCreateListing, onEndAuction }) {
  return (
    <div className="col" style={{ gap: 12 }}>
      <h2>Seller Actions</h2>
      <div className="row">
        <input placeholder="Product" value={product} onChange={(e) => onChangeProduct?.(e.target.value)} />
        <input placeholder="Reserve price (ETH)" value={reservePrice} onChange={(e) => onChangeReservePrice?.(e.target.value)} />
        <button onClick={() => onCreateListing?.()}>Create Listing</button>
      </div>
      <div className="row">
        <input placeholder="Listing ID" value={listingId} onChange={(e) => onChangeListingId?.(e.target.value)} />
        <button className="danger" onClick={() => onEndAuction?.()}>End Auction</button>
      </div>
    </div>
  );
}


