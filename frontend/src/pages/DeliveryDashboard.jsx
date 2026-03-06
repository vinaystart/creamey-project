import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function DeliveryDashboard({ user }) {
  const [orders, setOrders] = useState([]);
  const [otpInput, setOtpInput] = useState({});

  const loadOrders = () => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(
      allOrders.filter(
        o => o.deliveryPerson === user.name
      )
    );
  };

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const updateStatus = (id, status) => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.map(o => {
      if (o.id === id) {
        // 🔐 Generate OTP when Out for Delivery
        if (status === "Out for Delivery") {
          return {
            ...o,
            status,
            deliveryOTP: Math.floor(1000 + Math.random() * 9000)
          };
        }
        return { ...o, status };
      }
      return o;
    });

    localStorage.setItem("orders", JSON.stringify(updated));
    loadOrders();
  };

  const confirmDelivery = (order) => {
    if (otpInput[order.id] !== String(order.deliveryOTP)) {
      alert("❌ Invalid OTP");
      return;
    }

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.map(o =>
      o.id === order.id
        ? { ...o, status: "Delivered" }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));
    alert("✅ Delivery confirmed");
    loadOrders();
  };

  return (
    <div className="container dashboard">
      <h2>Delivery Dashboard 🚚</h2>
      <p className="subtitle">Assigned deliveries</p>

      {orders.length === 0 ? (
        <p>No orders assigned</p>
      ) : (
        orders.map(o => (
          <div key={o.id} className="dashboard-card mb-3">
            <h5>Order #{o.id}</h5>
            <p><strong>Customer:</strong> {o.customer}</p>
            <p><strong>City:</strong> {o.address?.city}</p>
            <p><strong>Status:</strong> {o.status}</p>

            {/* STATUS UPDATE */}
            {o.status !== "Delivered" && (
              <select
                className="form-select mt-2"
                value={o.status}
                onChange={(e) =>
                  updateStatus(o.id, e.target.value)
                }
              >
                <option>Shipped</option>
                <option>Out for Delivery</option>
              </select>
            )}

            {/* OTP CONFIRMATION */}
            {o.status === "Out for Delivery" && (
              <div className="mt-3">
                <input
                  className="form-control mb-2"
                  placeholder="Enter Delivery OTP"
                  value={otpInput[o.id] || ""}
                  onChange={(e) =>
                    setOtpInput({
                      ...otpInput,
                      [o.id]: e.target.value
                    })
                  }
                />

                <button
                  className="btn btn-success w-100"
                  onClick={() => confirmDelivery(o)}
                >
                  Confirm Delivery
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
