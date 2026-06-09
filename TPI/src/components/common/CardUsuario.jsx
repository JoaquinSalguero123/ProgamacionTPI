const rolesConfig = {
  0: { label: "Cliente",   bg: "#faeeda", color: "#854f0b" },
  1: { label: "Estilista", bg: "#e1f5ee", color: "#0f6e56" },
  2: { label: "Admin",     bg: "#eeedfe", color: "#3c3489" },
};

const initiales = (nombre = "") =>
  nombre.trim().split(" ").slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");

const CardUsuario = ({ nombre, email, password, tipo, telefono }) => {
  const rol = rolesConfig[tipo] ?? rolesConfig[0];

  return (
    <div
      className="d-flex flex-column gap-0 rounded-3 bg-white border"
      style={{ cursor: "pointer", transition: "border-color .18s, box-shadow .18s", overflow: "hidden" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#c5a059";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(119,90,25,0.09)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* acento superior */}
      <div style={{ height: "3px", background: rol.color, opacity: 0.55 }} />

      <div className="p-3 d-flex flex-column gap-3">
        {/* fila principal: avatar + info + badge rol (sin badge editar aquí) */}
        <div className="d-flex align-items-start gap-3">
          {/* avatar */}
          <div style={{
            width: "42px", height: "42px", borderRadius: "50%",
            background: rol.bg, color: rol.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, flexShrink: 0,
            fontFamily: "'Manrope', sans-serif",
          }}>
            {initiales(nombre)}
          </div>

          {/* info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.13em",
              textTransform: "uppercase", color: rol.color, margin: "0 0 2px",
              fontFamily: "'Manrope', sans-serif",
            }}>
              {rol.label}
            </p>
            <p style={{
              fontSize: "15px", fontWeight: 600, color: "#2f3131",
              margin: 0, fontFamily: "'Noto Serif', serif",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {nombre}
            </p>
            <p style={{
              fontSize: "12px", color: "#7f7667", margin: "3px 0 0",
              fontFamily: "'Manrope', sans-serif",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {email}
            </p>
          </div>

          {/* badge rol — única cosa a la derecha del header */}
          <span style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px",
            background: rol.bg, color: rol.color, flexShrink: 0,
            fontFamily: "'Manrope', sans-serif",
          }}>
            {rol.label}
          </span>
        </div>

        {/* fila inferior: pills de datos */}
        <div className="d-flex gap-2 flex-wrap pt-2" style={{ borderTop: "1px solid #f0ece4" }}>
          {telefono && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "4px 10px", borderRadius: "999px",
              background: "#f9f6f1", border: "1px solid #e8e0d4",
              fontSize: "12px", color: "#7f7667",
              fontFamily: "'Manrope', sans-serif",
            }}>
              📞 {telefono}
            </span>
          )}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "4px 10px", borderRadius: "999px",
            background: "#f9f6f1", border: "1px solid #e8e0d4",
            fontSize: "12px", color: "#7f7667",
            fontFamily: "monospace",
          }}>
            🔒 {password ? "••••••" : "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardUsuario;
