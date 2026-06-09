import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from 'jwt-decode';

import PaginaPrincipal from "./Pages/PaginaInicio/PaginaPrincipal.jsx";
import LoginPages from "./Pages/Login/LoginPages.jsx";
import Protected from "./Pages/Login/Protected.jsx";
import Inicio from "./Pages/PaginaInicio/PaginasNav/Inicio";
import UsuariosPage from "./Pages/PaginaInicio/PaginasNav/Usuarios";
import TurnosPage from "./Pages/PaginaInicio/PaginasNav/Agenda";
import ReservarTurno from "./Pages/PaginaInicio/PaginasNav/ReservarTurno";
import Servicios from "./Pages/PaginaInicio/PaginasNav/Servicios";
import Configuracion from "./Pages/PaginaInicio/PaginasNav/Configuracion";



function App() {

  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem("Token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser({
          email: decoded.email,
          role: Number(decoded.role),
        });

      } catch {
        localStorage.removeItem("Token");
        setUser(null);
        setIsSignedIn(false);
      }
    }
  }, [isSignedIn]);


  const ROLES = {
    USER: 0,
    ADMIN: 1,
    SUPERADMIN: 2,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* PUBLICO */}
          <Route path="/login" element={<LoginPages isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />

          {/* LAYOUT */}
          <Route path="/" element={<PaginaPrincipal isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} user={user} />}>

            <Route index element={<Inicio />} />
            <Route path="servicios" element={<Servicios />} />

            <Route path="config" element={<Configuracion Usuario={user} />} />
            <Route path="reservar" element={<ReservarTurno />} />

            <Route path="agenda" element={<TurnosPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />

          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

/*{element:
      <Private requiredRoles={["EventOrganizer"]}>
        <OrganizerDashboard/>
      </Private>,
     path: "/organizer"}*/

export default App;
