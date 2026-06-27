import { useEffect, useState } from "react";
import CardTurno from "../../../components/common/CardTurno";

const TurnosPage = ({ usuario }) => {
  const [turnos, setTurnos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [actualizar, setActualizar] = useState(false);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const turnosFiltrados = turnos
    .filter(turno => {
      if (filtroEstado === "todos") return true;
      return turno.estado === Number(filtroEstado);
    });


  const handleActualizar = () => {
    setActualizar(prev => !prev)
  }

  useEffect(() => {
    fetch("http://localhost:3000/turnos", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("Token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTurnos(data);
      })
      .catch(error => console.error(error));
  }, [actualizar, filtroEstado]); // se llama al actualizar cualquier turno y al cambiar el filtro


  const formatearDiaMes = (fecha) => {
    if (!fecha) return "A disposición";

    const f = new Date(fecha + "T00:00:00");

    if (isNaN(f.getTime())) return "Fecha inválida";

    return f.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit"
    });
  };

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
            fecha={formatearDiaMes(turno.fecha)}
            hora_turno={turno?.hora_turno || "A disposición"}
            nombre_cliente={turno.cliente?.nombreCompleto_usuario || "Sin cliente"} // no debería
            nombre_servicio={turno.servicio?.nombre_servicio || "A disposición"}
            precio_servicio={turno.servicio?.precio || "A disposición"}
            nombre_estilista={turno.estilista?.nombreCompleto_usuario || "Sin estilista"} // no debería
            estado={turno?.estado || 0}
            usuario={usuario}
            actualizarTurnos={handleActualizar}
          />
        ))
      )}
    </>
  );
};

export default TurnosPage;