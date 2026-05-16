import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import '../../Style/PaginaInicio/PaginaInicio.css';
import Inicio from './PaginasNav/TurnosPage';
import UsuariosPage from './PaginasNav/Usuarios';
import TurnosPage from './PaginasNav/TurnosPage';



const PaginaPrincipal = () => {
  const { state } = useLocation();
  const usuario = state?.usuario_encontrado;

  {/* Estado del switch */}
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
      switch (activeView) {
        case "inicio":
          return <p>Pagina principal</p>;
        case "agenda":
          return <TurnosPage />;
        case "servicios":
          return <p>Servicios</p>;
        case "usuarios":
          return <UsuariosPage/>;
        case "config":
          return <p>Configuracion</p>;  
        default:
          return <p>Pagina principal</p>;
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
            <span className="pi-greeting">Buenos días, {usuario?.email ?? 'Alexander'}</span>
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