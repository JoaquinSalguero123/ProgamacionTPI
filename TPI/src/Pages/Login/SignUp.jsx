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
    // lógica de registro aquí
    setSignedUp(true);
    navigate("/home");
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    setSignedUp(false);
  };

  return (
    <div className="panel-right">

      {/* Encabezado */}
      <div className="form-header">
        <h2>Crear una Cuenta</h2>
        <p>Únete a The Atelier y comienza a gestionar tu experiencia capilar.</p>
      </div>

      {/* Formulario */}
      <form className="form-body">

        {/* Campo Nombre */}
        <div className="field">
          <label htmlFor="name">Nombre Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Campo Email */}
        <div className="field">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="nombre@ejemplo.com"
          />
        </div>

        {/* Campo Password */}
        <div className="field">
          <div className="field-top">
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "🔒"}
            </button>
          </div>
        </div>

        {/* Campo Confirmar Password */}
        <div className="field">
          <div className="field-top">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          </div>
          <div className="input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "👁" : "🔒"}
            </button>
          </div>
        </div>

        {/* Botones */}
        <div className="form-actions">
          <button type="submit" onClick={handleSignUp}>Registrarse</button>
          <p>¿Ya tienes una cuenta?</p>
          <button type="button" onClick={handleBackToLogin}>Iniciar Sesión</button>
        </div>

      </form>

      {/* Footer */}
      <footer className="form-footer">
        <p>© 2024 The Atelier. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
};

export default SignUp;