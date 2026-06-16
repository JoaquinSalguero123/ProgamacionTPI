import { useState, useEffect } from "react";

const API = "http://localhost:3000";
const getToken = () => localStorage.getItem("Token");
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ─── Modal agregar / editar ───────────────────────────────────────────────────

const ModalCatalogo = ({ catalogo, onClose, onGuardado }) => {
  const esEdicion = !!catalogo;
  const [form, setForm] = useState({
    nombre_catalogo: catalogo?.nombre_catalogo ?? "",
    url_img: catalogo?.url_img ?? "",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(catalogo?.url_img ?? "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "url_img") setPreview(value);
  };

  const handleGuardar = async () => {
    if (!form.nombre_catalogo.trim()) { setError("El nombre es obligatorio."); return; }
    if (!form.url_img.trim())         { setError("La URL de imagen es obligatoria."); return; }

    setCargando(true);
    setError(null);
    try {
      const url = esEdicion
        ? `${API}/catalogos/${catalogo.id}`
        : `${API}/catalogos`;
      const res = await fetch(url, {
        method: esEdicion ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al guardar");
      }
      onGuardado(await res.json(), esEdicion);
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
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
        zIndex: 1000, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "28px",
        width: "100%", maxWidth: "440px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        fontFamily: "'Manrope', sans-serif",
      }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c5a059", fontWeight: 700, margin: 0 }}>
              {esEdicion ? "Editando" : "Nuevo"}
            </p>
            <h5 style={{ fontFamily: "'Noto Serif', serif", color: "#2f3131", margin: "4px 0 0" }}>
              {esEdicion ? catalogo.nombre_catalogo : "Agregar al catálogo"}
            </h5>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "18px", color: "#7f7667", cursor: "pointer" }}>✕</button>
        </div>

        <div className="d-flex flex-column gap-3">
          <div>
            <label style={lbl}>Nombre</label>
            <input style={inp} name="nombre_catalogo" value={form.nombre_catalogo}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"}
              placeholder="Ej: Corte degradé 2024" />
          </div>
          <div>
            <label style={lbl}>URL de imagen</label>
            <input style={inp} name="url_img" value={form.url_img}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"}
              placeholder="https://..." />
          </div>

          {/* preview */}
          {preview && (
            <div style={{
              borderRadius: "10px", overflow: "hidden",
              border: "1px solid #e8e0d4", height: "160px",
              background: "#f9f6f1",
            }}>
              <img
                src={preview}
                alt="preview"
                onError={e => e.currentTarget.style.display = "none"}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          )}
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
            {cargando ? "Guardando…" : esEdicion ? "Guardar cambios" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Modal confirmación borrado ───────────────────────────────────────────────

const ModalConfirmar = ({ catalogo, onClose, onConfirmar }) => (
  <div
    style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      zIndex: 1000, display: "flex", alignItems: "center",
      justifyContent: "center", padding: "16px",
    }}
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "28px",
      width: "100%", maxWidth: "380px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      fontFamily: "'Manrope', sans-serif", textAlign: "center",
    }}>
      <p style={{ fontSize: "32px", margin: "0 0 12px" }}>🗑</p>
      <h5 style={{ fontFamily: "'Noto Serif', serif", color: "#2f3131", margin: "0 0 8px" }}>
        Eliminar imagen
      </h5>
      <p style={{ fontSize: "13px", color: "#7f7667", margin: "0 0 24px" }}>
        ¿Eliminar <strong style={{ color: "#2f3131" }}>{catalogo.nombre_catalogo}</strong> del catálogo? Esta acción no se puede deshacer.
      </p>
      <div className="d-flex gap-2">
        <button onClick={onClose} style={{
          flex: 1, padding: "11px", background: "transparent",
          border: "1px solid #d1c5b4", borderRadius: "999px",
          fontFamily: "'Manrope', sans-serif", fontSize: "12px",
          fontWeight: 600, color: "#7f7667", cursor: "pointer",
        }}>Cancelar</button>
        <button onClick={onConfirmar} style={{
          flex: 1, padding: "11px", border: "none", borderRadius: "999px",
          background: "#c0392b", fontFamily: "'Manrope', sans-serif",
          fontSize: "12px", fontWeight: 700, color: "#fff",
          cursor: "pointer",
        }}>Eliminar</button>
      </div>
    </div>
  </div>
);

// ─── Tarjeta de catálogo ──────────────────────────────────────────────────────

