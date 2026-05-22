import React from "react";
import "../../Style/PaginaInicio/PaginaInicio.css";

const SideBar = ({ usuario, setActiveView }) => {
  return (
    <aside className="pi-sidebar">
      <div className="pi-brand">
        <h1 className="pi-brand-name">Atelier Admin</h1>
        <p className="pi-brand-role">Director General</p>
      </div>

      <nav className="pi-nav">
        <button
          className="pi-nav-item pi-nav-active"
          onClick={() => setActiveView("inicio")}
        >
          <span className="pi-nav-icon">⊞</span> Inicio
        </button>

        <button
          style={{ display: usuario.id_permisos == 0 ? "none" : "block" }}
          className="pi-nav-item"
          onClick={() => setActiveView("agenda")}
        >
          <span className="pi-nav-icon">📅</span> Agenda
        </button>

        <button
          className="pi-nav-item"
          onClick={() => setActiveView("servicios")}
        >
          <span className="pi-nav-icon">✂</span> Servicios
        </button>

        <button
          style={{ display: usuario.id_permisos != 2 ? "none" : "block" }}
          className="pi-nav-item"
          onClick={() => setActiveView("usuarios")}
        >
          <span className="pi-nav-icon">👥</span> Usuarios
        </button>

        <button className="pi-nav-item" onClick={() => setActiveView("config")}>
          <span className="pi-nav-icon">⚙</span> Configuración
        </button>
      </nav>

      <div className="pi-sidebar-footer">
        {usuario && (
          <div className="pi-user-pill">
            <span className="pi-user-dot" />
            <span className="pi-user-email">{usuario.email}</span>
          </div>
        )}
        <button
          className="pi-new-appt-btn"
          onClick={() => setActiveView("reservar")}
        >
          ＋ Nuevo Turno
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
