const CardServicio = ({ nombre, descripcion, precio, foto }) => {
  return (
    <div
      className="d-flex flex-column rounded-3 overflow-hidden bg-white"
      style={{
        border: '1px solid rgba(209,197,180,0.3)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#c5a059';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(119,90,25,0.1)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(209,197,180,0.3)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* FOTO */}
      <div style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
        <img
          src={foto ?? '/placeholder.jpg'}
          alt={nombre}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* INFO */}
      <div className="p-4 d-flex flex-column gap-2">
        <p className="mb-0 text-uppercase fw-bold" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#c5a059' }}>
          Servicio
        </p>
        <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Noto Serif', serif", fontSize: '18px', color: '#2f3131' }}>
          {nombre}
        </h4>
        <p className="mb-0 small" style={{ color: '#7f7667', lineHeight: 1.6 }}>
          {descripcion}
        </p>
        <div className="mt-2">
          <span className="badge fw-bold" style={{ background: '#2f3131', color: '#e9c176', fontSize: '12px', padding: '6px 12px' }}>
            ${precio}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardServicio;
