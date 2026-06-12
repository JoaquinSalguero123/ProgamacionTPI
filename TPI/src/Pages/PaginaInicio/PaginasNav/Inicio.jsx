import React from "react";
import { useNavigate } from "react-router-dom";

const Inicio = ({ setActiveView }) => {

  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "#f9f9f9" }}>
      {/* HERO */}
      <section
        className="py-5"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "#f9f9f9",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            {/* Texto izquierda */}
            <div className="col-12 col-md-6">
              <span
                className="d-block mb-3 fst-italic"
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: "18px",
                  color: "#775a19",
                }}
              >
                Est. 2024
              </span>
              <h1
                className="mb-4"
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: "clamp(48px, 7vw, 80px)",
                  lineHeight: 1.1,
                  color: "#2f3131",
                  letterSpacing: "-0.02em",
                }}
              >
                El arte de <br />
                <span className="fst-italic fw-normal">Un buen estilo.</span>
              </h1>
              <p
                className="mb-5"
                style={{
                  color: "#7f7667",
                  fontSize: "17px",
                  maxWidth: "420px",
                  lineHeight: 1.7,
                }}
              >
                Un espacio donde nos hacemos cargo de tu estilo e identidad,
                para que tengas tu corte de pelo al detalle.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/reservar")}
                  className="border-0 fw-semibold px-4 py-3"
                  style={{
                    background: "#c5a059",
                    color: "white",
                    borderRadius: "999px",
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(119,90,25,0.2)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  + Nuevo Turno
                </button>

                <button
                  onClick={() => setActiveView("servicios")}
                  className="bg-transparent fw-semibold px-4 py-3"
                  style={{
                    border: "1px solid #d1c5b4",
                    color: "#2f3131",
                    borderRadius: "999px",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Ver nuestro catálogo
                </button>
              </div>
            </div>

            {/* Imagen derecha */}
            <div className="col-12 col-md-6 position-relative">
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "16px",
                  transform: "rotate(2deg)",
                  transition: "transform 0.7s",
                  boxShadow: "0 40px 80px rgba(47,49,49,0.12)",
                  aspectRatio: "4/5",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "rotate(0deg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "rotate(2deg)")
                }
              >
                <img
                  src="/buzzcut.jpg"
                  alt="Corte de pelo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Badge flotante */}
              <div
                className="position-absolute d-none d-sm-block bg-white p-3"
                style={{
                  bottom: "-16px",
                  left: "-24px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  maxWidth: "200px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontStyle: "italic",
                    fontSize: "20px",
                    color: "#775a19",
                    margin: 0,
                  }}
                >
                  Buzz Cut
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#7f7667",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Corte más pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-5 pb-4" style={{ background: "#2f3131" }}>
        <div className="container d-flex flex-column align-items-center gap-4">
          <div
            style={{
              fontFamily: "'Noto Serif', serif",
              fontStyle: "italic",
              fontSize: "36px",
              color: "#f9f9f9",
            }}
          >
            The Atelier
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-4">
            {["Privacy Policy", "Terms of Service", "Press Kit", "Contact"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#7f7667",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c5a059")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7f7667")
                  }
                >
                  {link}
                </a>
              ),
            )}
          </div>

          <hr
            style={{ width: "100%", borderColor: "#3d3f3f", margin: "8px 0" }}
          />

          <p
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c5a059",
              opacity: 0.6,
              margin: 0,
            }}
          >
            © 2024 THE ATELIER. EDITORIAL HAIR DESIGN.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
