import React from 'react';
import '../../Style/PaginaInicio/PaginaInicio.css';

const SideBar = ({usuario}) => {

    return (
        <aside className="pi-sidebar">
            <div className="pi-brand">
            <h1 className="pi-brand-name">Atelier Admin</h1>
            <p className="pi-brand-role">Director General</p>
            </div>

            <nav className="pi-nav">
            <a className="pi-nav-item pi-nav-active" href="#">
                <span className="pi-nav-icon">⊞</span> Inicio
            </a>
            <a style={{display : usuario.ID_Rol == 0 ? "none" : "block"} } className="pi-nav-item" href="#">
                <span className="pi-nav-icon">📅</span> Agenda
            </a>
            <a style={{display : usuario.ID_Rol == 0 ? "none" : "block"} } className="pi-nav-item" href="#">
                <span className="pi-nav-icon">✂</span> Servicios
            </a>
            <a style={{display : usuario.ID_Rol != 2 ? "none" : "block"} } className="pi-nav-item" href="#">
                <span className="pi-nav-icon">👥</span> Usuarios
            </a>
            <a className="pi-nav-item" href="#">
                <span className="pi-nav-icon">⚙</span> Configuración
            </a>
            </nav>

            <div className="pi-sidebar-footer">
            {usuario && (
                <div className="pi-user-pill">
                <span className="pi-user-dot" />
                <span className="pi-user-email">{usuario.email}</span>
                </div>
            )}
            <button className="pi-new-appt-btn">＋ Nuevo Turno</button>
            </div>
        </aside> 
        );
} 


export default SideBar;