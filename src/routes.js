import React from "react";
import { BrowserRouter, Route, Routes, Navigate, Outlet  } from "react-router-dom";
import { isAuthenticated, isAdmin } from "./config/auth";

// Dashboard
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import LeadsDashboard from "./pages/LeadsDashboard";

// Auth
import Leads from "./pages/Leads";
import Login from "./pages/Login";

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}

const AdminRoute = () => {
  return isAdmin() ? <Outlet /> : <Navigate to="/dashboard" />;
}

const RootElement = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Leads />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route exact path="/dashboard" element={<PrivateRoute />}><Route exact path="/dashboard" element={<Dashboard />} /></Route>
      <Route exact path="/usuarios" element={<AdminRoute />}><Route exact path="/usuarios" element={<Usuarios />} /></Route>
      <Route exact path="/leads" element={<PrivateRoute />}><Route exact path="/leads" element={<LeadsDashboard />} /></Route>
    </Routes>
  </BrowserRouter>
);

export default RootElement;
