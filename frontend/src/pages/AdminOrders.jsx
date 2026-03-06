import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [deliveryUsers, setDeliveryUsers] = useState([]);

  useEffect(() => {
    loadOrders();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];
    setDeliveryUsers(users.filter(u => u.role === "delivery"));
  }, []);

  const loadOrders = () => {
    const all =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(all);
  };

  const saveOrders = (updated) => {
    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);
  };

  const updateStatus = (id, status) => {
    const all =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = all.map(o =>
      o.id === id ? { ...o, status } : o
    );

    saveOrders(updated);
  };

  const assignDelivery = (id, person) => {
    const all =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = all.map(o =>
      o.id === id
        ? { ...o, deliveryPerson: person }
        : o
    );

    saveOrders(updated);
  };

  return (
    <div className="container dashboard">
      <h2>Orders</h2>
      <p className="subtitle">
        Manage customer orders & delivery
      </p>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Payment Status</th>
              <th>Delivery Person</th>
              <th>Order Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.customer}</td>
                <td>₹{o.total}</td>
                <td>{o.paymentMethod}</td>

                <td>
                  <span
                    className={
                      o.paymentStatus === "Paid"
                        ? "badge bg-success"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {o.paymentStatus}
                  </span>
                </td>

                {/* ASSIGN DELIVERY */}
                <td>
                  <select
                    className="form-select"
                    value={o.deliveryPerson || ""}
                    onChange={(e) =>
                      assignDelivery(o.id, e.target.value)
                    }
                  >
                    <option value="">Assign</option>
                    {deliveryUsers.map(d => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* STATUS */}
                <td>
                  <select
                    className="form-select"
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(o.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
