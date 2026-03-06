import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function LabDashboard() {
  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h2>Lab Technician Dashboard 🧪</h2>
        <p className="subtitle">Milk quality testing & approval</p>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <Link to="/lab/milk-approval" className="text-decoration-none">
            <div className="dashboard-card highlight">
              <div className="dashboard-icon">🧫</div>
              <h4>Milk Approval</h4>
              <p>Approve / Reject milk batches</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
