const CardTurno = ({ fecha, importe, servicio, estado, estilista }) => {

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
          {servicio}
        </h4>

        <div className="d-flex flex-wrap gap-2 my-2">
          <span className="badge fw-bold text-uppercase" style={{ background: '#2f3131', color: '#e9c176', letterSpacing: '0.08em' }}>
            ${importe}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Fecha: {fecha}
          </span>
          <span className="badge bg-light text-secondary fw-bold text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Estilista: {estilista}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light" style={{ width: 'fit-content' }}>
          <span className="rounded-circle bg-success d-inline-block flex-shrink-0" style={{ width: '7px', height: '7px' }} />
          <span className="small text-secondary">{estado}</span>
        </div>

      </div>
    </div>
  );
};

export default CardTurno;