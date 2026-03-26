import { Navigate } from "react-router-dom";

const ProtectedDashboard = ({ children, user }) => {
  if (user === undefined) {
    return null; // still loading
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedDashboard;
