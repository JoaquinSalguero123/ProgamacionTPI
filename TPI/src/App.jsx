import { Routes, Route, BrowserRouter, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./components/common/ErrorPage";
import PaginaPrincipal from "./Pages/PaginaInicio/PaginaPrincipal.jsx";
import LoginPages from "./Pages/Login/LoginPages.jsx";
import Protected from "./Pages/Login/Protected.jsx";
import Inicio from "./Pages/PaginaInicio/PaginasNav/Inicio";
import UsuariosPage from "./Pages/PaginaInicio/PaginasNav/Usuarios";
import TurnosPage from "./Pages/PaginaInicio/PaginasNav/Agenda";
import ReservarTurno from "./Pages/PaginaInicio/PaginasNav/ReservarTurno";
import Servicios from "./Pages/PaginaInicio/PaginasNav/Servicios";
import Configuracion from "./Pages/PaginaInicio/PaginasNav/Configuracion";
import CatalogosPage from "./Pages/PaginaInicio/PaginasNav/Catalogos";

import { useAuth } from "./context/AuthContext.jsx";

function App() {

  const { isSignedIn, user } = useAuth();


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
          <Route path="/login" element={<LoginPages />} />

          {/* LAYOUT */}
          <Route path="/" element={<PaginaPrincipal isSignedIn={isSignedIn} user={user} />}>

            <Route index element={<Inicio />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="catalogos" element={<CatalogosPage user={user} />} />
            
            {/* REQUIERE USUARIO */}
            <Route path="config" element={
              <Protected user={user} roles_requeridos={[ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN]}>
                <Configuracion Usuario={user} />
              </Protected>} />
            <Route path="reservar" element={
              <Protected user={user} roles_requeridos={[ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN]}>
                <ReservarTurno usuario={user}/>
              </Protected>} />

            {/* REQUIERE ADMIN */}
            <Route path="agenda" element={
              <Protected user={user} roles_requeridos={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
                <TurnosPage usuario={user} />
              </Protected>} />

            {/* REQUIERE SUPERADMIN */}
            <Route path="usuarios" element={<Protected user={user} roles_requeridos={[ROLES.SUPERADMIN]}>
                <UsuariosPage />
              </Protected>} />

          </Route>

          
          <Route path="/403" element={<ErrorPage type={403} />} />
          <Route path="*" element={<ErrorPage type={404} />} />
          
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
