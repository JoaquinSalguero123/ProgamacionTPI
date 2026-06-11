import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";


const Header = ({ user, isSignedIn }) => {
    const location = useLocation();
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

    const navBtnStyle = {
        fontFamily: "'Noto Serif', serif",
        fontSize: "16px",
        color: "#7f7667",
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "0",
    };

    const getNavStyle = (path) => {
        const isActive = location.pathname === path;

        return {
            ...navBtnStyle,
            color: isActive ? "#775a19" : "#7f7667",
            fontWeight: isActive ? 700 : 400,
            borderBottom: isActive
                ? "2px solid #775a19"
                : "2px solid transparent",
            paddingBottom: "2px",
        };
    };



    return (
        <header
            className="sticky-top px-5 py-3"
            style={{
                background: "rgba(249,249,249,0.85)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(209,197,180,0.2)",
                zIndex: 50,
            }}
        >
            {/* FILA 1 — Saludo */}
            <div className="mb-2">
                <span
                    className="fst-italic"
                    style={{
                        fontFamily: "'Noto Serif', serif",
                        fontSize: "16px",
                        color: "#c5a059",
                    }}
                >
                    {"Buenos días, ", user?.email ?? "Bienvenido"}
                </span>
            </div>

            {/* FILA 2 — Nav */}
            <div className="d-flex justify-content-between align-items-center">
                <div
                    style={{
                        fontFamily: "'Noto Serif', serif",
                        fontStyle: "italic",
                        fontSize: "22px",
                        color: "#2f3131",
                    }}
                >
                    The Atelier
                </div>
                <div className="d-none d-md-flex align-items-center gap-4">

                    {/* BOTON DE INICIO */}
                    <button
                        onClick={() => navigate("/")}
                        style={getNavStyle("/")}
                    >
                        Atelier
                    </button>

                    {/* BOTON DE SERVICIOS */}
                    <button
                        onClick={() => navigate("/servicios")}
                        style={getNavStyle("/servicios")}
                    >
                        Servicios
                    </button>

                    {/* BOTON DE AGENDA */}
                    {role >= 1 && (
                        <button
                            onClick={() => navigate("/agenda")}
                            style={getNavStyle("/agenda")}
                        >
                            Agenda
                        </button>
                    )}

                    {/* BOTON DE CONFIGURACION */}
                    {role !== null && (
                    <button
                        onClick={() => navigate("/config")}
                        style={getNavStyle("/config")}
                    >
                        Configuración
                    </button>
                    )}


                </div>
                <button
                    onClick={handleAuthClick}
                    className="border-0 fw-semibold px-4 py-2"
                    style={{
                        background: "linear-gradient(to right, #775a19, #c5a059)",
                        color: "white",
                        borderRadius: "999px",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    {isSignedIn ? "Cerrar sesión" : "Iniciar sesión"}
                </button>
            </div>
        </header>
    );

};

export default Header;
