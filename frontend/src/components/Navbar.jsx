import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/cow-logo.png";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // 🔁 Update cart count on route change
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(count);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Daily Dairy" className="dairy-logo" />
          <span className="fw-bold fs-5">Daily Dairy</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto gap-3 align-items-lg-center">

            {/* PUBLIC */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>

            {/* CART */}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>

            {/* DASHBOARD */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to={`/${user.role}`}>
                  Dashboard
                </Link>
              </li>
            )}

            {/* AUTH */}
            {!user ? (
              <li className="nav-item">
                <Link className="btn btn-outline-primary ms-lg-3" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  👤 {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setUser(null)}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
