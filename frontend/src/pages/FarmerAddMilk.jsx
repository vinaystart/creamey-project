import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function FarmerAddMilk({ user }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    quantity: "",
    fat: "",
    snf: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const milkCollections =
      JSON.parse(localStorage.getItem("milkCollections")) || [];

    milkCollections.push({
      id: Date.now(),
      farmerName: user.name,
      quantity: Number(form.quantity),
      fat: Number(form.fat),
      snf: Number(form.snf),
      date: new Date().toLocaleDateString(),
      status: "Pending",
      payment: "Pending",
    });

    localStorage.setItem(
      "milkCollections",
      JSON.stringify(milkCollections)
    );

    alert("Milk collection submitted for approval");
    navigate("/farmer");
  };

  return (
    <div className="container dashboard">
      <h2>Add Milk Collection</h2>
      <p className="subtitle">Submit today’s milk details</p>

      <form onSubmit={handleSubmit} className="col-md-5">
        <input
          className="form-control mb-3"
          placeholder="Quantity (Litres)"
          type="number"
          required
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Fat %"
          type="number"
          step="0.1"
          required
          onChange={(e) =>
            setForm({ ...form, fat: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="SNF %"
          type="number"
          step="0.1"
          required
          onChange={(e) =>
            setForm({ ...form, snf: e.target.value })
          }
        />

        <button className="btn btn-success">
          Submit for Approval
        </button>
      </form>
    </div>
  );
}
