import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import UsuariosPage from './PaginasNav/Usuarios';
import TurnosPage from './PaginasNav/TurnosPage';

const PaginaPrincipal = () => {
  const { state } = useLocation();
  const usuario = state?.usuario_encontrado;

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
        return <UsuariosPage />;
      case "config":
        return <p>Configuracion</p>;
      default:
        return <p>Pagina principal</p>;
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: '#f9f9f9', fontFamily: "'Manrope', sans-serif", color: '#1a1c1c' }}>

      {/* SIDEBAR */}
      <SideBar setActiveView={setActiveView} usuario={usuario} />

      {/* MAIN */}
      <main className="flex-grow-1 p-5 overflow-auto d-flex flex-column gap-3">

        {/* HEADER */}
        <header className="d-flex justify-content-between align-items-end">
          <div>
            <span
              className="d-block mb-1 fst-italic"
              style={{ fontFamily: "'Noto Serif', serif", fontSize: '16px', color: '#c5a059' }}
            >
              Buenos días, {usuario?.email ?? 'Alexander'}
            </span>
            <h2
              className="m-0 fw-bold"
              style={{ fontFamily: "'Noto Serif', serif", fontSize: '40px', color: '#2f3131', letterSpacing: '-0.02em' }}
            >
              Rendimiento del Atelier
            </h2>
          </div>
        </header>

        {/* RENDERIZA LA PÁGINA CORRESPONDIENTE */}
        {renderView()}

      </main>
    </div>
  );
};

export default PaginaPrincipal;