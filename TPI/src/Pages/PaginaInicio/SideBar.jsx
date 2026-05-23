import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ usuario, setActiveView }) => {
  const navigate = useNavigate();
  const handleCerrarSesion = () => navigate("/");
  const [activeItem, setActiveItem] = useState("inicio");

  const handleNav = (view) => {
    setActiveItem(view);
    setActiveView(view);
  };

  const navBtnStyle = (key) => ({
    fontFamily: "'Noto Serif', serif",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: activeItem === key ? "#f3f3f3" : "transparent",
    color: activeItem === key ? "#775a19" : "#7f7667",
    fontWeight: activeItem === key ? 700 : 400,
    borderRadius: "0 999px 999px 0",
    transition: "all 0.2s",
    cursor: "pointer",
    border: "none",
  });

  return (
    <aside
      className="d-flex flex-column py-4"
      style={{
        width: "240px",
        minWidth: "240px",
        background: "#ffffff",
        borderRight: "1px solid #d1c5b4",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* BRAND */}
      <div className="px-4 pb-4" style={{ borderBottom: "1px solid #d1c5b4" }}>
        <h1
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#775a19",
            margin: 0,
          }}
        >
          Atelier Admin
        </h1>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7f7667",
            marginTop: "3px",
            marginBottom: 0,
          }}
        >
          Director General
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-grow-1 py-3">
        <button
          className="d-flex align-items-center gap-2 w-100 text-start py-2 px-4"
          style={navBtnStyle("inicio")}
          onClick={() => handleNav("inicio")}
        >
          <span
            style={{ fontSize: "14px", width: "18px", textAlign: "center" }}
          >
            ⊞
          </span>
          Inicio
        </button>

        <button
          className="d-flex align-items-center gap-2 w-100 text-start py-2 px-4"
          style={{
            ...navBtnStyle("agenda"),
            display: usuario?.id_permisos == 0 ? "none" : "flex",
          }}
          onClick={() => handleNav("agenda")}
        >
          <span
            style={{ fontSize: "14px", width: "18px", textAlign: "center" }}
          >
            📅
          </span>
          Agenda
        </button>

        <button
          className="d-flex align-items-center gap-2 w-100 text-start py-2 px-4"
          style={{
            ...navBtnStyle("servicios"),
            display: usuario?.id_permisos == 0 ? "none" : "flex",
          }}
          onClick={() => handleNav("servicios")}
        >
          <span
            style={{ fontSize: "14px", width: "18px", textAlign: "center" }}
          >
            ✂
          </span>
          Servicios
        </button>

        <button
          className="d-flex align-items-center gap-2 w-100 text-start py-2 px-4"
          style={{
            ...navBtnStyle("usuarios"),
            display: usuario?.id_permisos != 2 ? "none" : "flex",
          }}
          onClick={() => handleNav("usuarios")}
        >
          <span
            style={{ fontSize: "14px", width: "18px", textAlign: "center" }}
          >
            👥
          </span>
          Usuarios
        </button>

        <button
          className="d-flex align-items-center gap-2 w-100 text-start py-2 px-4"
          style={navBtnStyle("config")}
          onClick={() => handleNav("config")}
        >
          <span
            style={{ fontSize: "14px", width: "18px", textAlign: "center" }}
          >
            ⚙
          </span>
          Configuración
        </button>
      </nav>

      {/* FOOTER */}
      <div className="px-3 d-flex flex-column gap-2">
        {usuario && (
          <div
            className="d-flex align-items-center gap-2 px-3 py-2"
            style={{
              background: "#f3f3f3",
              borderRadius: "999px",
              fontSize: "11px",
              color: "#7f7667",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#27ae60",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span className="text-truncate">{usuario.email}</span>
          </div>
        )}

        <button
          onClick={() => setActiveView("reservar")}
          className="w-100 border-0 fw-bold"
          style={{
            padding: "13px",
            background: "linear-gradient(135deg, #775a19, #c5a059)",
            color: "white",
            borderRadius: "999px",
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.08em",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(119,90,25,0.25)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ＋ Nuevo Turno
        </button>

        <button
          onClick={handleCerrarSesion}
          style={{
            padding: "13px 24px",
            background: "transparent",
            color: "#a0522d",
            border: "1px solid #d1c5b4",
            borderRadius: "999px",
            fontFamily: "'Manrope', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff4f4";
            e.currentTarget.style.borderColor = "#e07a7a";
            e.currentTarget.style.color = "#c0392b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#d1c5b4";
            e.currentTarget.style.color = "#a0522d";
          }}
        >
          → Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
