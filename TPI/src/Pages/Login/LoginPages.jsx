import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const LoginPages = () => {

  const [signedUp, setSignedUp] = useState(false);

  

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">

      {/* Panel Izquierdo - Imagen + Texto */}
      <div className="panel-left d-none d-md-flex flex-column justify-content-end col-md-6 col-lg-7 position-relative overflow-hidden"
      style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsB-FRUebu3_g7FLhoMryjF7ixsgfVBAwejJ-g8AsY_BcmmLUVg7j4_-IKKyxAjAppU_N5YRbFMZSn4IKXECi1JZRrc3yU8OP1OllTXMdn6tJBTcrYlqI1kl3Z6sXJtR5wbLdgEpTLufFrXpeFUp9ijo2ViamAQASlXDPNBpMrND77C8Goeef_p1-VvybNxfT4fLyptqjztvU0r13je1-JjupcdsY546aaICbPNYQNdJ98Cd5vTipagZNIF3MRpG8IIIjAEYhaL58')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        
        {/* Brand fija esquina superior - solo lg+ */}
        <span className="brand d-none d-lg-block position-fixed top-0 start-0 mt-5 ms-5 fst-italic fs-4 text-light">
          The Atelier
        </span>

        {/* Hero copy */}
        <div className="position-relative p-5 p-lg-6">
          <h1 className="fst-italic display-3 text-white lh-1 mb-4">
            Belleza, <br /> Refinada.
          </h1>
          <p className="text-white-50 fw-light fs-5">
            Bienvenido a la extensión digital de The Atelier. Un espacio donde el arte se encuentra con la elegancia sin esfuerzo.
          </p>
        </div>

      </div>

      {/* Panel Derecho - condicional */}
      <div className="d-flex flex-column flex-grow-1 col-md-6 col-lg-5">
        {signedUp ? (
          <SignUp setSignedUp={setSignedUp} />
        ) : (
          <SignIn setSignedUp={setSignedUp} />
        )}
      </div>

    </div>
  );
};

export default LoginPages;
