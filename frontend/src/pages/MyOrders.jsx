import { useEffect, useState } from "react";
import "./MyOrders.css";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!user) return;

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(
      allOrders.filter(o => o.customer === user.name).reverse()
    );
  }, [user]);

  /* ===============================
     ❌ CANCEL ORDER
     =============================== */
  const cancelOrder = (id) => {
    if (!window.confirm("Cancel this order?")) return;

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.map(o =>
      o.id === id ? { ...o, status: "Cancelled" } : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(
      updated.filter(o => o.customer === user.name).reverse()
    );
  };

  /* ===============================
     📄 DOWNLOAD INVOICE
     =============================== */
  const downloadInvoice = (order) => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; }
          </style>
        </head>
        <body>
          <h2>Daily Dairy – Invoice</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Customer:</strong> ${order.customer}</p>
          <p><strong>Status:</strong> ${order.status}</p>

          <table>
            <tr>
              <th>Item</th><th>Qty</th><th>Price</th>
            </tr>
            ${order.items.map(i => `
              <tr>
                <td>${i.name}</td>
                <td>${i.qty}</td>
                <td>₹${i.price * i.qty}</td>
              </tr>
            `).join("")}
          </table>

          <h3>Total: ₹${order.total}</h3>
        </body>
      </html>
    `);
    win.print();
  };

  /* ===============================
     ⭐ SAVE FEEDBACK
     =============================== */
  const submitFeedback = (orderId) => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.map(o =>
      o.id === orderId
        ? { ...o, feedback: { rating, comment } }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(
      updated.filter(o => o.customer === user.name).reverse()
    );

    setRating(5);
    setComment("");
    alert("✅ Feedback submitted");
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet</p>
      ) : (
        orders.map(order => {
          const orderDate = new Date(order.orderDate || Date.now());
          const estimatedDelivery = new Date(
            orderDate.getTime() + 4 * 24 * 60 * 60 * 1000
          ).toDateString();

          return (
            <div key={order.id} className="order-card">

              {/* HEADER */}
              <div className="order-header">
                <div>
                  <strong>Order #{order.id}</strong>
                  <p className="order-date">
                    Ordered on {orderDate.toDateString()}
                  </p>
                </div>
                <div className="order-total">₹{order.total}</div>
              </div>

              {/* ITEMS */}
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h6>{item.name}</h6>
                      <p>Qty {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TRACKER */}
              <div className="order-tracker">
                <span className="step active">Ordered</span>

                <span className={`line ${
                  order.status !== "Pending" &&
                  order.status !== "Cancelled" ? "active" : ""
                }`} />

                <span className={`step ${
                  ["Shipped", "Out for Delivery", "Delivered"].includes(order.status)
                    ? "active" : ""
                }`}>
                  Shipped
                </span>

                <span className={`line ${
                  order.status === "Delivered" ? "active" : ""
                }`} />

                <span className={`step ${
                  order.status === "Delivered" ? "active" : ""
                }`}>
                  Delivered
                </span>
              </div>

              {/* INFO */}
<div className="order-info">
  <p><strong>Status:</strong> {order.status}</p>
  <p>
    <strong>Estimated Delivery:</strong>{" "}
    {order.status === "Delivered"
      ? "Delivered"
      : estimatedDelivery}
  </p>
</div>

{/* 🔐 DELIVERY OTP (CUSTOMER VIEW ONLY) */}
{order.status === "Out for Delivery" && order.deliveryOTP && (
  <div className="alert alert-warning mt-3">
    <strong>Delivery OTP:</strong>{" "}
    <span style={{ fontSize: "18px", letterSpacing: "2px" }}>
      {order.deliveryOTP}
    </span>
    <p className="mb-0 text-muted">
      Share this OTP with the delivery person to confirm delivery
    </p>
  </div>
)}


              {/* ⭐ FEEDBACK */}
              {order.status === "Delivered" && !order.feedback && (
                <div className="feedback-box">
                  <h6>Rate this order</h6>

                  <select
                    className="form-select mb-2"
                    value={rating}
                    onChange={(e) =>
                      setRating(Number(e.target.value))
                    }
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Good</option>
                    <option value={3}>⭐⭐⭐ Average</option>
                    <option value={2}>⭐⭐ Poor</option>
                    <option value={1}>⭐ Bad</option>
                  </select>

                  <textarea
                    className="form-control mb-2"
                    placeholder="Write feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => submitFeedback(order.id)}
                  >
                    Submit Feedback
                  </button>
                </div>
              )}

              {/* SHOW FEEDBACK */}
              {order.feedback && (
                <div className="feedback-box bg-light">
                  <p>
                    <strong>Rating:</strong>{" "}
                    {"⭐".repeat(order.feedback.rating)}
                  </p>
                  <p>
                    <strong>Comment:</strong>{" "}
                    {order.feedback.comment}
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="order-actions">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => downloadInvoice(order)}
                >
                  Download Invoice
                </button>

                {order.status === "Pending" && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>
          );
        })
      )}
    </div>
  );
}
