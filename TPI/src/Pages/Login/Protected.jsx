import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Protected = ({children, roles_requeridos = []}) => {
    const {user, authToken} = useContext(AuthContext);

    if(!authToken){
        return <Navigate to="/login" state={{ mensaje: "Necesitas iniciar sesión."}}/>;
    }
                               
    if(roles_requeridos && user && !roles_requeridos.some((role) => role === user.role)){
        return <Navigate to="/" state={{ mensaje: "No tienes permiso."}}/>;
    }

    return children;
}
export default Protected;

