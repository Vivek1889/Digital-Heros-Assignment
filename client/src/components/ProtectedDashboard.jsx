import { Navigate } from "react-router-dom";

const ProtectedDashboard = ({ children, user }) => {
  if (user === undefined) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedDashboard;
