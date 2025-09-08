export default function ListingCard({ listing, onBid }) {
  const { id, product, reservePriceEth, highestBidEth, highestBidder, ended } = listing;
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>{product}</strong>
        <span className="muted">ID #{id}</span>
      </div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span>Reserve: {reservePriceEth} ETH</span>
        <span>Highest: {highestBidEth} ETH</span>
      </div>
      <div className="muted" style={{ wordBreak: "break-all" }}>Top bidder: {highestBidder || "-"}</div>
      {onBid && !ended && (
        <div className="row">
          <input placeholder="Bid amount (ETH)" id={`bid-${id}`} />
          <button onClick={() => {
            const input = document.getElementById(`bid-${id}`);
            onBid(id, input?.value || "");
          }}>Bid</button>
        </div>
      )}
    </div>
  );
}


