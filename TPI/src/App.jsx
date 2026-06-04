import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import LoginPages from "./Pages/Login/LoginPages.jsx";
import PaginaPrincipal from "./Pages/PaginaInicio/PaginaPrincipal.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Protected from "./Pages/Login/Protected.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
//import './App.css'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  

  const ROLES = {
    USER: 0,
    ADMIN: 1,
    SUPERADMIN: 2,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPages
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Protected isSignedIn={isSignedIn} rol_permitido={ROLES.USER}>
                <PaginaPrincipal/>
              </Protected>
            }
          />
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
