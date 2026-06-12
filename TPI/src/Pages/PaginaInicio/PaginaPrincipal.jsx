import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from './Header';



const PaginaPrincipal = ({isSignedIn, user}) => {

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
      user={user}
      isSignedIn={isSignedIn}/>


      {/* MAIN */}
      <main className="flex-grow-1 overflow-auto d-flex flex-column">
        {/* HEADER */}
        <Header 
        user={user}
        isSignedIn={isSignedIn}/>

        {/* CONTENIDO */}
        <div className="flex-grow-1 p-5 d-flex flex-column gap-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
