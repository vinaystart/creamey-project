import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function FarmerDashboard() {
  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h2>Farmer Dashboard 🌾</h2>
        <p className="subtitle">Manage milk supply & earnings</p>
      </div>

      <div className="row g-4 mt-4">
        {/* SUPPLY MILK */}
        <div className="col-md-4">
          <Link to="/farmer/add-milk" className="text-decoration-none">
            <div className="dashboard-card highlight">
              <div className="dashboard-icon">🥛</div>
              <h4>Supply Milk</h4>
              <p>Submit today’s milk quantity</p>
            </div>
          </Link>
        </div>

        {/* MY COLLECTIONS */}
        <div className="col-md-4">
          <Link to="/farmer/collections" className="text-decoration-none">
            <div className="dashboard-card">
              <div className="dashboard-icon">📋</div>
              <h4>My Collections</h4>
              <p>Approval & payment status</p>
            </div>
          </Link>
        </div>

        {/* EARNINGS */}
        <div className="col-md-4">
          <Link to="/farmer/earnings" className="text-decoration-none">
            <div className="dashboard-card">
              <div className="dashboard-icon">💵</div>
              <h4>Earnings</h4>
              <p>View paid amount & history</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
