export default function RoleToggle({ role, onChange }) {
  return (
    <div className="row" role="radiogroup" aria-label="Role selector">
      <label>
        <input
          type="radio"
          value="seller"
          checked={role === "seller"}
          onChange={(e) => onChange(e.target.value)}
        />
        Farmer (Seller)
      </label>
      <label>
        <input
          type="radio"
          value="buyer"
          checked={role === "buyer"}
          onChange={(e) => onChange(e.target.value)}
        />
        Distributor (Buyer)
      </label>
    </div>
  );
}


