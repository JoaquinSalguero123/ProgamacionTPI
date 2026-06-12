import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Protected = ({children, roles_requeridos = []}) => {
    const {user, authToken} = useContext(AuthContext);

    if(!authToken){
        alert("Necesitas iniciar sesión")
        return <Navigate to="/login" />;
    }
                               
    if(roles_requeridos && user && !roles_requeridos.some((role) => role === user.role)){
        alert("No tienes permiso")
        return <Navigate to="/" />;
    }

    return children;
}
export default Protected;

