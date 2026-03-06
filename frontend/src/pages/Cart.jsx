import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Cart.css";

export default function Cart({ user }) {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    if (!window.confirm("Remove this item from cart?")) return;
    updateCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const proceedToPayment = () => {
    if (!user) {
      alert("Please login to continue");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    navigate("/payment");
  };

  return (
    <div className="container my-5 cart-page">
      <h2 className="fw-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h4>Your cart is empty</h4>
          <p>Add fresh dairy products to continue</p>
        </div>
      ) : (
        <div className="row">
          {/* CART ITEMS */}
          <div className="col-md-8">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>

                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item.id)}
                    >
                      −
                    </button>
                    <span className="qty">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-item-total">
                    ₹{item.price * item.qty}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="col-md-4">
            <div className="order-summary">
              <h5>Order Summary</h5>

              <div className="summary-row">
                <span>Total Amount</span>
                <span className="fw-bold">₹{total}</span>
              </div>

              <button
                className="btn btn-success w-100 mt-4"
                onClick={proceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
