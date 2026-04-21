import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginPages = ({ isSignedIn, setIsSignedIn }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSingin = (e) => {
        e.preventDefault();
        
        if (email === 'Marta' && password === '1234') {
            setIsSignedIn(true);
            navigate("/home");
        }
    }

  return (
    <div className="wrapper">

      {/* Panel Izquierdo - Imagen + Texto */}
      <div className="panel-left">
        <span className="brand">The Atelier</span>

        <div className="hero-copy">
          <h1>Belleza, <br /> Refinada.</h1>
          <p>Bienvenido a la extensión digital de The Atelier. Un espacio donde el arte se encuentra con la elegancia sin esfuerzo.</p>
        </div>
      </div>

      {/* Panel Derecho - Formulario */}
      <div className="panel-right">

        {/* Encabezado */}
        <div className="form-header">
          <h2>Acceder al Atelier</h2>
          <p>Por favor, ingresa tus credenciales para gestionar tu experiencia capilar.</p>
        </div>

        {/* Formulario */}
        <form className="form-body">

          {/* Campo Email */}
          <div className="field">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="nombre@ejemplo.com"
            />
          </div>

          {/* Campo Password */}
          <div className="field">
            <div className="field-top">
              <label htmlFor="password">Contraseña</label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="input-wrap">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
                placeholder="••••••••"
              />
              <button type="button" className="toggle-pw">👁</button>
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button type="submit" onClick={handleSingin}>Iniciar Sesión</button>
            <p>¿Eres nuevo en The Atelier?</p>
            <button type="button">Registrarse</button>
          </div>

        </form>

        {/* Footer */}
        <footer className="form-footer">
          <p>© 2024 The Atelier. Todos los derechos reservados.</p>
        </footer>

      </div>
    </div>
  );
};

export default LoginPages;
