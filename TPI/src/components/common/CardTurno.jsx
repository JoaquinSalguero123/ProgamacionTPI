import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const estados = {
  0: { texto: "Pendiente", color: "secondary" },
  1: { texto: "Aceptado", color: "success" },
  2: { texto: "Rechazado", color: "danger" },
  3: { texto: "Finalizado", color: "primary" }
};

const CardTurno = ({ id, fecha, hora_turno, nombre_cliente, nombre_servicio, precio_servicio, nombre_estilista, estado, usuario }) => {

  const [estadoActual, setEstadoActual] = useState(estado);

  const diaMes = new Date(fecha + "T00:00:00").toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit"
});

  const estadoInfo = estados[estadoActual] || { texto: "Desconocido", color: "dark" };

  const finalizarTurno = async () => {
    try {
      const res = await fetch(`http://localhost:3000/turnos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({ estado: 3 }),
      });

      if (res.ok) {
        setEstadoActual(3);
      } else {
        toast.error("Error al actualizar el turno.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const aceptarTurno = async () => {
  try {
    const res = await fetch(`http://localhost:3000/turnos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({ estado: 1 }),
    });

    if (res.ok) {
      setEstadoActual(1);
    } else {
      toast.error("Error al aceptar el turno.");
    }
  } catch (err) {
    console.error(err);
  }
};

  const rechazarTurno = async () => {
  try {
    const res = await fetch(`http://localhost:3000/turnos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({ estado: 2 }),
    });

    if (res.ok) {
      setEstadoActual(2);
    } else {
      toast.error("Error al rechazar el turno.");
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
      className="d-flex gap-3 p-3 rounded-3 border bg-white"
      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#c5a059';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(119,90,25,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <>
        <ToastContainer />
      </>
      <div className="d-flex flex-column flex-grow-1">

        <p className="mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#c5a059' }}>
          Turno
        </p>

        <h4 className="mb-2 fw-bold fs-6 m-0" style={{ color: '#2f3131' }}>
          {nombre_servicio}
        </h4>

        <div className="d-flex flex-wrap gap-2 my-2">
          <span className="badge fw-bold text-uppercase" style={{ background: '#2f3131', color: '#e9c176', letterSpacing: '0.08em' }}>
            ${precio_servicio}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Fecha: {diaMes} a las {hora_turno}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Estilista: {nombre_estilista}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Cliente: {nombre_cliente}
          </span>
        </div>

        {/* ESTADO */}
        <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light" style={{ width: 'fit-content' }}>
          <span className={`rounded-circle bg-${estadoInfo.color} d-inline-block flex-shrink-0`} style={{ width: '7px', height: '7px' }} />
          <span className="small text-secondary">{estadoInfo.texto}</span>
        </div>

        {(usuario?.role === 1 || usuario?.role === 2) && estadoActual === 0 && (
  <div className="d-flex gap-2 mt-2">
    <button
      onClick={aceptarTurno}
      className="border-0"
      style={{
        padding: "6px 16px",
        borderRadius: "999px",
        background: "linear-gradient(to right, #1a6b2f, #4caf70)",
        color: "white",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      Aceptar
    </button>
    
    <button
      onClick={rechazarTurno}
      className="border-0"
      style={{
        padding: "6px 16px",
        borderRadius: "999px",
        background: "linear-gradient(to right, #ba1a1a, #e05555)",
        color: "white",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      Rechazar
    </button>

    <button
      onClick={finalizarTurno}
      className="border-0"
      style={{
        padding: "6px 16px",
        borderRadius: "999px",
        background: "linear-gradient(to right, #775a19, #c5a059)",
        color: "white",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      Finalizado
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default CardTurno;