import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function LabMilkApproval() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const all =
      JSON.parse(localStorage.getItem("milkCollections")) || [];
    setRecords(all);
  }, []);

  const save = (updated) => {
    setRecords(updated);
    localStorage.setItem(
      "milkCollections",
      JSON.stringify(updated)
    );
  };

  // ✅ APPROVE = AUTO PAYMENT CREDIT
  const approveMilk = (id) => {
    const updated = records.map((r) =>
      r.id === id
        ? {
            ...r,
            status: "Approved",
            payment: "Paid",
            amount: r.quantity * 40 // ₹40/L
          }
        : r
    );

    save(updated);
    alert("Milk approved & payment credited to farmer");
  };

  // ❌ REJECT
  const rejectMilk = (id) => {
    const updated = records.map((r) =>
      r.id === id
        ? {
            ...r,
            status: "Rejected",
            payment: "Rejected",
            amount: 0
          }
        : r
    );

    save(updated);
  };

  // 🔧 MANUAL PAYMENT OVERRIDE
  const updatePayment = (id, value) => {
    const updated = records.map((r) =>
      r.id === id ? { ...r, payment: value } : r
    );
    save(updated);
  };

  return (
    <div className="container dashboard">
      <h2>Milk Quality Approval</h2>
      <p className="subtitle">
        Approve milk batches & manage farmer payments
      </p>

      {records.length === 0 ? (
        <p>No milk submissions</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Farmer</th>
              <th>Date</th>
              <th>Qty (L)</th>
              <th>Fat %</th>
              <th>SNF %</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.farmerName}</td>
                <td>{r.date}</td>
                <td>{r.quantity}</td>
                <td>{r.fat}</td>
                <td>{r.snf}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={
                      r.status === "Approved"
                        ? "badge bg-success"
                        : r.status === "Rejected"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {r.status}
                  </span>
                </td>

                {/* PAYMENT OVERRIDE */}
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={r.payment}
                    disabled={r.status !== "Approved"}
                    onChange={(e) =>
                      updatePayment(r.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                {/* ACTIONS */}
                <td>
                  {r.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => approveMilk(r.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectMilk(r.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