const CardCatalogo = ({ catalogo, puedeEditar, onEditar, onEliminar }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      borderRadius: "14px", overflow: "hidden",
      border: "1px solid #e8e0d4", background: "#fff",
      transition: "box-shadow .2s, transform .2s",
      position: "relative",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(119,90,25,0.13)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.transform = "";
      }}
    >
      {/* imagen */}
      <div style={{ height: "200px", background: "#f3ede3", overflow: "hidden" }}>
        {!imgError ? (
          <img
            src={catalogo.url_img}
            alt={catalogo.nombre_catalogo}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{
            height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", color: "#c5a059",
          }}>
            <span style={{ fontSize: "32px" }}>🖼</span>
            <span style={{ fontSize: "11px", marginTop: "6px", color: "#7f7667" }}>Imagen no disponible</span>
          </div>
        )}
      </div>

      {/* pie */}
      <div className="d-flex align-items-center justify-content-between px-3 py-2"
        style={{ borderTop: "1px solid #f0ece4" }}>
        <p style={{
          fontFamily: "'Noto Serif', serif", fontSize: "13px",
          fontWeight: 600, color: "#2f3131", margin: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          maxWidth: puedeEditar ? "60%" : "100%",
        }}>
          {catalogo.nombre_catalogo}
        </p>

        {puedeEditar && (
          <div className="d-flex gap-1">
            <button
              onClick={() => onEditar(catalogo)}
              title="Editar"
              style={{
                background: "none", border: "1px solid #d1c5b4",
                borderRadius: "8px", padding: "5px 10px",
                fontSize: "12px", cursor: "pointer", color: "#775a19",
                fontFamily: "'Manrope', sans-serif",
                transition: "all .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#faeeda"; e.currentTarget.style.borderColor = "#c5a059"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "#d1c5b4"; }}
            >
              ✎ Editar
            </button>
            <button
              onClick={() => onEliminar(catalogo)}
              title="Eliminar"
              style={{
                background: "none", border: "1px solid #f0c0c0",
                borderRadius: "8px", padding: "5px 10px",
                fontSize: "12px", cursor: "pointer", color: "#c0392b",
                fontFamily: "'Manrope', sans-serif",
                transition: "all .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fdf2f2"; e.currentTarget.style.borderColor = "#e07a7a"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "#f0c0c0"; }}
            >
              🗑
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Página principal ─────────────────────────────────────────────────────────

const CatalogosPage = ({ user }) => {
  // role 1 = estilista, role 2 = admin
  const puedeEditar = user?.role >= 1;

  const [catalogos, setCatalogos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalForm, setModalForm] = useState(null);       // null | catalogo | "nuevo"
  const [modalBorrar, setModalBorrar] = useState(null);   // null | catalogo

  useEffect(() => {
    fetch(`${API}/catalogos`, { headers: authHeaders() })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setCatalogos(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudo cargar el catálogo."))
      .finally(() => setCargando(false));
  }, []);

  const handleGuardado = (guardado, esEdicion) => {
    setCatalogos(prev =>
      esEdicion
        ? prev.map(c => c.id === guardado.id ? guardado : c)
        : [...prev, guardado]
    );
    setModalForm(null);
  };

  const handleEliminar = async () => {
    if (!modalBorrar) return;
    try {
      await fetch(`${API}/catalogos/${modalBorrar.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setCatalogos(prev => prev.filter(c => c.id !== modalBorrar.id));
    } catch {
      // silencioso — podría mostrarse un toast aquí
    } finally {
      setModalBorrar(null);
    }
  };

  return (
    <>
      {/* cabecera */}
      <div className="d-flex align-items-start justify-content-between mb-1 flex-wrap gap-2">
        <div>
          <p style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c5a059", fontWeight: 700, margin: 0 }}>
            Galería
          </p>
          <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", fontWeight: 700, color: "#2f3131", margin: "4px 0 0" }}>
            Catálogo
          </h2>
        </div>

        {puedeEditar && (
          <button
            onClick={() => setModalForm("nuevo")}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg,#775a19,#c5a059)",
              border: "none", borderRadius: "999px",
              fontFamily: "'Manrope', sans-serif", fontSize: "12px",
              fontWeight: 700, color: "#fff", cursor: "pointer",
              letterSpacing: "0.06em",
              boxShadow: "0 4px 16px rgba(119,90,25,0.22)",
              transition: "transform .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            ＋ Agregar imagen
          </button>
        )}
      </div>

      {/* estados */}
      {cargando && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "260px" }}>
          <div className="spinner-border" style={{ color: "#c5a059", width: "28px", height: "28px", borderWidth: "3px" }} />
        </div>
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

      {!cargando && !error && catalogos.length === 0 && (
        <div style={{
          textAlign: "center", padding: "64px 24px",
          color: "#7f7667", fontFamily: "'Manrope', sans-serif",
        }}>
          <p style={{ fontSize: "40px", margin: "0 0 12px" }}>🖼</p>
          <p style={{ fontSize: "14px", margin: 0 }}>El catálogo está vacío.</p>
          {puedeEditar && (
            <p style={{ fontSize: "12px", margin: "6px 0 0", color: "#c5a059" }}>
              Usá "Agregar imagen" para empezar.
            </p>
          )}
        </div>
      )}

      {/* grilla */}
      {!cargando && catalogos.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}>
          {catalogos.map(c => (
            <CardCatalogo
              key={c.id}
              catalogo={c}
              puedeEditar={puedeEditar}
              onEditar={cat => setModalForm(cat)}
              onEliminar={cat => setModalBorrar(cat)}
            />
          ))}
        </div>
      )}

      {/* modales */}
      {modalForm && (
        <ModalCatalogo
          catalogo={modalForm === "nuevo" ? null : modalForm}
          onClose={() => setModalForm(null)}
          onGuardado={handleGuardado}
        />
      )}

      {modalBorrar && (
        <ModalConfirmar
          catalogo={modalBorrar}
          onClose={() => setModalBorrar(null)}
          onConfirmar={handleEliminar}
        />
      )}
    </>
  );
};

export default CatalogosPage;
