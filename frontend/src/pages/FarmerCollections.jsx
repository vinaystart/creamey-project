import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Dashboard.css";

export default function FarmerCollections({ user }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const all =
      JSON.parse(localStorage.getItem("milkCollections")) || [];

    setRecords(all.filter(r => r.farmerName === user.name));
  }, [user]);

  const downloadPDF = (r) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Daily Dairy - Milk Payslip", 14, 15);

    autoTable(doc, {
      startY: 25,
      theme: "grid",
      head: [["Field", "Details"]],
      body: [
        ["Farmer Name", r.farmerName],
        ["Date", r.date],
        ["Quantity (L)", r.quantity],
        ["Fat %", r.fat],
        ["SNF %", r.snf],
        ["Rate per Liter", "₹40"],
        ["Total Amount", `₹${r.amount}`],
        ["Status", r.status],
        ["Payment", r.payment],
      ],
    });

    doc.save(`Payslip_${r.farmerName}_${r.date}.pdf`);
  };

  return (
    <div className="container dashboard">
      <h2>My Milk Collections</h2>
      <p className="subtitle">Approval & payment status</p>

      {records.length === 0 ? (
        <p>No records yet</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Qty (L)</th>
                <th>Fat %</th>
                <th>SNF %</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.quantity}</td>
                  <td>{r.fat}</td>
                  <td>{r.snf}</td>
                  <td>
                    <span className="badge bg-success">
                      {r.status}
                    </span>
                  </td>
                  <td className="fw-bold">
                    {r.amount ? `₹${r.amount}` : "—"}
                  </td>
                  <td>
                    {r.payment === "Paid" && (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => downloadPDF(r)}
                      >
                        📄 Download Payslip
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
