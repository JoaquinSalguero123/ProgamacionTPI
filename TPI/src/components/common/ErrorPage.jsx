import { useNavigate } from "react-router-dom";

const ERROR_CONFIG = {
  403: {
    code: "403",
    badge: "Sin permiso",
    title: "Acceso denegado",
    description:
      "No tenés el rol necesario para ver esta página. Contactá al administrador si creés que esto es un error.",
    color: "#E24B4A",
    badgeBg: "#FCEBEB",
    badgeColor: "#A32D2D",
  },
  404: {
    code: "404",
    badge: "No encontrado",
    title: "Página no encontrada",
    description: "La ruta que buscás no existe. Revisá la URL o volvé al inicio.",
    color: "#378ADD",
    badgeBg: "#E6F1FB",
    badgeColor: "#185FA5",
  },
};

const ErrorPage = ({ type = 404 }) => {
  const navigate = useNavigate();
  const config = ERROR_CONFIG[type] ?? ERROR_CONFIG[404];

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <span style={{ ...styles.badge, background: config.badgeBg, color: config.badgeColor }}>
          {config.badge}
        </span>

        <p style={{ ...styles.code, color: config.color }}>{config.code}</p>

        <div style={{ ...styles.divider, background: config.color }} />

        <h1 style={styles.title}>{config.title}</h1>
        <p style={styles.description}>{config.description}</p>

        <button
          style={{ ...styles.button, borderColor: config.color, color: config.color }}
          onClick={() => navigate("/")}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    maxWidth: 420,
    width: "100%",
    background: "var(--bs-body-bg, #fff)",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: "2.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 12,
  },
  badge: {
    fontSize: 12,
    padding: "3px 12px",
    borderRadius: 8,
    fontWeight: 500,
  },
  code: {
    fontSize: 80,
    fontWeight: 600,
    lineHeight: 1,
    margin: 0,
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    margin: 0,
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 1.6,
    margin: 0,
  },
  button: {
    marginTop: 8,
    padding: "8px 24px",
    borderRadius: 8,
    border: "1px solid",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "opacity 0.15s",
  },
};

export default ErrorPage;