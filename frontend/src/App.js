import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PremiumPage from "./pages/PremiumPage";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import PremiumRoute from "./components/PremiumRoute";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* 🏠 PUBLIC HOME */}
        <Route path="/" element={<Home />} />

<Route path="/cars" element={<Cars />} />


        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 DASHBOARD (PROTECTED) */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        {/* 💳 PAYMENT */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* 💎 PREMIUM */}
        <Route
          path="/premium"
          element={
            <PremiumRoute>
      <PremiumPage />
    </PremiumRoute>
          }
        />

        {/* 👑 ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;