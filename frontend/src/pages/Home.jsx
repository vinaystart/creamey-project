import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

/* ===============================
   HERO BANNERS
   =============================== */
const banners = [
  {
    image:
      "https://img.freepik.com/premium-photo/elegant-milk-splash-white-background-wide-cover-banner-captivating-visual-display-concept-milk-splash-photography-elegant-composition-white-background-wide-cover-banner-display_918839-119683.jpg",
    title: "Fresh & Hygienic Dairy Products",
    subtitle: "From trusted farmers to your doorstep every single day.",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/previews/032/484/265/non_2x/glass-pitcher-with-fresh-milk-on-a-wooden-table-ai-generated-free-photo.jpg",
    title: "Pure Milk, Better Health",
    subtitle: "Quality tested milk processed with care and hygiene.",
  },
  {
    image:
      "https://vespertool.com/wp-content/uploads/dairy-market-outlook-2024--1536x717.webp",
    title: "Fast & Secure Delivery",
    subtitle: "Quick delivery with secure online payments.",
  },
];

/* ===============================
   LAB TESTED CARDS
   =============================== */
const labTests = [
  {
    title: "Quality Check",
    image:
      "https://zignify.net/wp-content/uploads/2025/08/Product-Quality-Checks.png",
    desc: "Milk samples are tested for purity, freshness, and adulteration.",
  },
  {
    title: "Hygiene Testing",
    image:
      "https://mlbenvirohealthandsafety.com/wp-content/uploads/2020/08/Industrial-Hygiene-Testing.jpg",
    desc: "Strict hygiene standards are maintained during processing.",
  },
  {
    title: "Fat & Nutrient Analysis",
    image:
      "https://www.verywellfit.com/thmb/oNUUKytQ5hLLFUIbzfBrLwdr7xY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/milk_annotated2-390a948fcd9543acafc975bb3c3bbb91.jpg",
    desc: "Ensures correct fat content and nutritional balance.",
  },
];

/* ===============================
   CUSTOMER REVIEWS (HOMEPAGE)
   =============================== */
const customerReviews = [
  { name: "Ravi Kumar", rating: 5, comment: "Very fresh milk and fast delivery!" },
  { name: "Anjali Sharma", rating: 4, comment: "Good quality dairy products and hygiene." },
  { name: "Suresh Patel", rating: 5, comment: "Paneer and ghee taste amazing!" },
  { name: "Neha Verma", rating: 5, comment: "Daily delivery is always on time." },
  { name: "Amit Singh", rating: 4, comment: "Packaging is clean and secure." },
  { name: "Pooja Mehta", rating: 5, comment: "Best dairy service in my area." }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔁 Auto-change banner */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* 📦 Fetch products added by Admin */
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${banners[current].image})` }}
      >
        <div className="hero-overlay">
          <div className="container text-start">
            <h1 className="fw-bold">{banners[current].title}</h1>
            <p>{banners[current].subtitle}</p>
            <a href="#products" className="btn btn-primary btn-lg">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {/* 🌟 FEATURES */}
<section className="features-section py-5">
  <div className="container">
    <div className="row g-4 text-center">

      <div className="col-md-3">
        <div className="feature-card">
          <div className="feature-icon bg-success">
            <i className="bi bi-patch-check-fill"></i>
          </div>
          <h6 className="fw-bold mt-3">Lab Tested</h6>
          <p className="text-muted small">
            Scientifically tested for purity & safety
          </p>
        </div>
      </div>

      <div className="col-md-3">
        <div className="feature-card">
          <div className="feature-icon bg-primary">
            <i className="bi bi-cup-straw"></i>
          </div>
          <h6 className="fw-bold mt-3">Fresh Milk</h6>
          <p className="text-muted small">
            Delivered fresh every morning
          </p>
        </div>
      </div>

      <div className="col-md-3">
        <div className="feature-card">
          <div className="feature-icon bg-warning">
            <i className="bi bi-truck"></i>
          </div>
          <h6 className="fw-bold mt-3">Fast Delivery</h6>
          <p className="text-muted small">
            On-time doorstep delivery
          </p>
        </div>
      </div>

      <div className="col-md-3">
        <div className="feature-card">
          <div className="feature-icon bg-danger">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h6 className="fw-bold mt-3">Secure Payments</h6>
          <p className="text-muted small">
            Safe & encrypted transactions
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* LAB TESTED */}
      <section className="container my-5">
        <h2 className="fw-bold text-center mb-4">
          Lab Tested & Quality Assurance
        </h2>

        <div className="row g-4">
          {labTests.map((test, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={test.image}
                  className="card-img-top"
                  alt={test.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-semibold">{test.title}</h5>
                  <p className="text-muted small">{test.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="container my-5">
        <h2 className="fw-bold text-center mb-4">Our Products</h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products available</p>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CUSTOMER REVIEWS */}
      {/* ⭐ CUSTOMER REVIEWS SLIDER */}
<section className="reviews-section my-5">
  <h2 className="fw-bold text-center mb-4">
    What Our Customers Say
  </h2>

  <div className="reviews-wrapper">
    <div className="reviews-track">
      {[...customerReviews, ...customerReviews].map((review, index) => (
        <div key={index} className="review-card">
          <h6 className="fw-semibold">{review.name}</h6>
          <div className="stars">
            {"⭐".repeat(review.rating)}
          </div>
          <p className="text-muted small">
            “{review.comment}”
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  );
}
