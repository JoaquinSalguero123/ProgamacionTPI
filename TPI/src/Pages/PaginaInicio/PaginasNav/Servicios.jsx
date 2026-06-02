import React, { useState, useEffect } from "react";
import CardServicio from "../../../components/common/CardServicio";

const Servicios = () => {
  const [servicios, setServicios] = useState([]);

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
      </div>

      {/* GRID DE CARDS */}
      <div className="row g-4">
        {servicios.map((s) => (
          <div className="col-12 col-md-6 col-lg-4" key={s.id}>
            <CardServicio
              nombre={s.nombre_servicio}
              descripcion={s.descripcion}
              precio={s.precio}
              foto={s.foto}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
