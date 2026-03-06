import { useState } from "react";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message || "Product added");

    setForm({
      name: "",
      price: "",
      image: "",
      category: "",
      stock: ""
    });
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Admin – Add Product</h2>

      <form onSubmit={handleSubmit} className="col-md-6">
        <input
          name="name"
          placeholder="Product Name"
          className="form-control mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="form-control mb-3"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          className="form-control mb-3"
          value={form.image}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="form-control mb-3"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="form-control mb-3"
          value={form.stock}
          onChange={handleChange}
        />

        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}
