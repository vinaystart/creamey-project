import "./Footer.css";
import logo from "../assets/cow-logo.png"; // 🔁 adjust path if needed

export default function Footer() {
  return (
    <footer className="footer-premium mt-auto">
      <div className="container py-5">

        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-lg-4">
            <div className="footer-brand mb-3">
              <img
                src={logo}
                alt="Daily Dairy Logo"
                className="footer-logo"
              />
              <h4 className="fw-bold brand-title mb-0">
                Daily Dairy
              </h4>
            </div>

            <p className="footer-text">
              Premium quality dairy products sourced from trusted farmers,
              ensuring freshness, purity, and doorstep delivery.
            </p>

            <div className="social-icons mt-4">
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-lg-2 col-md-4">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-list">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/orders">My Orders</a></li>
            </ul>
          </div>

          {/* DASHBOARDS */}
          <div className="col-lg-3 col-md-4">
            <h6 className="footer-heading">Dashboards</h6>
            <ul className="footer-list">
              <li><a href="/admin">Admin Panel</a></li>
              <li><a href="/farmer">Farmer Dashboard</a></li>
              <li><a href="/lab">Lab Technician</a></li>
              <li><a href="/delivery">Delivery Staff</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-lg-3 col-md-4">
            <h6 className="footer-heading">Contact Us</h6>
            <ul className="footer-contact">
              <li><i className="bi bi-geo-alt"></i> India</li>
              <li><i className="bi bi-telephone"></i> +91 98765 43210</li>
              <li><i className="bi bi-envelope"></i> support@dailydairy.com</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom mt-5 pt-4">
          <span className="footer-copy">
            © {new Date().getFullYear()} Daily Dairy. All rights reserved.
          </span>

          <div className="payment-icons">
            <i className="bi bi-credit-card"></i>
            <i className="bi bi-credit-card-2-front"></i>
            <i className="bi bi-wallet2"></i>
            <i className="bi bi-bank"></i>
          </div>
        </div>

      </div>
    </footer>
  );
}
