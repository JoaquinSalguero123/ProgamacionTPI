import React, { useState, useEffect } from "react";
import CardServicio from "../../../components/common/CardServicio";
import { toast } from "react-toastify";

const API = "http://localhost:3000";
const getToken = () => localStorage.getItem("Token");
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ─── ModalActualizar ──────────────────────────────────────────────────────────────

const ModalActualizar = ({ servicio, onClickCancelar, handleActualizar, handleGuardado, blnNuevoServicio }) => {
  const [staServicio, setServicio] = useState({
    ...(blnNuevoServicio === false && { id: servicio.id }),
    nombre_servicio: blnNuevoServicio ? "" : servicio.nombre_servicio ?? "",
    precio: blnNuevoServicio ? 0 : servicio.precio ?? 0,
    descripcion: blnNuevoServicio ? "" : servicio.descripcion ?? "",
    foto: blnNuevoServicio ? "" : servicio.foto ?? ""
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio((prev) => ({ ...prev, [name]: value }));
  };

  const OnClickGuardar = async () => {
    setCargando(true);
    setError(null);
    try {

      const body = {
        ...(blnNuevoServicio === false && { id: staServicio.id }),
        nombre_servicio: staServicio.nombre_servicio,
        precio: staServicio.precio,
        descripcion: staServicio.descripcion,
        foto: staServicio.foto ?? ""
      };

      // Validar datos antes de enviar
      if (!ValidarDatosServicio()) {
        setCargando(false);
        return;
      }
      
      const res = await handleActualizar(body);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al guardar");
      }
      handleGuardado(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const ValidarDatosServicio = () => {
    setError(null);
    
    if (!staServicio.nombre_servicio.trim()) {
      setError("El nombre del servicio no puede estar vacío.");
      return false;
    }
    if (!staServicio.descripcion.trim()) {
      setError("La descripción del servicio no puede estar vacía.");
      return false;
    }
    if (isNaN(staServicio.precio) || Number(staServicio.precio) < 0) {
      setError("El precio debe ser un número válido mayor o igual a 0.");
      return false;
    }
    return true;
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
      onClick={(e) => e.target === e.currentTarget && onClickCancelar()}
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
              {blnNuevoServicio ? "Nuevo servicio" : "Editando servicio"}
            </p>
          
            <h5 style={{ fontFamily: "'Noto Serif', serif", color: "#2f3131", margin: "4px 0 0" }}>
              {servicio.nombre_servicio}
            </h5>
          </div>
          <button onClick={onClickCancelar} style={{ background: "none", border: "none", fontSize: "18px", color: "#7f7667", cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          <div>
            <label style={lbl}>Nombre Servicio</label>
            <input style={inp} name="nombre_servicio" value={staServicio.nombre_servicio}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"} />
          </div>
          <div>
            <label style={lbl}>Descrpción</label>
            <input style={inp} name="descripcion" value={staServicio.descripcion}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"} />
          </div>
          <div>
            <label style={lbl}>Precio</label>
            <input type="number" style={inp} name="precio" value={staServicio.precio}
              onChange={handleChange}
              onFocus={e => e.target.style.borderColor = "#c5a059"}
              onBlur={e => e.target.style.borderColor = "#d1c5b4"} />
          </div>
          <div>
            <label style={lbl}>Imagen 'URL'</label>
            <input style={inp} name="foto" value={staServicio.foto}
              onChange={handleChange}
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
          <button onClick={onClickCancelar} style={{
            flex: 1, padding: "11px", background: "transparent",
            border: "1px solid #d1c5b4", borderRadius: "999px",
            fontFamily: "'Manrope', sans-serif", fontSize: "12px",
            fontWeight: 600, color: "#7f7667", cursor: "pointer",
          }}>
            Cancelar
          </button>
          <button onClick={OnClickGuardar} disabled={cargando} style={{
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


const Servicios = ({user}) => {
  const [servicios, setServicios] = useState([]);
  const [blnNuevoServicio, setBlnNuevoServicio] = useState(false);
  const [actualizando, setActualizando] = useState(null);
  
  const blnUsuarioAutorizado = (user && (user.role === 0 )) ? false : true;
   console.log("blnUsuarioAutorizado: ", blnUsuarioAutorizado);
  const handleActualizar = async(servicio) => {
    //servicio es el body que se va a enviar al backend, con los datos actualizados
    var res = null;
    
    if (blnNuevoServicio) {
      res = await fetch(
        `${API}/servicios`,
        {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({servicio : servicio}),
          
        }
      );
    }
    else {
      console.log(servicio);
      res = await fetch(
      `${API}/servicios/${servicio.id}`,
      {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({servicioActualizado : servicio}),
      }
    );
    }
    return res;
  };

  const handleGuardado = (actualizado) => {
    
    if (blnNuevoServicio) {
      setServicios(prev => [...prev, actualizado]);
      handleCerrarModal();
    }
    else
    {
    setServicios(prev => prev.map(s => s.id === actualizado.id ? actualizado : s));
    handleCerrarModal();
    }
    return;
  };

  const handleBorrado = async (id) => {
    try {
      // Verificar si existen turnos asociados
      const resTurnos = await fetch(
        `http://localhost:3000/turnos/servicios/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      const turnos = await resTurnos.json();
      if (turnos.length > 0) {
        toast.error(
          "No se puede eliminar el servicio porque tiene turnos asociados."
        );
        return;
      }
      
      // Si no tiene turnos, eliminar
      const resDelete = await fetch(
        `http://localhost:3000/servicios/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
  
      if (resDelete.ok) {
        // Actualizar la lista de servicios después de eliminar
        setServicios(prev => prev.filter(s => s.id !== id));
        toast.success("Servicio eliminado correctamente.");
      } else {
        toast.error("Error al eliminar el servicio.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error de conexión.");
    }
  };
 
  const handleCerrarModal = () => {
    setActualizando(null);
    setBlnNuevoServicio(false);
  };

  const handleMostrarModal = (id = 0) => {
    if (id === 0) {
      setActualizando(true);
      setBlnNuevoServicio(true);
    }
    else {
      setActualizando(servicios.find(s => s.id === id));
    }

  }

  useEffect(() => {
    fetch("http://localhost:3000/servicios",{
        headers: {
          "Authorization" : ` Bearer ${localStorage.getItem("Token")} `
        }
  })
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* HEADER */}
      <div className="mb-5">
        <p
          className="mb-1 text-uppercase fw-bold"
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "#c5a059",
          }}
        >
          The Atelier
        </p>
        <div className="d-flex align-items-center gap-3">
          <h2
            className="fw-bold m-0"
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "40px",
              color: "#2f3131",
              letterSpacing: "-0.02em",
            }}
          >
            Nuestros Servicios
          </h2>
          {blnUsuarioAutorizado && (
          <>
          <button
            onClick={() => handleMostrarModal()}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "999px",
              background: "linear-gradient(135deg,#775a19,#c5a059)",
              color: "#fff",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(119,90,25,.25)",
            }}
          >
            + Nuevo
          </button>
          </>
        )}
        </div>

      </div>

      {/* GRID DE CARDS */}
      <div className="row g-4">
        {servicios.map((s) => (
          <div className="col-12 col-md-6 col-lg-4" key={s.id}>
            <CardServicio
              key={s.id}
              id={s.id}
              nombre={s.nombre_servicio}
              descripcion={s.descripcion}
              precio={s.precio}
              foto={s.foto}
              handleBorrado={handleBorrado}
              handleEditar={handleMostrarModal}
              blnUsuarioAutorizado={blnUsuarioAutorizado}
            />
          </div>
        ))}
      </div>
      
      {actualizando && (
        <ModalActualizar
          servicio={actualizando}
          onClickCancelar={handleCerrarModal}
          handleActualizar={handleActualizar}
          handleGuardado={handleGuardado}
          blnNuevoServicio={blnNuevoServicio}
        />
      )}
    </div>
    
  );
};

export default Servicios;
