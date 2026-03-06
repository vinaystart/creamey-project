import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        const product = data.find(p => p.id === id);
        if (product) setForm(product);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/admin/update-product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Product updated");
    navigate("/admin/products");
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="col-md-6">
        {["name", "price", "image", "category", "stock"].map(field => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="form-control mb-3"
            required={field !== "stock"}
          />
        ))}

        <button className="btn btn-success">Update Product</button>
      </form>
    </div>
  );
}
