const CardUsuario = ({ nombre, email, password, tipo, cortes }) => {
    const estadoConfig = {
      pendiente:  { label: 'Pendientes',  color: '#b8973a' },
      aprobado:   { label: 'Aprobados',   color: '#27ae60' },
      finalizado: { label: 'Finalizados', color: '#7f7667' },
    };
  
    return (
      <div className="pi-appt-card" style={{ flexDirection: 'column', gap: '14px' }}>
  
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="pi-stat-label-gold">Usuario</p>
            <h4 className="pi-appt-client">{nombre}</h4>
            <p className="pi-appt-service">{email}</p>
          </div>
          <span className="pi-tag pi-tag-vip">{tipo}</span>
        </div>
  
        {/* CONTRASEÑA */}
        <div className="pi-user-pill">
          <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', flexShrink: 0 }}>
            Pass
          </span>
          <span className="pi-user-email" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }} >
            {password}
          </span>
        </div>
  
        {/* CORTES POR ESTADO */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', gap: '8px' }}>
          {Object.entries(estadoConfig).map(([key, config]) => (
            <div
              key={key}
              style={{
                flex: 1,
                background: 'var(--surface-low)',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                borderTop: `3px solid ${config.color}`,
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--dark)', display: 'block' }}>
                {cortes?.[key] ?? 0}
              </span>
              <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {config.label}
              </span>
            </div>
          ))}
        </div>
  
      </div>
    );
  };
  
  export default CardUsuario;