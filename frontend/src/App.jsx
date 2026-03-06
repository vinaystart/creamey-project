import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { motion } from "framer-motion";


/* ================= PAGES ================= */
import Home from "./pages/Home";
import Products from "./components/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Chat from "./pages/Chat";
import ChatWidget from "./components/ChatWidget";

/* ================= DASHBOARDS ================= */
import AdminDashboard from "./pages/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import LabDashboard from "./pages/LabDashboard";

/* ================= ADMIN ================= */
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

/* ================= LAB ================= */
import LabMilkApproval from "./pages/LabMilkApproval";

/* ================= FARMER ================= */
import FarmerAddMilk from "./pages/FarmerAddMilk";
import FarmerCollections from "./pages/FarmerCollections";
import FarmerEarnings from "./pages/FarmerEarnings";

/* ================= CUSTOMER ================= */
import MyOrders from "./pages/MyOrders";

/* ================= SECURITY ================= */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route element={<MainLayout user={user} setUser={setUser} />}>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/chat" element={<Chat />} />

          {/* CART */}
          <Route path="/cart" element={<Cart user={user} />} />

          <Route
            path="/payment"
            element={
              <ProtectedRoute user={user} role="customer">
                <Payment user={user} />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminAddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminEditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          {/* FARMER */}
          <Route
            path="/farmer"
            element={
              <ProtectedRoute user={user} role="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/add-milk"
            element={
              <ProtectedRoute user={user} role="farmer">
                <FarmerAddMilk user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/collections"
            element={
              <ProtectedRoute user={user} role="farmer">
                <FarmerCollections user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/farmer/earnings"
            element={
              <ProtectedRoute user={user} role="farmer">
                <FarmerEarnings user={user} />
              </ProtectedRoute>
            }
          />

          {/* CUSTOMER */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute user={user} role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer/orders"
            element={
              <ProtectedRoute user={user} role="customer">
                <MyOrders user={user} />
              </ProtectedRoute>
            }
          />

          {/* DELIVERY */}
          <Route
            path="/delivery"
            element={
              <ProtectedRoute user={user} role="delivery">
                <DeliveryDashboard user={user} />
              </ProtectedRoute>
            }
          />

          {/* LAB */}
          <Route
            path="/lab"
            element={
              <ProtectedRoute user={user} role="lab">
                <LabDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lab/milk-approval"
            element={
              <ProtectedRoute user={user} role="lab">
                <LabMilkApproval />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>

      {/* 🔥 GLOBAL FLOATING AI WIDGET */}
      <ChatWidget />

    </>
  );
}

export default App;
