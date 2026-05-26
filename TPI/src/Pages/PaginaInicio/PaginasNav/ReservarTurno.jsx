import React, { useState, useEffect } from "react";

const ReservarTurno = () => {
  const [selectedStylist, setSelectedStylist] = useState([]);
  const [selectedTime, setSelectedTime] = useState("13:00");
  const [showModal, setShowModal] = useState(false);
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  const [peluqueros, setPeluqueros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => setPeluqueros(data.filter((u) => u.id_permisos === 1)));
  }, []);

  const horarios = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];

  const handleSubmit = (e, fecha, horario_turno, email_cliente, id_servicio, email_estilista) => {
    e.preventDefault();
    setShowModal(true);

    const NuevoTurno = {
      fecha: fecha,
      horario_turno: horario_turno,
      email_cliente: email_cliente,
      id_servicio: id_servicio,
      email_estilista: email_estilista
    };
  
    return fetch(`http://localhost:3000/usuarios`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(NuevoTurno)
    })
      .then(res => {
  
        if (!res.ok) {
          return null;
        }
  
        return res.json(); // <- IMPORTANTE
      })
      .then(data => {
        return data; // devuelve el usuario creado
      })
      .catch(err => {
        console.log(err);
        return null;
      });
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
    <div
      style={{
        fontFamily: "'Manrope', sans-serif",
        background: "#f3f3f3",
        minHeight: "100vh",
        padding: "60px 16px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* HEADER */}
        <header className="text-center mb-5">
          <h1
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(36px, 6vw, 56px)",
              color: "#2f3131",
              letterSpacing: "-0.02em",
            }}
          >
            Reservá tu turno
          </h1>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5f5e5e",
            }}
          >
            Página oficial de Peluquería - Atelier
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          {/* SECCIÓN 1 — Servicio */}
          <div className="mb-4" style={sectionStyle}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={badgeStyle}>01</span>
              <h2
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: "22px",
                  color: "#2f3131",
                  margin: 0,
                }}
              >
                Tipo de corte
              </h2>
            </div>
            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #d1c5b4",
                padding: "12px 0",
                fontSize: "16px",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="" disabled>
                Seleccioná tu servicio...
              </option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre_servicio}
                </option>
              ))}
            </select>
          </div>

          {/* SECCIÓN 2 — Estilista */}
          <div className="mb-4" style={sectionStyle}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={badgeStyle}>02</span>
              <h2
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: "22px",
                  color: "#2f3131",
                  margin: 0,
                }}
              >
                Elige tu estilista
              </h2>
            </div>
            <div className="row g-3">
              {/* MAPEO DE PELUQUEROS */}
              {peluqueros.map((p, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <div
                    onClick={() => setSelectedStylist(i)}
                    className="d-flex flex-column align-items-center gap-2 p-3 rounded-3"
                    style={{
                      cursor: "pointer",
                      border:
                        selectedStylist === i
                          ? "1px solid rgba(119,90,25,0.3)"
                          : "1px solid transparent",
                      background:
                        selectedStylist === i
                          ? "rgba(255,222,165,0.15)"
                          : "transparent",
                      transition: "all 0.3s",
                    }}
                  >
                    <img
                      src={p.foto ?? "https://via.placeholder.com/72"}
                      alt={p.nombreCompleto}
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        filter:
                          selectedStylist === i
                            ? "grayscale(0)"
                            : "grayscale(1)",
                        transition: "all 0.5s",
                        outline:
                          selectedStylist === i
                            ? "2px solid #775a19"
                            : "2px solid transparent",
                        outlineOffset: "3px",
                      }}
                    />
                    <div className="text-center">
                      <p
                        style={{
                          fontFamily: "'Noto Serif', serif",
                          fontSize: "13px",
                          color: "#2f3131",
                          margin: 0,
                        }}
                      >
                        {p.nombreCompleto_usuario}
                      </p>
                    </div>
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
                  <h2
                    style={{
                      fontFamily: "'Noto Serif', serif",
                      fontSize: "22px",
                      color: "#2f3131",
                      margin: 0,
                    }}
                  >
                    Preferred Date
                  </h2>
                </div>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #d1c5b4",
                    padding: "12px 0",
                    fontSize: "16px",
                    outline: "none",
                    width: "100%",
                  }}
                />
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#5f5e5e",
                    marginTop: "12px",
                  }}
                >
                  Available Tuesday — Saturday
                </p>
              </div>
            </div>

            {/* Horarios */}
            <div className="col-12 col-md-6">
              <div style={sectionStyle}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span style={badgeStyle}>04</span>
                  <h2
                    style={{
                      fontFamily: "'Noto Serif', serif",
                      fontSize: "22px",
                      color: "#2f3131",
                      margin: 0,
                    }}
                  >
                    Time Slot
                  </h2>
                </div>
                <div className="row g-2">
                  {horarios.map((h) => (
                    <div className="col-4" key={h}>
                      <button
                        type="button"
                        onClick={() => setSelectedTime(h)}
                        className="w-100"
                        style={{
                          padding: "10px 0",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          borderRadius: "999px",
                          border:
                            selectedTime === h
                              ? "1px solid #775a19"
                              : "1px solid #eeeeee",
                          background:
                            selectedTime === h
                              ? "rgba(255,222,165,0.2)"
                              : "transparent",
                          color: selectedTime === h ? "#775a19" : "#5f5e5e",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {h}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER — Botón submit */}
          <div className="d-flex flex-column align-items-center gap-3 pt-4">
            <p
              style={{
                fontSize: "11px",
                color: "#5f5e5e",
                textAlign: "center",
                maxWidth: "420px",
                lineHeight: 1.7,
              }}
            >
              Al confirmar tu turno, estás aceptando nuestra politica de
              cancelación de turno dentro de las próximas 24hs. De lo contrario,
              deberá pagar la mitad del valor total del turno seleccionado.
              Gracias.
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Confirmar Turno →
            </button>
          </div>
        </form>

        <div className="text-center mt-5">
          <p
            style={{
              fontFamily: "'Noto Serif', serif",
              fontStyle: "italic",
              color: "#b0a898",
              fontSize: "13px",
            }}
          >
            Gracias por confiar tu estilo personal en Atelier.
          </p>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(47,49,49,0.6)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
          }}
        >
          <div
            className="text-center p-5 mx-3"
            style={{
              background: "#f9f9f9",
              borderRadius: "20px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(255,222,165,0.3)",
              }}
            >
              <span style={{ fontSize: "36px", color: "#775a19" }}>✓</span>
            </div>
            <h3
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: "28px",
                color: "#2f3131",
              }}
            >
              Confirmed
            </h3>
            <p style={{ color: "#5f5e5e", marginBottom: "32px" }}>
              Your journey with The Atelier has been reserved. A confirmation
              detail has been sent to your digital portfolio.
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#775a19";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#775a19";
              }}
            >
              Return to Atelier
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center mt-5 pb-4">
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#b0a898",
          }}
        >
          © 2024 THE ATELIER. EDITORIAL HAIR DESIGN.
        </p>
      </div>
    </div>
  );
};

export default ReservarTurno;
