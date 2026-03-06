import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    shipped: 0,
    delivered: 0,
    revenue: 0,
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const shipped = orders.filter(o => o.status === "Shipped").length;
    const delivered = orders.filter(o => o.status === "Delivered").length;

    setStats({
      total: orders.length,
      shipped,
      delivered,
      revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    });
  }, []);

  // ✅ SAFE CHART DATA
  const chartData = useMemo(() => [
    { name: "Shipped", value: stats.shipped },
    { name: "Delivered", value: stats.delivered },
    {
      name: "Pending",
      value: Math.max(stats.total - stats.shipped - stats.delivered, 0),
    },
  ], [stats]);

  const COLORS = ["#0d6efd", "#198754", "#ffc107"];

  return (
    <div className="container dashboard">
      {/* HEADER */}
      <div className="dashboard-header mb-4">
        <h2>Admin Dashboard</h2>
        <p className="subtitle">
          System overview, orders analytics & controls
        </p>
      </div>

      {/* ANALYTICS */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="dashboard-card analytics gradient-blue">
            <span className="analytics-icon">📦</span>
            <h3>{stats.total}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card analytics gradient-orange">
            <span className="analytics-icon">🚚</span>
            <h3>{stats.shipped}</h3>
            <p>Shipped</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card analytics gradient-green">
            <span className="analytics-icon">✅</span>
            <h3>{stats.delivered}</h3>
            <p>Delivered</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card analytics gradient-purple">
            <span className="analytics-icon">💰</span>
            <h3>₹{stats.revenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <h5 className="mb-3 fw-bold">Quick Actions</h5>

      <div className="row g-4">
        <div className="col-md-3">
          <Link to="/admin/add-product" className="text-decoration-none">
            <div className="dashboard-card action-card">
              <div className="dashboard-icon">➕</div>
              <h4>Add Product</h4>
              <p>Create new dairy products</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/products" className="text-decoration-none">
            <div className="dashboard-card action-card">
              <div className="dashboard-icon">📦</div>
              <h4>Manage Products</h4>
              <p>Edit stock & pricing</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/orders" className="text-decoration-none">
            <div className="dashboard-card action-card">
              <div className="dashboard-icon">🚛</div>
              <h4>Manage Orders</h4>
              <p>Update delivery status</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/users" className="text-decoration-none">
            <div className="dashboard-card action-card">
              <div className="dashboard-icon">👥</div>
              <h4>Manage Users</h4>
              <p>Admins, farmers & customers</p>
            </div>
          </Link>
        </div>
      </div>

      {/* CHART */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="dashboard-card analytics">
            <h4 className="mb-3">Order Distribution</h4>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
