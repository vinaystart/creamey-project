import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://127.0.0.1:5000/api/products")
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);   // 🔥 ADD THIS
      setProducts(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setProducts([]);
      setLoading(false);
    });
}, []);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Our Products</h2>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">
          No products added by admin yet
        </p>
      ) : (
        <div className="row g-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
