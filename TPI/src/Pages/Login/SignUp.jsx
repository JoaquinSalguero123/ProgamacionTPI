import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setSignedUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    setSignedUp(true);
    navigate("/home");
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    setSignedUp(false);
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
          <h2 className="mb-2 fs-2 text-dark">Crear una Cuenta</h2>
          <p className="fw-light text-secondary mb-0">
            Únete a The Atelier y comienza a gestionar tu experiencia capilar.
          </p>
        </div>

        {/* Formulario */}
        <form className="d-flex flex-column gap-4">

          {/* Campo Nombre */}
          <div>
            <label
              htmlFor="name"
              className="form-label fw-bold text-uppercase text-secondary small"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Tu nombre completo"
            />
          </div>

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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="nombre@ejemplo.com"
            />
          </div>

          {/* Campo Password */}
          <div>
            <label
              htmlFor="password"
              className="form-label fw-bold text-uppercase text-secondary small"
            >
              Contraseña
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Campo Confirmar Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="form-label fw-bold text-uppercase text-secondary small"
            >
              Confirmar Contraseña
            </label>
            <div className="input-group">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="btn btn-link text-secondary px-0 border-0 border-bottom rounded-0"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "👁" : "🔒"}
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="d-flex flex-column gap-3 pt-2">

            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold text-uppercase text-white rounded-pill py-3"
              onClick={handleSignUp}
            >
              Registrarse
            </button>

            {/* Divider */}
            <div className="d-flex align-items-center justify-content-center gap-2 text-uppercase text-secondary small">
              <hr className="flex-grow-1 opacity-25" />
              ¿Ya tienes una cuenta?
              <hr className="flex-grow-1 opacity-25" />
            </div>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 fw-bold text-uppercase rounded-pill py-3"
              onClick={handleBackToLogin}
            >
              Iniciar Sesión
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

export default SignUp;