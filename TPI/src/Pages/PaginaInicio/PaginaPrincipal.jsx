import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import '../../Style/PaginaInicio/PaginaInicio.css';
import Inicio from './PaginasNav/Inicio';
import CardUsuario from './PaginasNav/Usuarios';


const Turnos = [
  { fecha: '10/03/2027', importe: 14000, servicio: "Peinado de cola", estado: "Pendiente", estilista: "Joaquin Salguero"},
  { fecha: '12/03/2027', importe: 20000, servicio: "Corte de pelo y perfilado de barba", estado: "Aprobado", estilista: "Federico Gomez"},
  { fecha: '15/03/2027', importe: 18000, servicio: "Coloración y tratamiento capilar", estado: "Rechazado", estilista: "Lucia Fernandez"},
  { fecha: '18/03/2027', importe: 22000, servicio: "Alisado brasileño", estado: "Aprobado", estilista: "Sofia Martinez"},
  { fecha: '20/03/2027', importe: 16000, servicio: "Corte de cabello para niños", estado: "Pendiente", estilista: "Diego Ramirez"},
  { fecha: '22/03/2027', importe: 25000, servicio: "Tratamiento de keratina", estado: "Aprobado", estilista: "Valentina Lopez"},
  { fecha: '25/03/2027', importe: 19000, servicio: "Peinado para eventos especiales", estado: "Rechazado", estilista: "Matias Gonzalez"},
];

const Usuarios = [
  { email: 'JUAN', password: '12323', tipo: 0, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'JOAQUI', password: 'ASDDG4W13', tipo: 1, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'AGUS', password: '32432423', tipo: 2, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'MARTA', password: '1234', tipo: 2, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'LUCIA', password: 'ASD1234', tipo: 1, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
  { email: 'VALEN', password: 'ASD1234', tipo: 0, cortes: { pendiente: 2, aprobado: 5, finalizado: 10 } },
]


const PaginaPrincipal = () => {
  const { state } = useLocation();
  const usuario = state?.usuario;

  return (
    <div className="pi-layout">

      {/* SIDEBAR */}
      <SideBar usuario={usuario} />

      {/* MAIN */}
      <main className="pi-main">

        {/* HEADER */}
        <header className="pi-header">
          <div>
            <span className="pi-greeting">Buenos días, {usuario?.email ?? 'Alexander'}</span>
            <h2 className="pi-title">Rendimiento del Atelier</h2>
          </div>
        </header>

        {/* INICIO */}
        {/*{Turnos.map((turno, index) => (
          <Inicio 
            key={index}   
            fecha={turno.fecha}
            importe={turno.importe}
            servicio={turno.servicio}
            estado={turno.estado}
            estilista={turno.estilista}
          />
        ))}*/}

        {/* USUARIOS */}
        {Usuarios.map((usuario, index) => (
          <CardUsuario 
            key={index}
            nombre={usuario.email}
            email={usuario.email}
            password={usuario.password}
            tipo={usuario.tipo}
            cortes={usuario.cortes}
          />
        ))}   

      </main>

    </div>
  );
};

export default PaginaPrincipal;