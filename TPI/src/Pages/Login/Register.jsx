import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="panel-right">
      {/* Panel Derecho - Formulario */}
      {/* Encabezado */}
      <div className="form-header">
        <h2>Registrase</h2>
      </div>
    </div>
  );
};

export default RegisterPage;
