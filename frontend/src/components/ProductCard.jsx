export default function ProductCard({ product }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="col-md-3">
      <div className="card h-100 shadow-sm">
        <img
  src={product.image ? product.image : "https://via.placeholder.com/300x200?text=Daily+Dairy"}
  className="card-img-top"
  alt={product.name}
  style={{ height: "180px", objectFit: "cover" }}
/>

        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="fw-semibold mb-2">₹{product.price}</p>

          <button
            className="btn btn-primary w-100"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
