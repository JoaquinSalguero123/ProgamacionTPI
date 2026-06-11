import { useEffect, useState } from "react";
import CardTurno from "../../../components/common/CardTurno";

const TurnosPage = ({ usuario }) => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/turnos", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("Token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        let filtrados = data;

        if (usuario?.role === 0) {
          filtrados = data.filter(t => t.email_cliente === usuario.email);
        } else if (usuario?.role === 1) {
          filtrados = data.filter(t => t.email_estilista === usuario.email);
        }

        setTurnos(filtrados);
      })
      .catch(error => console.error(error));
  }, [usuario]);

  return (
    <>
      <div className="mb-4">
        <p className="mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#c5a059' }}>
          The Atelier
        </p>
        <h2 className="fw-bold m-0" style={{ fontFamily: "'Noto Serif', serif", fontSize: '40px', color: '#2f3131', letterSpacing: '-0.02em' }}>
          {usuario?.role === 2 ? "Todos los Turnos" : "Mis Turnos"}
        </h2>
      </div>

      {turnos.length === 0 ? (
        <p style={{ color: '#7f7667', fontStyle: 'italic' }}>No hay turnos para mostrar.</p>
      ) : (
        turnos.map((turno) => (
          <CardTurno
            key={turno.id}
            id={turno.id}
            fecha={turno.fecha}
            hora_turno={turno.hora_turno}
            email_cliente={turno.email_cliente}
            id_servicio={turno.id_servicio}
            email_estilista={turno.email_estilista}
            estado={turno.estado}
            usuario={usuario}
          />
        ))
      )}
    </>
  );
};

export default TurnosPage;