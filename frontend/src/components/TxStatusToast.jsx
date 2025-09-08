export default function TxStatusToast({ status }) {
  if (!status) return null;
  const isError = /failed|error|❌/i.test(status);
  const isSuccess = /✅|success/i.test(status);
  const className = isError ? "danger" : isSuccess ? "success" : "secondary";
  return (
    <div className="card" style={{ marginTop: 12, borderLeft: `4px solid transparent` }}>
      <span className={`muted`}>Status</span>
      <div>
        <span className={`badge ${className}`}>{status}</span>
      </div>
    </div>
  );
}


