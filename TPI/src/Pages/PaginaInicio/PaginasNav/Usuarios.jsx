import { useState } from "react";
import CardUsuario from "../../../components/common/CardUsuario";

const API = "http://localhost:3000";
const getToken = () => localStorage.getItem("Token");
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ─── ModalEditar ──────────────────────────────────────────────────────────────

const ModalEditar = ({ usuario, onClose, onGuardado }) => {
  const [form, setForm] = useState({
    nombreCompleto_usuario: usuario.nombreCompleto_usuario ?? "",
    id_permisos: usuario.id_permisos ?? 0,
    password: "",
    telefono: usuario.telefono ?? "",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    setCargando(true);
    setError(null);
    try {
      const body = { ...form, id_permisos: Number(form.id_permisos) };
      if (!body.password) delete body.password;
      const res = await fetch(`${API}/usuarios/${encodeURIComponent(usuario.email)}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al guardar");
      }
      onGuardado(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const inp = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "13px",
    border: "1px solid #d1c5b4",
    borderRadius: "8px",
    padding: "9px 12px",
    background: "#fafaf9",
    color: "#1a1c1c",
    outline: "none",
    width: "100%",
  };
  const lbl = {
    fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#7f7667",
    marginBottom: "4px", display: "block",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
        zIndex: 1000, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "28px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        fontFamily: "'Manrope', sans-serif",
      }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c5a059", fontWeight: 700, margin: 0 }}>
              Editando usuario
            </p>
            <h5 style={{ fontFamily: "'Noto Serif', serif", color: "#2f3131", margin: "4px 0 0" }}>
              {usuario.nombreCompleto_usuario}
            </h5>
            <p style={{ fontSize: "12px", color: "#7f7667", margin: 0 }}>{usuario.email}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "18px", color: "#7f7667", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          <div>
            <label style={lbl}>Nombre completo</label>
            <input style={inp} name="nombreCompleto_usuario" value={form.nombreCompleto_usuario}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"} />
          </div>
          <div>
            <label style={lbl}>Teléfono</label>
            <input style={inp} name="telefono" value={form.telefono}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"} />
          </div>
          <div>
            <label style={lbl}>Rol</label>
            <select style={{ ...inp, cursor: "pointer" }} name="id_permisos" value={form.id_permisos}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"}>
              <option value={0}>Cliente</option>
              <option value={1}>Estilista</option>
              <option value={2}>Admin</option>
            </select>
          </div>
          <div>
            <label style={lbl}>
              Nueva contraseña{" "}
              <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                (vacío = sin cambios)
              </span>
            </label>
            <input style={inp} type="password" name="password" value={form.password}
              placeholder="••••••••" onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"} />
          </div>
        </div>

        {error && (
          <p style={{ fontSize: "12px", color: "#c0392b", marginTop: "12px", marginBottom: 0 }}>
            ⚠ {error}
          </p>
        )}

        <div className="d-flex gap-2 mt-4">
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", background: "transparent",
            border: "1px solid #d1c5b4", borderRadius: "999px",
            fontFamily: "'Manrope', sans-serif", fontSize: "12px",
            fontWeight: 600, color: "#7f7667", cursor: "pointer",
          }}>
            Cancelar
          </button>
          <button onClick={handleGuardar} disabled={cargando} style={{
            flex: 2, padding: "11px", border: "none", borderRadius: "999px",
            background: cargando ? "#d1c5b4" : "linear-gradient(135deg,#775a19,#c5a059)",
            fontFamily: "'Manrope', sans-serif", fontSize: "12px",
            fontWeight: 700, color: "#fff",
            cursor: cargando ? "not-allowed" : "pointer",
            letterSpacing: "0.06em",
            boxShadow: cargando ? "none" : "0 4px 16px rgba(119,90,25,0.25)",
          }}>
            {cargando ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── UsuariosPage ─────────────────────────────────────────────────────────────

const UsuariosPage = () => {
  const [modo, setModo] = useState("ninguno");
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(null);

  const cargarTodos = async () => {
    setModo("todos");
    setCargando(true);
    setError(null);
    setUsuarios([]);
    try {
      const res = await fetch(`${API}/usuarios`, { headers: authHeaders() });
      if (!res.ok) throw new Error("No se pudieron cargar los usuarios");
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const buscarPorEmail = async () => {
    if (!busqueda.trim()) return;
    setCargando(true);
    setError(null);
    setUsuarios([]);
    try {
      const res = await fetch(
        `${API}/usuarios/${encodeURIComponent(busqueda.trim())}`,
        { headers: authHeaders() }
      );
      if (res.status === 404) { setError("No se encontró ningún usuario con ese email."); return; }
      if (!res.ok) throw new Error("Error al buscar usuario");
      const data = await res.json();
      setUsuarios(data ? [data] : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleGuardado = (actualizado) => {
    setUsuarios(prev => prev.map(u => u.email === actualizado.email ? actualizado : u));
    setEditando(null);
  };

  const modeBtn = (activo) => ({
    padding: "10px 20px",
    borderRadius: "999px",
    border: activo ? "none" : "1px solid #d1c5b4",
    background: activo ? "linear-gradient(135deg,#775a19,#c5a059)" : "transparent",
    color: activo ? "#fff" : "#7f7667",
    fontFamily: "'Manrope', sans-serif",
    fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em",
    cursor: "pointer",
    boxShadow: activo ? "0 4px 16px rgba(119,90,25,0.2)" : "none",
    transition: "all 0.2s", whiteSpace: "nowrap",
  });

  return (
    <>
      <div className="mb-1">
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c5a059", fontWeight: 700, margin: 0 }}>
          Gestión
        </p>
        <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", fontWeight: 700, color: "#2f3131", margin: "4px 0 0" }}>
          Usuarios
        </h2>
      </div>

      <div style={{ background: "#fff", border: "1px solid #d1c5b4", borderRadius: "14px", padding: "20px 24px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7f7667", fontWeight: 700, marginBottom: "14px" }}>
          ¿Cómo querés buscar?
        </p>
        <div className="d-flex flex-wrap gap-2" style={{ marginBottom: modo === "buscar" ? "16px" : 0 }}>
          <button style={modeBtn(modo === "todos")} onClick={cargarTodos}>
            👥 Ver todos
          </button>
          <button style={modeBtn(modo === "buscar")} onClick={() => { setModo("buscar"); setUsuarios([]); setError(null); }}>
            🔍 Buscar por email
          </button>
        </div>

        {modo === "buscar" && (
          <div className="d-flex gap-2 flex-wrap mt-3">
            <input
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              onKeyDown={e => e.key === "Enter" && buscarPorEmail()}
              placeholder="ejemplo@email.com"
              style={{
                flex: "1 1 220px", padding: "10px 14px",
                border: "1px solid #d1c5b4", borderRadius: "999px",
                fontFamily: "'Manrope', sans-serif", fontSize: "13px",
                color: "#1a1c1c", background: "#fafaf9", outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"}
            />
            <button
              onClick={buscarPorEmail}
              disabled={!busqueda.trim() || cargando}
              style={{
                padding: "10px 22px", borderRadius: "999px", border: "none",
                background: busqueda.trim() ? "linear-gradient(135deg,#775a19,#c5a059)" : "#d1c5b4",
                color: "#fff", fontFamily: "'Manrope', sans-serif",
                fontSize: "12px", fontWeight: 700,
                cursor: busqueda.trim() ? "pointer" : "not-allowed",
                boxShadow: busqueda.trim() ? "0 4px 14px rgba(119,90,25,0.2)" : "none",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >
              Buscar
            </button>
          </div>
        )}
      </div>

      {cargando && (
        <p style={{ color: "#7f7667", fontSize: "13px", textAlign: "center" }}>Cargando…</p>
      )}

      {!cargando && error && (
        <div style={{
          background: "#fff8f0", border: "1px solid #f0c090",
          borderRadius: "10px", padding: "14px 18px",
          fontSize: "13px", color: "#a0522d",
        }}>
          ⚠ {error}
        </div>
      )}

      {!cargando && !error && modo !== "ninguno" && usuarios.length === 0 && (
        <p style={{ color: "#7f7667", fontSize: "13px", textAlign: "center" }}>
          No hay usuarios para mostrar.
        </p>
      )}

      {/* cards — el badge "Editar" va debajo del acento, no sobre el badge de rol */}
      {usuarios.map((u) => (
        <div
          key={u.email}
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setEditando(u)}
        >
          <CardUsuario
            nombre={u.nombreCompleto_usuario}
            email={u.email}
            password={u.password}
            tipo={u.id_permisos}
            telefono={u.telefono}
          />
          {/* badge editar: pegado al borde inferior derecho de la card */}
          <span style={{
            position: "absolute", bottom: "14px", right: "12px",
            background: "linear-gradient(135deg,#775a19,#c5a059)",
            color: "#fff", fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "3px 10px", borderRadius: "999px",
            pointerEvents: "none",
            fontFamily: "'Manrope', sans-serif",
          }}>
            ✎ Editar
          </span>
        </div>
      ))}

      {editando && (
        <ModalEditar
          usuario={editando}
          onClose={() => setEditando(null)}
          onGuardado={handleGuardado}
        />
      )}
    </>
  );
};

export default UsuariosPage;
