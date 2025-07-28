import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};
