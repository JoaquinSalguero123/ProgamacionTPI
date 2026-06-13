import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const SignUp = ({ setSignedUp }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── validación en el front (rápida, antes de llamar al back) ───────────────
  const validar = () => {
    if (!form.name.trim())
      return "El nombre completo es obligatorio.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Ingresá un email válido.";
    if (!form.password)
      return "La contraseña es obligatoria.";
    if (form.password !== form.confirmPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const error = validar();
    if (error) { toast.error(error); return; }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          nombreCompleto_usuario: form.name.trim(),
          id_permisos: 0,
          password: form.password,
          telefono: form.phoneNumber.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // muestra el mensaje exacto que devuelve el backend
        toast.error(data.message ?? "No se pudo crear el usuario.");
        return;
      }

      toast.success("Usuario registrado correctamente.");
      setTimeout(() => setSignedUp(false), 2000);

    } catch {
      toast.error("Ocurrió un error inesperado. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 px-3 px-lg-5 py-5 bg-light min-vh-100">
        <div className="w-100" style={{ maxWidth: "28rem" }}>

          {/* Mobile brand */}
          <div className="d-md-none text-center mb-5">
            <span className="fst-italic fs-1 text-warning-emphasis">The Atelier</span>
          </div>

          <div className="mb-5">
            <h2 className="mb-2 fs-2 text-dark">Crear una Cuenta</h2>
            <p className="fw-light text-secondary mb-0">
              Únete a The Atelier y comenzá a gestionar tu experiencia capilar.
            </p>
          </div>

          <form className="d-flex flex-column gap-4" onSubmit={handleSignUp} noValidate>

            <div>
              <label htmlFor="name" className="form-label fw-bold text-uppercase text-secondary small">
                Nombre Completo
              </label>
              <input
                type="text" id="name" name="name"
                className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                value={form.name} onChange={handleChange}
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label fw-bold text-uppercase text-secondary small">
                Correo Electrónico
              </label>
              <input
                type="email" id="email" name="email"
                className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                value={form.email} onChange={handleChange}
                placeholder="nombre@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label fw-bold text-uppercase text-secondary small">
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} id="password" name="password"
                  className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                />
                <button type="button" className="btn btn-link text-secondary px-0 border-0 border-bottom rounded-0"
                  onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? "👁" : "🔒"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label fw-bold text-uppercase text-secondary small">
                Confirmar Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showConfirm ? "text" : "password"} id="confirmPassword" name="confirmPassword"
                  className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                  value={form.confirmPassword} onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    borderBottomColor: form.confirmPassword && form.password !== form.confirmPassword
                      ? "#e07a7a" : undefined,
                  }}
                />
                <button type="button" className="btn btn-link text-secondary px-0 border-0 border-bottom rounded-0"
                  onClick={() => setShowConfirm(p => !p)}>
                  {showConfirm ? "👁" : "🔒"}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <small className="text-danger mt-1 d-block">Las contraseñas no coinciden</small>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="form-label fw-bold text-uppercase text-secondary small">
                Número de Teléfono <span className="text-secondary fw-normal">(opcional)</span>
              </label>
              <input
                id="phoneNumber" name="phoneNumber"
                className="form-control form-control-lg border-0 border-bottom rounded-0 bg-transparent px-0"
                value={form.phoneNumber} onChange={handleChange}
                placeholder="+54 9 11 0000-0000"
              />
            </div>

            <div className="d-flex flex-column gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-100 fw-bold text-uppercase text-white rounded-pill py-3"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>

              <div className="d-flex align-items-center justify-content-center gap-2 text-uppercase text-secondary small">
                <hr className="flex-grow-1 opacity-25" />
                ¿Ya tenés una cuenta?
                <hr className="flex-grow-1 opacity-25" />
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 fw-bold text-uppercase rounded-pill py-3"
                onClick={() => setSignedUp(false)}
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <footer className="mt-5 pt-4 text-center border-top">
            <small className="text-uppercase text-secondary fw-medium">
              © 2024 The Atelier. Todos los derechos reservados.
            </small>
          </footer>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default SignUp;

