import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservarTurno = ({ usuario }) => {
  const [selectedStylist, setSelectedStylist] = useState();
  const [selectedTime, setSelectedTime] = useState("13:00");
  const [showModal, setShowModal] = useState(false);
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [servicios, setServicios] = useState([]);
  const [turnosOcupados, setTurnosOcupados] = useState([]);
  const [peluqueros, setPeluqueros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/servicios", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` }
    })
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios/peluqueros", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` }
    })
      .then((res) => res.json())
      .then((data) => setPeluqueros(data));
  }, []);

  useEffect(() => {
    if (!fecha || selectedStylist === undefined) return;

    fetch("http://localhost:3000/turnos", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` }
    })
      .then(res => res.json())
      .then(data => {
        const ocupados = data
          .filter(t =>
            t.fecha === fecha &&
            t.email_estilista === peluqueros[selectedStylist]?.email
          )
          .map(t => t.hora_turno);
        setTurnosOcupados(ocupados);
      });
  }, [fecha, selectedStylist, peluqueros]);

  const horarios = [
    "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();

  const diaSemana = new Date(fecha + "T00:00:00").getDay();
  if (diaSemana === 0 || diaSemana === 1) {
    toast.error("No atendemos los domingos ni lunes. Por favor elegí otro día.");
    return;
  }

  const NuevoTurno = {
    fecha: fecha,
    hora_turno: selectedTime,
    email_cliente: usuario?.email,
    id_servicio: servicio,
    email_estilista: peluqueros[selectedStylist]?.email,
    estado: 0,
  };

  try {
    const res = await fetch("http://localhost:3000/turnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify(NuevoTurno),
    });

    if (res.ok) {
      setShowModal(true);  // ← SOLO ACÁ
    } else {
      toast.error("Error al crear el turno, asegurese de marcar todos los campos.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error de conexión.");
  }
};

  const sectionStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 4px 30px rgba(0,0,0,0.02)",
    transition: "box-shadow 0.3s",
  };

  const badgeStyle = {
    fontSize: "10px",
    fontWeight: 700,
    color: "#775a19",
    border: "1px solid #d1c5b4",
    borderRadius: "999px",
    padding: "3px 10px",
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "#f3f3f3", minHeight: "100vh", padding: "60px 16px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* HEADER */}
        <header className="text-center mb-5">
          <h1 style={{ fontFamily: "'Noto Serif', serif", fontSize: "clamp(36px, 6vw, 56px)", color: "#2f3131", letterSpacing: "-0.02em" }}>
            Reservá tu turno
          </h1>
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5f5e5e" }}>
            Página oficial de Peluquería - Atelier
          </p>
        </header>

        <form onSubmit={handleSubmit}>

          {/* SECCIÓN 1 — Servicio */}
          <div className="mb-4" style={sectionStyle}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={badgeStyle}>01</span>
              <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", color: "#2f3131", margin: 0 }}>
                Tipo de corte
              </h2>
            </div>
            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
              style={{ background: "transparent", border: "none", borderBottom: "1px solid #d1c5b4", padding: "12px 0", fontSize: "16px", outline: "none", width: "100%" }}
            >
              <option value="" disabled>Seleccioná tu servicio...</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre_servicio}</option>
              ))}
            </select>
          </div>

          {/* SECCIÓN 2 — Estilista */}
          <div className="mb-4" style={sectionStyle}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={badgeStyle}>02</span>
              <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", color: "#2f3131", margin: 0 }}>
                Elige tu estilista
              </h2>
            </div>
            <div className="row g-3">
              {peluqueros.map((p, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <div
                    onClick={() => setSelectedStylist(i)}
                    className="d-flex flex-column align-items-center gap-2 p-3 rounded-3"
                    style={{
                      cursor: "pointer",
                      border: selectedStylist === i ? "1px solid rgba(119,90,25,0.3)" : "1px solid transparent",
                      background: selectedStylist === i ? "rgba(255,222,165,0.15)" : "transparent",
                      transition: "all 0.3s",
                    }}
                  >
                    <img
                      src={p.foto ?? "/Incognito.jpg"}
                      alt={p.nombreCompleto_usuario}
                      style={{
                        width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover",
                        filter: selectedStylist === i ? "grayscale(0)" : "grayscale(1)",
                        transition: "all 0.5s",
                        outline: selectedStylist === i ? "2px solid #775a19" : "2px solid transparent",
                        outlineOffset: "3px",
                      }}
                    />
                    <p style={{ fontFamily: "'Noto Serif', serif", fontSize: "13px", color: "#2f3131", margin: 0 }}>
                      {p.nombreCompleto_usuario}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN 3 — Fecha y Hora */}
          <div className="row g-4 mb-4">

            {/* Fecha */}
            <div className="col-12 col-md-6">
              <div style={sectionStyle}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span style={badgeStyle}>03</span>
                  <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", color: "#2f3131", margin: 0 }}>
                    Fecha
                  </h2>
                </div>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  style={{ background: "transparent", border: "none", borderBottom: "1px solid #d1c5b4", padding: "12px 0", fontSize: "16px", outline: "none", width: "100%" }}
                  min={new Date().toISOString().split("T")[0]}
                />
                <p style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#5f5e5e", marginTop: "12px" }}>
                  Martes a Sábado
                </p>
              </div>
            </div>

            {/* Horarios */}
            <div className="col-12 col-md-6">
              <div style={sectionStyle}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span style={badgeStyle}>04</span>
                  <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: "22px", color: "#2f3131", margin: 0 }}>
                    Horario
                  </h2>
                </div>
                <div className="row g-2">
                  {horarios.map((h) => {
                    const ocupado = turnosOcupados.includes(h);
                    const seleccionado = selectedTime === h;
                    return (
                      <div className="col-4" key={h}>
                        <button
                          type="button"
                          onClick={() => !ocupado && setSelectedTime(h)}
                          disabled={ocupado}
                          className="w-100"
                          style={{
                            padding: "10px 0",
                            fontSize: "11px",
                            fontWeight: 500,
                            letterSpacing: "0.1em",
                            borderRadius: "999px",
                            opacity: ocupado ? 0.4 : 1,
                            cursor: ocupado ? "not-allowed" : "pointer",
                            background: ocupado ? "#f0f0f0" : seleccionado ? "rgba(255,222,165,0.2)" : "transparent",
                            border: ocupado ? "1px solid #eee" : seleccionado ? "1px solid #775a19" : "1px solid #eeeeee",
                            color: ocupado ? "#bbb" : seleccionado ? "#775a19" : "#5f5e5e",
                            transition: "all 0.2s",
                          }}
                        >
                          {h}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
          {/* FIN SECCIÓN 3 */}

          {/* FOOTER — Botón submit */}
          <div className="d-flex flex-column align-items-center gap-3 pt-4">
            <p style={{ fontSize: "11px", color: "#5f5e5e", textAlign: "center", maxWidth: "420px", lineHeight: 1.7 }}>
              Al confirmar tu turno, estás aceptando nuestra política de cancelación dentro de las próximas 24hs.
              De lo contrario, deberás pagar la mitad del valor total del turno seleccionado. Gracias.
            </p>
            <button
              type="submit"
              className="border-0"
              style={{
                padding: "18px 48px",
                borderRadius: "999px",
                background: "linear-gradient(to right, #775a19, #c5a059)",
                color: "white",
                fontFamily: "'Noto Serif', serif",
                fontStyle: "italic",
                fontSize: "18px",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(119,90,25,0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Confirmar Turno →
            </button>
          </div>

        </form>
        {/* FIN FORM */}

        <div className="text-center mt-5">
          <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: "italic", color: "#b0a898", fontSize: "13px" }}>
            Gracias por confiar tu estilo personal en Atelier.
          </p>
        </div>

      </div>
      {/* FIN CONTENEDOR */}

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(47,49,49,0.6)", backdropFilter: "blur(8px)", zIndex: 9999 }}
        >
          <div
            className="text-center p-5 mx-3"
            style={{ background: "#f9f9f9", borderRadius: "20px", maxWidth: "460px", width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
          >
            <div
              className="d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(255,222,165,0.3)" }}
            >
              <span style={{ fontSize: "36px", color: "#775a19" }}>✓</span>
            </div>
            <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: "28px", color: "#2f3131" }}>
              Turno Confirmado
            </h3>
            <p style={{ color: "#5f5e5e", marginBottom: "32px" }}>
              Tu turno en nuestra peluquería fue confirmado con éxito, ¡te esperamos!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-100"
              style={{
                padding: "14px",
                borderRadius: "999px",
                border: "1px solid #775a19",
                background: "transparent",
                color: "#775a19",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#775a19"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#775a19"; }}
            >
              Volver a la página
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center mt-5 pb-4">
        <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#b0a898" }}>
          © 2024 THE ATELIER. EDITORIAL HAIR DESIGN.
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ReservarTurno;