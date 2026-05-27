import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Inicio from "./PaginasNav/Inicio";
import UsuariosPage from "./PaginasNav/Usuarios";
import TurnosPage from "./PaginasNav/Agenda";
import ReservarTurno from "./PaginasNav/ReservarTurno";
import Servicios from "./PaginasNav/Servicios";
import Configuracion from "./PaginasNav/Configuracion";
import { jwtDecode } from 'jwt-decode';

const PaginaPrincipal = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem("Token");
      if (token) {
          try {
              const decoded = jwtDecode(token);
              console.log(decoded);
              setEmail(decoded.email); // tomamos el mail del token
              setRol(Number(decoded.role));    // tomamos el rol del token
          } catch (error) {
              console.error("Error decoding token:", error);
              localStorage.removeItem("Token"); 
          }
      }
  }, []);


  const [activeView, setActiveView] = useState("inicio");

  const renderView = () => {
    switch (activeView) {
      case "inicio":
        return <Inicio setActiveView={setActiveView} />;
      case "agenda":
        return <TurnosPage />;
      case "servicios":
        return <Servicios />;
      case "usuarios":
        return <UsuariosPage />;
      case "config":
        return <Configuracion usuario_rol={rol} />;
      case "reservar":
        return <ReservarTurno />;
      default:
        return <Inicio setActiveView={setActiveView} />;
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

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        background: "#f9f9f9",
        fontFamily: "'Manrope', sans-serif",
        color: "#1a1c1c",
      }}
    >
      {/* SIDEBAR */}
      <SideBar setActiveView={setActiveView} usuario_rol={rol} usuario_email={email}/>
      

      {/* MAIN */}
      <main className="flex-grow-1 overflow-auto d-flex flex-column">
        {/* HEADER */}
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
              Buenos días, {email ?? "Alexander"}
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
              <button
                onClick={() => setActiveView("inicio")}
                style={{
                  ...navBtnStyle,
                  color: activeView === "inicio" ? "#775a19" : "#7f7667",
                  fontWeight: activeView === "inicio" ? 700 : 400,
                  borderBottom:
                    activeView === "inicio"
                      ? "2px solid #775a19"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                Atelier
              </button>
              <button
                onClick={() => setActiveView("servicios")}
                style={{
                  ...navBtnStyle,
                  color: activeView === "servicios" ? "#775a19" : "#7f7667",
                  fontWeight: activeView === "servicios" ? 700 : 400,
                  borderBottom:
                    activeView === "servicios"
                      ? "2px solid #775a19"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                Servicios
              </button>
              <button
                onClick={() => setActiveView("agenda")}
                style={{
                  ...navBtnStyle,
                  color: activeView === "agenda" ? "#775a19" : "#7f7667",
                  fontWeight: activeView === "agenda" ? 700 : 400,
                  borderBottom:
                    activeView === "agenda"
                      ? "2px solid #775a19"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                Agenda
              </button>
              <button
                onClick={() => setActiveView("config")}
                style={{
                  ...navBtnStyle,
                  color: activeView === "config" ? "#775a19" : "#7f7667",
                  fontWeight: activeView === "config" ? 700 : 400,
                  borderBottom:
                    activeView === "config"
                      ? "2px solid #775a19"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                Configuración
              </button>
            </div>
            <button
              onClick={() => navigate("/")}
              className="border-0 fw-semibold px-4 py-2"
              style={{
                background: "linear-gradient(to right, #775a19, #c5a059)",
                color: "white",
                borderRadius: "999px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="flex-grow-1 p-5 d-flex flex-column gap-3">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
