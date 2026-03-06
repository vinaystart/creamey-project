import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Payment.css";

export default function Payment({ user }) {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const placeOrder = () => {
    if (!user) {
      alert("Please login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    /* ===============================
       📍 ADDRESS VALIDATION
       =============================== */
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill delivery address");
      return;
    }

    /* ===============================
       💳 PAYMENT VALIDATION
       =============================== */
    if (paymentMethod === "UPI" && !upiId) {
      alert("Enter UPI ID");
      return;
    }

    if (paymentMethod === "CARD" && !card.number) {
      alert("Enter card details");
      return;
    }

    if (paymentMethod === "WALLET") {
      alert("Wallet payment successful (Dummy)");
    }

    /* ===============================
       🔥 STOCK AUTO-REDUCTION
       =============================== */
    /* ===============================
   🔥 STOCK AUTO-REDUCTION
   =============================== */

// Get current products from localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// Reduce stock for purchased items
const updatedProducts = products.map((product) => {
  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    return {
      ...product,
      stock: product.stock - cartItem.qty
    };
  }

  return product;
});

// Save updated products back
localStorage.setItem("products", JSON.stringify(updatedProducts));


    /* ===============================
       📦 SAVE ORDER
       =============================== */
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      id: Date.now(),
      customer: user.name,
      items: cart,
      total,
      address,
      paymentMethod,
      paymentStatus:
        paymentMethod === "COD" ? "Pending" : "Paid",
      status: "Pending",
      orderDate: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("✅ Order placed successfully");
    navigate("/customer/orders");
  };

  return (
    <div className="container my-5 payment-page">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-md-7">
          {/* ADDRESS */}
          <div className="payment-card">
            <h5>Delivery Address</h5>

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Phone"
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Street Address"
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />

            <div className="row">
              <div className="col">
                <input
                  className="form-control mb-2"
                  placeholder="City"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <input
                  className="form-control mb-2"
                  placeholder="Pincode"
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* PAYMENT OPTIONS */}
          <div className="payment-card mt-4">
            <h5>Payment Options</h5>

            {/* COD */}
            <div className="payment-option">
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span>Cash on Delivery</span>
            </div>

            {/* UPI */}
            <div className="payment-option">
              <input
                type="radio"
                checked={paymentMethod === "UPI"}
                onChange={() => setPaymentMethod("UPI")}
              />
              <span>UPI (GPay / PhonePe / Paytm)</span>
            </div>

            {paymentMethod === "UPI" && (
              <input
                className="form-control mt-2"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            )}

            {/* CARD */}
            <div className="payment-option mt-3">
              <input
                type="radio"
                checked={paymentMethod === "CARD"}
                onChange={() => setPaymentMethod("CARD")}
              />
              <span>Credit / Debit Card</span>
            </div>

            {paymentMethod === "CARD" && (
              <div className="mt-2">
                <input
                  className="form-control mb-2"
                  placeholder="Card Number"
                  onChange={(e) =>
                    setCard({ ...card, number: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Name on Card"
                  onChange={(e) =>
                    setCard({ ...card, name: e.target.value })
                  }
                />
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="MM/YY"
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="CVV"
                      type="password"
                      onChange={(e) =>
                        setCard({ ...card, cvv: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* WALLET (DUMMY) */}
            <div className="payment-option mt-3">
              <input
                type="radio"
                checked={paymentMethod === "WALLET"}
                onChange={() => setPaymentMethod("WALLET")}
              />
              <span>Wallet (Paytm / PhonePe)</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-5">
          <div className="payment-card summary">
            <h5>Order Summary</h5>

            <div className="summary-row">
              <span>Total</span>
              <span className="fw-bold">₹{total}</span>
            </div>

            <button
              className="btn btn-success w-100 mt-4"
              onClick={placeOrder}
            >
              Pay & Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
