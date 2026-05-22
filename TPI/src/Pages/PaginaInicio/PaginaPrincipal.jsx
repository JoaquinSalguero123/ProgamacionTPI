import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import "../../Style/PaginaInicio/PaginaInicio.css";
import Inicio from "./PaginasNav/Inicio";
import UsuariosPage from "./PaginasNav/Usuarios";
import TurnosPage from "./PaginasNav/TurnosPage";
import SolicitarTurno from "./PaginasNav/Inicio";
import ReservarTurno from "./PaginasNav/ReservarTurno";
import Servicios from "./PaginasNav/Servicios";

const PaginaPrincipal = () => {
  const { state } = useLocation();
  const usuario = state?.usuario_encontrado;

  {
    /* Estado del switch */
  }
  const [activeView, setActiveView] = useState("dashboard");

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
        return <p>Configuracion</p>;
      case "reservar":
        return <ReservarTurno />;
      default:
        return <Inicio setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="pi-layout">
      {/* SIDEBAR */}
      <SideBar setActiveView={setActiveView} usuario={usuario} />

      {/* MAIN */}
      <main className="pi-main">
        {/* HEADER */}
        <header className="pi-header">
          <div>
            <span className="pi-greeting">
              Buenos días, {usuario?.email ?? "Alexander"}
            </span>
            <h2 className="pi-title">Rendimiento del Atelier</h2>
          </div>
        </header>

        {/* RENDERIZA LA PAGINA CORRESPONDIENTE */}
        {renderView()}
      </main>
    </div>
  );
};

export default PaginaPrincipal;
