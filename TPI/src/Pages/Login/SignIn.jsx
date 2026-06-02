import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../../BDHarcodeada/Usuarios.json";
import Usuario from "../../Models/UsuariosModel.jsx";

const SignIn = ({ setIsSignedIn, setSignedUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSingin = (e) => {
    e.preventDefault();

    ValidarInicioSesion(email, password)
      .then(usuario_encontrado => {

        if (usuario_encontrado) {
          setIsSignedIn(true);
          navigate("/home");
        } else {
          alert("Credenciales incorrectas.");
        }

      });
  };

  const handleSingup = (e) => {
    e.preventDefault();
    setSignedUp(true);
  };

  const ValidarInicioSesion = (email, password) => {

    return fetch(`http://localhost:3000/usuarios/login` , {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          return null;
        }

        return res.json(); // <- IMPORTANTE
      })
      .then((token) => {
        if(token){
          console.log("TOKEN GUARDADO",token);
          localStorage.setItem("Token", token);
          return true;
        }else{
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };
    

  return (
    <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 px-3 px-lg-5 py-5 bg-light min-vh-100">
      <div className="w-100" style={{ maxWidth: "28rem" }}>

        {/* Mobile brand */}
        <div className="d-md-none text-center mb-5">
          <span className="fst-italic fs-1 text-warning-emphasis">
            The Atelier
          </span>
        </div>

        {/* Encabezado */}
        <div className="mb-5">
          <h2 className="mb-2 fs-2 text-dark">
            Acceder al Atelier
          </h2>
          <p className="fw-light text-secondary mb-0">
            Por favor, ingresa tus credenciales para gestionar tu experiencia capilar.
          </p>
        </div>

        {/* Formulario */}
        <form className="d-flex flex-column gap-4" onSubmit={handleSingin}>

          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="form-label fw-bold text-uppercase text-secondary small"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
              onChange={handleEmailChange}
              value={email}
              placeholder="nombre@ejemplo.com"
            />
          </div>

          {/* Campo Password */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label
                htmlFor="password"
                className="form-label fw-bold text-uppercase text-secondary small mb-0"
              >
                Contraseña
              </label>
              <a
                href="#"
                className="fw-bold text-uppercase text-decoration-none text-warning-emphasis small"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                onChange={handlePasswordChange}
                value={password}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="btn btn-link text-secondary px-0 border-0 border-bottom rounded-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "🔒"}
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="d-flex flex-column gap-3 pt-2">

            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold text-uppercase text-white rounded-pill py-3 letter-spacing"
            >
              Iniciar Sesión
            </button>

            {/* Divider */}
            <div className="d-flex align-items-center justify-content-center gap-2 text-uppercase text-secondary small">
              <hr className="flex-grow-1 opacity-25" />
              ¿Eres nuevo en The Atelier?
              <hr className="flex-grow-1 opacity-25" />
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 fw-bold text-uppercase rounded-pill py-3"
              onClick={handleSingup}
            >
              Registrarse
            </button>

          </div>
        </form>

        {/* Footer */}
        <footer className="mt-5 pt-4 text-center border-top">
          <small className="text-uppercase text-secondary fw-medium">
            © 2024 The Atelier. Todos los derechos reservados.
          </small>
        </footer>

      </div>
    </div>
  );
};

export default SignIn;