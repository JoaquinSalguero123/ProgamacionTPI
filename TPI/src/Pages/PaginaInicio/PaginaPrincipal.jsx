import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Inicio from "./PaginasNav/Inicio";
import UsuariosPage from "./PaginasNav/Usuarios";
import TurnosPage from "./PaginasNav/Agenda";
import ReservarTurno from "./PaginasNav/ReservarTurno";
import Servicios from "./PaginasNav/Servicios";
import Configuracion from "./PaginasNav/Configuracion";
import { jwtDecode } from 'jwt-decode';
import Header from './Header';

const PaginaPrincipal = () => {

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

  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem("Token");
    navigate("/");
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
      <SideBar 
      setActiveView={setActiveView} 
      usuario_rol={rol} 
      usuario_email={email} 
      activeView={activeView} 
      handleCerrarSesion={handleCerrarSesion} />


      {/* MAIN */}
      <main className="flex-grow-1 overflow-auto d-flex flex-column">
        {/* HEADER */}
        <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        usuario_rol={rol} 
        usuario_email={email} 
        handleCerrarSesion={handleCerrarSesion}/>

        {/* CONTENIDO */}
        <div className="flex-grow-1 p-5 d-flex flex-column gap-3">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
