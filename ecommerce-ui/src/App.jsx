import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const isAdmin = user?.role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col">

      {/* ✅ Top Navigation */}
      <nav className="bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600 select-none">🛍️ MyShop</h1>

        <div className="flex gap-2 items-center">
          <NavItem to="/">Products</NavItem>

          {token && <NavItem to="/orders">My Orders</NavItem>}

          {!token ? (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white transition"
            >
              Logout
            </button>
          )}

          {isAdmin && (
            <NavItem to="/admin" className="text-purple-600 font-semibold">
              Admin
            </NavItem>
          )}
        </div>
      </nav>

      {/* ✅ ROUTES */}
      <div className="flex-1">
        <Routes>
          {/* Customer Pages */}
          <Route path="/" element={<PageWrapper><Products /></PageWrapper>} />
          <Route path="/order/:productId" element={<PageWrapper><PlaceOrder /></PageWrapper>} />
          <Route path="/orders" element={<PageWrapper><MyOrders /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

          {/* Admin (No wrapper → full width dashboard layout) */}
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

/* ✅ Small nav button */
function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1 rounded text-sm transition ${
          isActive
            ? "bg-blue-600 text-white font-medium"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

/* ✅ Page Wrapper for Regular Screens */
function PageWrapper({ children }) {
  return <div className="p-6 max-w-5xl mx-auto">{children}</div>;
}
