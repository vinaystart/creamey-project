import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  // LOGIN STATE
  const [login, setLogin] = useState({
    name: "",
    password: ""
  });

  // SIGNUP STATE
  const [signup, setSignup] = useState({
    name: "",
    role: "customer",
    password: ""
  });

  /* ================= LOGIN ================= */
  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.name === login.name && u.password === login.password
    );

    if (!user) {
      alert("❌ Invalid username or password");
      return;
    }

    // SET SESSION USER
    setUser({
      name: user.name,
      role: user.role
    });

    navigate(`/${user.role}`);
  };

  /* ================= SIGN UP ================= */
  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.name === signup.name)) {
      alert("⚠️ User already exists");
      return;
    }

    users.push({
      name: signup.name,
      role: signup.role,
      password: signup.password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Account created successfully. Please login.");
    setShowSignup(false);

    // reset signup form
    setSignup({
      name: "",
      role: "customer",
      password: ""
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* ================= LOGIN ================= */}
        <div className="auth-section">
          <h2>Welcome Back 👋</h2>
          <p className="text-muted">Login to continue</p>

          <form onSubmit={handleLogin}>
            <input
              placeholder="Username"
              className="auth-input"
              value={login.name}
              onChange={(e) =>
                setLogin({ ...login, name: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={login.password}
              onChange={(e) =>
                setLogin({ ...login, password: e.target.value })
              }
              required
            />

            <button className="auth-btn primary">
              Login
            </button>
          </form>

          <p className="switch-text">
            New here?{" "}
            <span onClick={() => setShowSignup(true)}>
              Create account
            </span>
          </p>
        </div>

        {/* ================= SIGN UP ================= */}
        <div className={`auth-section signup ${showSignup ? "show" : ""}`}>
          <h2>Create Account ✨</h2>
          <p className="text-muted">Join Daily Dairy</p>

          <form onSubmit={handleSignup}>
            <input
              placeholder="Username"
              className="auth-input"
              value={signup.name}
              onChange={(e) =>
                setSignup({ ...signup, name: e.target.value })
              }
              required
            />

            {/* ROLE SELECTION */}
            <select
              className="auth-input"
              value={signup.role}
              onChange={(e) =>
                setSignup({ ...signup, role: e.target.value })
              }
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
              <option value="delivery">Delivery Person</option>
              <option value="admin">Admin</option>
              <option value="lab">Lab Technician</option>

            </select>

            <input
              type="password"
              placeholder="Create password"
              className="auth-input"
              value={signup.password}
              onChange={(e) =>
                setSignup({ ...signup, password: e.target.value })
              }
              required
            />

            <button className="auth-btn success">
              Sign Up
            </button>
          </form>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setShowSignup(false)}>
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
