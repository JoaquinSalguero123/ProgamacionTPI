import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


const MobileMenu = ({ user, isSignedIn }) => {
    
  const navigate = useNavigate();
  const { logout } = useAuth();

  const role = user?.role ?? null;

  const handleAuthClick = () => {
    if (isSignedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  
  return (
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
        data-bs-backdrop="true"
      >
        <div className="offcanvas-header">
          <h5
            id="mobileMenuLabel"
            style={{
              fontFamily: "'Noto Serif', serif",
              color: "#775a19",
            }}
          >
            The Atelier
          </h5>
  
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          />
        </div>
  
        <div className="offcanvas-body d-flex flex-column">
          <button
            className="btn text-start mb-2"
            onClick={() => navigate("/")}
            data-bs-dismiss="offcanvas"
          >
            Atelier
          </button>
  
          <button
            className="btn text-start mb-2"
            onClick={() => navigate("/servicios")}
            data-bs-dismiss="offcanvas"
          >
            Servicios
          </button>
  
          {role >= 1 && (
            <button
              className="btn text-start mb-2"
              onClick={() => navigate("/agenda")}
              data-bs-dismiss="offcanvas"
            >
              Agenda
            </button>
          )}

          {role === 2 && (
            <button
                className="btn text-start mb-2"
                onClick={() => navigate("/usuarios")}
                data-bs-dismiss="offcanvas"  >
              Usuarios
              </button>
              )}
  
          {role !== null && (
            <button
              className="btn text-start mb-2"
              onClick={() => navigate("/config")}
              data-bs-dismiss="offcanvas"
            >
              Configuración
            </button>
          )}
  
          <hr />
  
          <button
            onClick={handleAuthClick}
            className="btn btn-warning mt-auto"
            style={{
              background:
                "linear-gradient(to right, #775a19, #c5a059)",
              color: "white",
              borderRadius: "999px",
              fontSize: "14px",
            }}
          >
            {isSignedIn
              ? "Cerrar sesión"
              : "Iniciar sesión"}
          </button>
        </div>
      </div>
    );
  };
  
  export default MobileMenu;