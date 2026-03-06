import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function AdminMonthlySettlement() {
  const [settlements, setSettlements] = useState({});

  useEffect(() => {
    const records =
      JSON.parse(localStorage.getItem("milkCollections")) || [];

    const paid = records.filter(
      r => r.status === "Approved" && r.payment === "Paid"
    );

    const summary = {};

    paid.forEach(r => {
      if (!summary[r.farmerName]) {
        summary[r.farmerName] = 0;
      }
      summary[r.farmerName] += r.amount;
    });

    setSettlements(summary);
  }, []);

  return (
    <div className="container dashboard">
      <h2>Monthly Farmer Settlement</h2>
      <p className="subtitle">Auto calculated payouts</p>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Farmer</th>
            <th>Total Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(settlements).map(name => (
            <tr key={name}>
              <td>{name}</td>
              <td>₹{settlements[name]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
