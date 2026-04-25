import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import '../../Style/Login/Login.css';

const LoginPages = ({ setIsSignedIn }) => {

  const [signedUp, setSignedUp] = useState(false);

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

      {/* Panel Derecho - condicional */}
      {signedUp ? (
        <SignUp setSignedUp={setSignedUp} />
      ) : (
        <SignIn setIsSignedIn = {setIsSignedIn} setSignedUp = {setSignedUp} />
      )}

    </div>
  );
};

export default LoginPages;