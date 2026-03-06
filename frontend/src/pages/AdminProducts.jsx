import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`http://localhost:5000/api/admin/delete-product/${id}`, {
      method: "DELETE",
    });

    fetchProducts(); // refresh list
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Admin – Manage Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  {/* ✏️ EDIT */}
                  <Link
                    to={`/admin/edit-product/${p.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  {/* 🗑 DELETE */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
