import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import users from "../../../BDHarcodeada/Usuarios.json"
import Usuario from "../../Models/UsuariosModel.jsx"

const SignIn = ( {setIsSignedIn , setSignedUp} ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSingin = (e) => {
        e.preventDefault();

        const usuario = new Usuario(email,password,0)


        //Se mejora con context y hooks personalizados
        if ( ValidarInicioSesion(usuario) ) {
            setIsSignedIn(true);
            navigate("/home", {state : {usuario}});
        }else{
          alert("Credenciales incorrectas.")
        }
    };

    const handleSingup = (e) => {
        e.preventDefault();
        setSignedUp(true);
    };

    
    const ValidarInicioSesion = (usuario) =>{
      return users.find((u) => u.email === usuario.email && u.password === usuario.password)
    }

    return(
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="••••••••"
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '👁' : '🔒'}
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="form-actions">
              <button type="submit" onClick={handleSingin}>Iniciar Sesión</button>
              <p>¿Eres nuevo en The Atelier?</p>
              <button type="button" onClick={handleSingup}>Registrarse</button>
            </div>

          </form>

          {/* Footer */}
          <footer className="form-footer">
            <p>© 2024 The Atelier. Todos los derechos reservados.</p>
          </footer>

        </div>
    )
}

export default SignIn;