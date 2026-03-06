import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css";

export default function Address() {
  const navigate = useNavigate();
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("address")) || {
      name: "",
      phone: "",
      street: "",
      city: "",
      pincode: ""
    }
  );

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const saveAddress = () => {
    localStorage.setItem("address", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <div className="container my-5 address-page">
      <h2>Select Delivery Address</h2>

      <div className="address-card">
        <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} />
        <input name="street" placeholder="Street Address" value={address.street} onChange={handleChange} />
        <input name="city" placeholder="City" value={address.city} onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange} />

        <button className="btn btn-primary mt-3" onClick={saveAddress}>
          Deliver Here
        </button>
      </div>
    </div>
  );
}
