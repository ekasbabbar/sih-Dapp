import ListingCard from "../components/ListingCard.jsx";

export default function Listings({ listings = [], onBid }) {
  return (
    <div className="container" style={{ display: "grid", gap: 12 }}>
      {listings.length === 0 && (
        <div className="card">No listings yet.</div>
      )}
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} onBid={onBid} />)
      )}
    </div>
  );
}


