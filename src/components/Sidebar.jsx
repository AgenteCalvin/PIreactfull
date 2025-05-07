import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Personas from "./Personas";
import Regiones from "./Regiones";
import "../style.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [nombreusuario, setNombreusuario] = useState("");


  const navigate = useNavigate();

  // Cambia el estado del sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Indica el nombre del perfil en el sidebar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      setNombreusuario(`${usuario.usuario}`);
    }
  }, []);

  // Efecto del modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Menu del sidebar
  return (
    <>
      <div className="layout" style={{ display: "flex" }}>
        <nav className={`sidebar ${isOpen ? "" : "close"} ${darkMode ? "dark" : ""}`}>
          <header>
            <div className="image-text">
              <span className="image">
                <img src="/profile-1.jpg" alt="logo" />
              </span>
              <div className="text header-text">
                <span className="name">{nombreusuario || "Perfil"}</span>
              </div>
            </div>
            <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <ul className="menu-links">
                <li className="nav-link">
                  <a href="#" onClick={() => setActiveSection("inicio")}>
                    <i className="bx bxs-home icon"></i>
                    <span className="text nav-text">Inicio</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#" onClick={() => setActiveSection("personas")}>
                    <i className="bx bxs-user icon"></i>
                    <span className="text nav-text">Personas</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#" onClick={() => setActiveSection("regiones")}>
                    <i className="bx bx-world icon"></i>
                    <span className="text nav-text">Regiones</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bxs-bell-ring icon"></i>
                    <span className="text nav-text">Notificaciones</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bx-stats icon"></i>
                    <span className="text nav-text">Estadísticas</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bxs-user-account icon"></i>
                    <span className="text nav-text">Mi Cuenta</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bottom-content">
              <li className="nav-link">
                <a href="#" onClick={() => { localStorage.clear(); navigate("/login"); }}>
                  <i className="bx bx-log-out icon"></i>
                  <span className="text nav-text">Salir</span>
                </a>
              </li>

              <li className="mode" onClick={toggleDarkMode}>
                <div className="moon-sun">
                  <i className="bx bx-moon icon moon"></i>
                  <i className="bx bx-sun icon sun"></i>
                </div>
                <span className="mode-text text">Modo oscuro</span>
                <div className="toggle-switch">
                  <span className="switch"></span>
                </div>
              </li>
            </div>
          </div>
        </nav>

        <main className="content"
          style={{
            marginLeft: isOpen ? "250px" : "78px",
            transition: "margin-left 0.3s ease",
            padding: "20px",
            width: "100%",
          }}>

          {activeSection === "personas" && <Personas />}
          {activeSection === "regiones" && <Regiones />}
          {activeSection === "inicio" && <h2 style={{ marginTop: "40px" }}>Bienvenidos a OIR (Organizacion, Identidad, Reencuentro)</h2>}
        </main>
      </div>
    </>
  );
};

export default Sidebar;