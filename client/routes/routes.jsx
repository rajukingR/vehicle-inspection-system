import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Requests from "../pages/Requests";
import NotFound from "../pages/NotFound";
import Login from "../pages/user-auth/Login";
import Signup from "../pages/user-auth/Signup";
import ForgotPassword from "../pages/user-auth/ForgotPassword";
import ResetPassword from "../pages/user-auth/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Vehicles from "../pages/Vehicles";

export default function RoutesConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<div>Profile Page</div>} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/users" element={<Members />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/report" element={<div>Report Page</div>} />
            <Route path="/edit-requests" element={<div>Edit-requests Page</div>} />
            <Route path="/delete-requests" element={<div>Delete-requests Page</div>} />
            <Route path="/masters/sales" element={<div>Sales Page</div>} />
            <Route path="/masters/stock" element={<div>Stock Page</div>} />
            <Route path="/masters/club" element={<div>Club Page</div>} />
            <Route path="/masters/roles" element={<div>Roles Page</div>} />
            
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
