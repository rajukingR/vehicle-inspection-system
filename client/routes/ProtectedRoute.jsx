import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // or redux auth state

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
