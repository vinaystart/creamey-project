import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function CustomerDashboard() {
  return (
    <div className="container dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Shop fresh dairy & track your orders</p>
      </div>

      {/* ACTION CARDS */}
      <div className="row g-4 mt-4">
        {/* Browse Products */}
        <div className="col-md-4">
          <Link to="/products" className="text-decoration-none">
            <div className="dashboard-card highlight">
              <div className="dashboard-icon">🛍️</div>
              <h4>Browse Products</h4>
              <p>Explore fresh dairy products</p>
            </div>
          </Link>
        </div>

        {/* Cart */}
        <div className="col-md-4">
          <Link to="/cart" className="text-decoration-none">
            <div className="dashboard-card">
              <div className="dashboard-icon">🛒</div>
              <h4>Your Cart</h4>
              <p>Review & checkout items</p>
            </div>
          </Link>
        </div>

        {/* Orders */}
        <div className="col-md-4">
          <Link to="/customer/orders" className="text-decoration-none">
            <div className="dashboard-card">
              <div className="dashboard-icon">📦</div>
              <h4>My Orders</h4>
              <p>Track delivery & status</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
