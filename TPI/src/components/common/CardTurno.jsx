import { useEffect, useState } from "react";

const estados = {
  0: { texto: "Pendiente", color: "secondary" },
  1: { texto: "Aceptado", color: "success" },
  2: { texto: "Rechazado", color: "danger" },
  3: { texto: "Finalizado", color: "primary" }
};


const CardTurno = ({ fecha, hora_turno, email_cliente, id_servicio, email_estilista, estado }) => {

  const [servicio, setServicio] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/servicios/${id_servicio}`)
      .then(res => res.json())
      .then(data => setServicio(data))
      .catch(error => console.error(error));
  }, []);

  const [estilista, setEstilista] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/usuarios/${email_estilista}`)
      .then(res => res.json())
      .then(data => setEstilista(data))
      .catch(error => console.error(error));
  }, []);

  // formatear la fecha en Dia/Mes
  const diaMes = new Date(fecha).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit"
  });

  // solo estados validos
  const estadoInfo = estados[estado] || {
    texto: "Desconocido",
    color: "dark"
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
      <div className="d-flex flex-column flex-grow-1">

        <p className="mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#c5a059' }}>
          Turno
        </p>

        <h4 className="mb-2 fw-bold fs-6 m-0" style={{ color: '#2f3131' }}>
          {servicio.nombre_servicio}
        </h4>

        <div className="d-flex flex-wrap gap-2 my-2">
          <span className="badge fw-bold text-uppercase" style={{ background: '#2f3131', color: '#e9c176', letterSpacing: '0.08em' }}>
            ${servicio.precio}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Fecha: {diaMes} a las {hora_turno}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Estilista: {estilista.nombreCompleto_usuario}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light" style={{ width: 'fit-content' }}>
          <span className={`rounded-circle bg-${estadoInfo.color} d-inline-block flex-shrink-0`} style={{ width: '7px', height: '7px' }} />
          <span className="small text-secondary">{estadoInfo.texto}</span>
        </div>

      </div>
    </div>
  );
};

export default CardTurno;