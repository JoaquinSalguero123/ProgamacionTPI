import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Configuracion = ({ Usuario }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombreCompleto_usuario: '',
        telefono: '',
        password: '',
    });
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const authHeaders = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`,
    });

    // Cargar datos del usuario logueado
    useEffect(() => {
        fetch("http://localhost:3000/usuarios/me", {
            headers: authHeaders(),
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                setForm({
                    nombreCompleto_usuario: data.nombreCompleto_usuario ?? '',
                    telefono: data.telefono ?? '',
                    password: '',
                });
            })
            .catch(() => {
                setMensaje({ tipo: 'error', texto: 'No se pudieron cargar los datos del usuario.' });
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setMensaje(null);
    };

    const handleGuardar = async () => {
        if (form.password && form.password !== confirmarPassword) {
            setMensaje({ tipo: 'error', texto: 'Las contraseñas no coinciden.' });
            return;
        }

        setGuardando(true);
        setMensaje(null);

        const body = {
            nombreCompleto_usuario: form.nombreCompleto_usuario,
            telefono: form.telefono,
        };
        if (form.password) body.password = form.password;
        
        try {
            const res = await fetch(`http://localhost:3000/usuarios/me`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error();
            setMensaje({ tipo: 'exito', texto: 'Cambios guardados correctamente.' });
            setForm(prev => ({ ...prev, password: '' }));
            setConfirmarPassword('');
        } catch {
            setMensaje({ tipo: 'error', texto: 'Error al guardar los cambios. Intentá de nuevo.' });
        } finally {
            setGuardando(false);
        }
    };

    // Borra el token y redirige al login
    const handleCerrarSesion = () => {
        localStorage.removeItem('Token');
        window.location.href = '/';
    };

    // ── estilos ───────────────────────────────────────────────────────────────

    const labelStyle = {
        fontFamily: "'Noto Serif', serif",
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#7f7667',
        marginBottom: '6px',
        display: 'block',
    };

    const inputBase = {
        fontFamily: "'Manrope', sans-serif",
        fontSize: '14px',
        color: '#2f3131',
        background: '#fafaf8',
        border: '1px solid #d1c5b4',
        borderRadius: '10px',
        padding: '10px 14px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    const cardStyle = {
        background: '#ffffff',
        border: '1px solid #e8e0d4',
        borderRadius: '16px',
        padding: '28px 32px',
        boxShadow: '0 2px 12px rgba(119,90,25,0.06)',
    };

    const sectionTitle = {
        fontFamily: "'Noto Serif', serif",
        fontSize: '13px',
        fontWeight: 700,
        color: '#775a19',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: '18px',
        paddingBottom: '10px',
        borderBottom: '1px solid #ede5d8',
    };

    const focusIn = e => { e.target.style.borderColor = '#c5a059'; e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.12)'; };
    const focusOut = e => { e.target.style.borderColor = '#d1c5b4'; e.target.style.boxShadow = 'none'; };

    // ── loading ───────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border" role="status"
                    style={{ color: '#c5a059', width: '28px', height: '28px', borderWidth: '3px' }}>
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // ── render ────────────────────────────────────────────────────────────────

    return (
        <div style={{ maxWidth: '620px' }}>

            <p className="mb-4" style={{ fontFamily: "'Noto Serif', serif", fontSize: '13px', color: '#7f7667' }}>
                Gestioná tu información personal y acceso al sistema
            </p>

            {/* alerta */}
            {mensaje && (
                <div className="mb-4" style={{
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontFamily: "'Manrope', sans-serif",
                    padding: '12px 16px',
                    background: mensaje.tipo === 'exito' ? '#f0faf4' : '#fdf2f2',
                    color: mensaje.tipo === 'exito' ? '#1e6e42' : '#8b2020',
                    border: `1px solid ${mensaje.tipo === 'exito' ? '#b6e4ca' : '#f0b8b8'}`,
                }}>
                    {mensaje.tipo === 'exito' ? '✓ ' : '⚠ '}{mensaje.texto}
                </div>
            )}

            {/* datos personales */}
            <div style={cardStyle} className="mb-3">
                <p style={sectionTitle}>Datos personales</p>

                <div className="mb-3">
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={Usuario?.email ?? ''}
                        readOnly
                        style={{ ...inputBase, background: '#f3f3f3', color: '#9e9488', cursor: 'not-allowed' }}
                    />
                    <p style={{ fontSize: '11px', color: '#b0a898', marginTop: '5px', fontFamily: "'Manrope', sans-serif" }}>
                        El email no puede modificarse.
                    </p>
                </div>

                <div className="mb-3">
                    <label style={labelStyle}>Nombre completo</label>
                    <input
                        type="text"
                        name="nombreCompleto_usuario"
                        value={form.nombreCompleto_usuario}
                        onChange={handleChange}
                        style={inputBase}
                        placeholder="Tu nombre completo"
                        onFocus={focusIn}
                        onBlur={focusOut}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Teléfono</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        style={inputBase}
                        placeholder="+54 9 11 0000-0000"
                        onFocus={focusIn}
                        onBlur={focusOut}
                    />
                </div>
            </div>

            {/* contraseña */}
            <div style={cardStyle} className="mb-4">
                <p style={sectionTitle}>Cambiar contraseña</p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '12px', color: '#9e9488', marginBottom: '18px' }}>
                    Dejá los campos en blanco si no querés cambiarla.
                </p>

                <div className="mb-3">
                    <label style={labelStyle}>Nueva contraseña</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={mostrarPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={{ ...inputBase, paddingRight: '42px' }}
                            placeholder="••••••••"
                            onFocus={focusIn}
                            onBlur={focusOut}
                        />
                        <button type="button" onClick={() => setMostrarPassword(p => !p)}
                            style={{
                                position: 'absolute', right: '12px', top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '14px', color: '#9e9488', padding: 0,
                            }}>
                            {mostrarPassword ? '🙈' : '👁'}
                        </button>
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Confirmar contraseña</label>
                    <input
                        type={mostrarPassword ? 'text' : 'password'}
                        value={confirmarPassword}
                        onChange={e => { setConfirmarPassword(e.target.value); setMensaje(null); }}
                        style={{
                            ...inputBase,
                            borderColor: confirmarPassword && form.password !== confirmarPassword
                                ? '#e07a7a' : '#d1c5b4',
                        }}
                        placeholder="••••••••"
                        onFocus={focusIn}
                        onBlur={e => {
                            e.target.style.borderColor = confirmarPassword && form.password !== confirmarPassword
                                ? '#e07a7a' : '#d1c5b4';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    {confirmarPassword && form.password !== confirmarPassword && (
                        <p style={{ fontSize: '11px', color: '#c0392b', marginTop: '5px', fontFamily: "'Manrope', sans-serif" }}>
                            Las contraseñas no coinciden
                        </p>
                    )}
                </div>
            </div>

            {/* acciones */}
            <div className="d-flex gap-3">
                <button
                    onClick={handleGuardar}
                    disabled={guardando}
                    style={{
                        flex: 1,
                        padding: '13px 24px',
                        background: guardando ? '#d4c4a0' : 'linear-gradient(135deg, #775a19, #c5a059)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '999px',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        cursor: guardando ? 'not-allowed' : 'pointer',
                        boxShadow: guardando ? 'none' : '0 4px 16px rgba(119,90,25,0.25)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                    onMouseEnter={e => { if (!guardando) e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                    {guardando ? (
                        <>
                            <span className="spinner-border spinner-border-sm"
                                style={{ width: '13px', height: '13px', borderWidth: '2px' }} />
                            Guardando...
                        </>
                    ) : '✓ Guardar cambios'}
                </button>

                <button
                    onClick={handleCerrarSesion}
                    style={{
                        padding: '13px 24px',
                        background: 'transparent',
                        color: '#a0522d',
                        border: '1px solid #d1c5b4',
                        borderRadius: '999px',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = '#fff4f4';
                        e.currentTarget.style.borderColor = '#e07a7a';
                        e.currentTarget.style.color = '#c0392b';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = '#d1c5b4';
                        e.currentTarget.style.color = '#a0522d';
                    }}
                >
                    → Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Configuracion;
