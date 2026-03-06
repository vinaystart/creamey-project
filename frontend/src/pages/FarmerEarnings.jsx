import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function FarmerEarnings({ user }) {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) return;

    const all =
      JSON.parse(localStorage.getItem("milkCollections")) || [];

    const paidRecords = all.filter(
      (r) =>
        r.farmerName === user.name &&
        r.status === "Approved" &&
        r.payment === "Paid"
    );

    setRecords(paidRecords);

    const sum = paidRecords.reduce(
      (acc, r) => acc + r.quantity * 40, // ₹40 per liter (example)
      0
    );

    setTotal(sum);
  }, [user]);

  return (
    <div className="container dashboard">
      <h2>My Earnings</h2>
      <p className="subtitle">Paid milk collections</p>

      <div className="dashboard-card analytics mb-4">
        <h3>₹{total}</h3>
        <p>Total Earnings</p>
      </div>

      {records.length === 0 ? (
        <p>No paid records yet</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Quantity (L)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.quantity}</td>
                <td>₹{r.quantity * 40}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
