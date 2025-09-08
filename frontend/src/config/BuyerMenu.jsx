export default function BuyerMenu({ listingId, bidValue, onChangeListingId, onChangeBidValue, onPlaceBid, onReleaseFunds }) {
  return (
    <div className="col" style={{ gap: 12 }}>
      <h2>Buyer Actions</h2>
      <div className="row">
        <input
          placeholder="Listing ID"
          value={listingId}
          onChange={(e) => onChangeListingId?.(e.target.value)}
        />
        <input
          placeholder="Bid amount (ETH)"
          value={bidValue}
          onChange={(e) => onChangeBidValue?.(e.target.value)}
        />
        <button onClick={() => onPlaceBid?.()}>Place Bid</button>
      </div>
      <div className="row">
        <input
          placeholder="Listing ID"
          value={listingId}
          onChange={(e) => onChangeListingId?.(e.target.value)}
        />
        <button className="success" onClick={() => onReleaseFunds?.()}>Release Funds</button>
      </div>
    </div>
  );
}


