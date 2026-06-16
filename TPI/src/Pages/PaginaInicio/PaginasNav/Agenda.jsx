import { useEffect, useState } from "react";
import CardTurno from "../../../components/common/CardTurno";

const TurnosPage = ({ usuario }) => {
  const [turnos, setTurnos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const turnosFiltrados = turnos
    .filter(turno => new Date(turno.fecha + "T00:00:00") >= hoy)
    .filter(turno => {
      if (filtroEstado === "todos") return true;
      return turno.estado === Number(filtroEstado);
    });

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
  
  const botones = [
    { label: "Todos", value: "todos" },
    { label: "Pendientes", value: "0" },
    { label: "Aceptados", value: "1" },
    { label: "Rechazados", value: "2" },
    { label: "Finalizados", value: "3" },
  ];
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

      {/* Filtros */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {botones.map(btn => (
          <button
            key={btn.value}
            onClick={() => setFiltroEstado(btn.value)}
            className="border-0"
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              background: filtroEstado === btn.value
                ? "linear-gradient(to right, #775a19, #c5a059)"
                : "#f0ece4",
              color: filtroEstado === btn.value ? "white" : "#7f7667",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {turnosFiltrados.length === 0 ? (
        <p style={{ color: '#7f7667', fontStyle: 'italic' }}>No hay turnos para mostrar.</p>
      ) : (
        turnosFiltrados.map((turno) => (
          <CardTurno
            key={turno.id}
            id={turno.id}
            fecha={turno.fecha}
            hora_turno={turno.hora_turno}
            nombre_cliente={turno.cliente.nombreCompleto_usuario}
            nombre_servicio={turno.servicio.nombre_servicio}
            precio_servicio={turno.servicio.precio}
            nombre_estilista={turno.estilista.nombreCompleto_usuario}
            estado={turno.estado}
            usuario={usuario}
          />
        ))
      )}
    </>
  );
};

export default TurnosPage;