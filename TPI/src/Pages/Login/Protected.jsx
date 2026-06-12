import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Protected = ({ children, roles_requeridos = [] }) => {
  const { user, authToken } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (roles_requeridos.length > 0 && user && !roles_requeridos.some((role) => role === user.role)) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default Protected;