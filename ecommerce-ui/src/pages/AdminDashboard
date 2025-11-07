import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import ManageCategories from "./ManageCategories";
import { useEffect } from "react";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Redirect non-admins
  useEffect(() => {
    if (!token) return navigate("/login");
    const role = JSON.parse(atob(token.split(".")[1])).role;
    if (role !== "admin") navigate("/");
  }, [token, navigate]);

  const menuItems = [
    { name: "Manage Products", path: "/admin/products", icon: "📦" },
    { name: "Manage Orders", path: "/admin/orders", icon: "🧾" },
    { name: "Manage Categories", path: "/admin/categories", icon: "📂" },
  ];

  return (
    <div className="flex h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded text-sm flex items-center gap-2 transition ${
                location.pathname === item.path
                  ? "bg-slate-700 font-semibold"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>

        <button
          className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="*" element={<p className="text-gray-600">Select a menu option...</p>} />
        </Routes>
      </main>
    </div>
  );
}
