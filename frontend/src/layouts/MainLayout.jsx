import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ user, setUser }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-fill">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
