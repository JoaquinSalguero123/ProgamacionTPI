
const Header = ({activeView, setActiveView, usuario_email, usuario_rol, handleCerrarSesion}) => {

    const navBtnStyle = {
        fontFamily: "'Noto Serif', serif",
        fontSize: "16px",
        color: "#7f7667",
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "0",
    };

    

    return (
        <header
            className="sticky-top px-5 py-3"
            style={{
                background: "rgba(249,249,249,0.85)",
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(209,197,180,0.2)",
                zIndex: 50,
            }}
        >
            {/* FILA 1 — Saludo */}
            <div className="mb-2">
                <span
                    className="fst-italic"
                    style={{
                        fontFamily: "'Noto Serif', serif",
                        fontSize: "16px",
                        color: "#c5a059",
                    }}
                >
                    Buenos días, {usuario_email ?? "Alexander"}
                </span>
            </div>

            {/* FILA 2 — Nav */}
            <div className="d-flex justify-content-between align-items-center">
                <div
                    style={{
                        fontFamily: "'Noto Serif', serif",
                        fontStyle: "italic",
                        fontSize: "22px",
                        color: "#2f3131",
                    }}
                >
                    The Atelier
                </div>
                <div className="d-none d-md-flex align-items-center gap-4">
                    <button
                        onClick={() => setActiveView("inicio")}
                        style={{
                            ...navBtnStyle,
                            color: activeView === "inicio" ? "#775a19" : "#7f7667",
                            fontWeight: activeView === "inicio" ? 700 : 400,
                            borderBottom:
                                activeView === "inicio"
                                    ? "2px solid #775a19"
                                    : "2px solid transparent",
                            paddingBottom: "2px",
                        }}
                    >
                        Atelier
                    </button>
                    <button
                        onClick={() => setActiveView("servicios")}
                        style={{
                            ...navBtnStyle,
                            color: activeView === "servicios" ? "#775a19" : "#7f7667",
                            fontWeight: activeView === "servicios" ? 700 : 400,
                            borderBottom:
                                activeView === "servicios"
                                    ? "2px solid #775a19"
                                    : "2px solid transparent",
                            paddingBottom: "2px",
                        }}
                    >
                        Servicios
                    </button>
                    
                    {usuario_rol != 0 && (
                    <button
                        onClick={() => setActiveView("agenda")}
                        style={{
                            ...navBtnStyle,
                            color: activeView === "agenda" ? "#775a19" : "#7f7667",
                            fontWeight: activeView === "agenda" ? 700 : 400,
                            borderBottom:
                                activeView === "agenda"
                                    ? "2px solid #775a19"
                                    : "2px solid transparent",
                            paddingBottom: "2px",
                        }}
                    >
                        Agenda
                    </button>
                    )}

                    <button
                        onClick={() => setActiveView("config")}
                        style={{
                            ...navBtnStyle,
                            color: activeView === "config" ? "#775a19" : "#7f7667",
                            fontWeight: activeView === "config" ? 700 : 400,
                            borderBottom:
                                activeView === "config"
                                    ? "2px solid #775a19"
                                    : "2px solid transparent",
                            paddingBottom: "2px",
                        }}
                    >
                        Configuración
                    </button>
                </div>
                <button
                    onClick={handleCerrarSesion}
                    className="border-0 fw-semibold px-4 py-2"
                    style={{
                        background: "linear-gradient(to right, #775a19, #c5a059)",
                        color: "white",
                        borderRadius: "999px",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    Cerrar sesión
                </button>
            </div>
        </header>
    );

};

export default Header;