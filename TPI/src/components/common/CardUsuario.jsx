const CardUsuario = ({ nombre, email, password, tipo, cortes }) => {

  const estadoConfig = {
    pendiente:  { label: 'Pendientes',  color: '#b8973a' },
    aprobado:   { label: 'Aprobados',   color: '#27ae60' },
    finalizado: { label: 'Finalizados', color: '#7f7667' },
  };

  return (
    <div
      className="d-flex flex-column gap-3 p-3 rounded-3 border bg-white"
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

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="mb-1 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#c5a059' }}>
            Usuario
          </p>
          <h4 className="mb-1 fw-bold fs-6" style={{ color: '#2f3131' }}>
            {nombre}
          </h4>

          {/* EMAIL + PASSWORD en la misma fila */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <p className="mb-0 small text-secondary">
              {email}
            </p>
            <div className="d-flex align-items-center gap-1 px-2 py-1 rounded-pill bg-light" style={{ width: 'fit-content' }}>
              <span className="text-uppercase fw-bold flex-shrink-0" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#7f7667' }}>
                Pass
              </span>
              <span className="small" style={{ fontFamily: 'monospace', letterSpacing: '0.05em', color: '#7f7667' }}>
                {password}
              </span>
            </div>
          </div>

        </div>
        <span className="badge fw-bold text-uppercase" style={{ background: '#2f3131', color: '#e9c176', letterSpacing: '0.08em' }}>
          {tipo}
        </span>
      </div>

      {/* CORTES POR ESTADO */}
      <div className="d-flex gap-2 pt-2" style={{ borderTop: '1px solid #d1c5b4' }}>
        {Object.entries(estadoConfig).map(([key, config]) => (
          <div
            key={key}
            className="flex-grow-1 rounded-2 p-2 text-center bg-light"
            style={{ borderTop: `3px solid ${config.color}` }}
          >
            <span className="d-block fw-bold" style={{ fontSize: '20px', color: '#2f3131' }}>
              {cortes?.[key] ?? 0}
            </span>
            <span className="text-uppercase fw-bold" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#7f7667' }}>
              {config.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CardUsuario;