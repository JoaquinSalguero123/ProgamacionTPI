const CardTurno = ({ fecha, importe, servicio, estado, estilista}) => {
  return (
    <div className="pi-appt-card">

      <div className="pi-appt-info">
        <p className="pi-stat-label pi-stat-label-gold">Turno</p>

        <h4 className="pi-appt-client">{servicio}</h4>

        <div className="pi-appt-tags" style={{ margin: '10px 0' }}>
          <span className="pi-tag pi-tag-vip">${importe}</span>
          <span className="pi-tag">Fecha: {fecha}</span>
          <span className="pi-tag">Estilista: {estilista}</span>
        </div>

        <div className="pi-user-pill" style={{ marginTop: '8px' }}>
          <span className="pi-user-dot" />
          <span className="pi-user-email">{estado}</span>
        </div>
      </div>

    </div>
  );
};

export default CardTurno;