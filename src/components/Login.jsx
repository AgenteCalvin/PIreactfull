import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.forward();

    const inputs = document.querySelectorAll(".input-group input, .input-group2 input");
    inputs.forEach((input) => {
      const icon = input.parentElement.querySelector("i");

      const handleInput = () => {
        icon.style.opacity = input.value.trim() !== "" ? "0" : "1";
      };

      input.addEventListener("input", handleInput);

      // Limpieza
      return () => {
        input.removeEventListener("input", handleInput);
      };
    });
  }, []);

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = document.getElementById("response");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: username,
          contraseña: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("usuario", JSON.stringify(data.user));
        response.textContent = "Inicio de sesión exitoso ✅";
        response.style.color = "green";
        setTimeout(() => {
          navigate("/sidebar");
        }, 1000);
      } else {
        response.textContent = data.message || "Error al iniciar sesión ❌";
        response.style.color = "red";
      }
    } catch (error) {
      response.textContent = "Error del servidor ❌";
      response.style.color = "red";
    }
  };

  const handleLogin_registrarse = () => {
    navigate("/Login_registrarse");
  };


  return (
    <section className="login-section">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <form id="login-form">
          <div className="input-group">
            <i className="bx bx-user"></i>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="       Usuario"
            />
          </div>

          <div className="input-group2">
            <i className="bx bx-lock-alt"></i>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Contraseña"
            />
          </div>

          <button type="button" id="login-button" className="login-btn" onClick={handleLogin}>
            Ingresar
          </button>
          <div id="response"></div>
          <div>
            <button onClick={handleLogin_registrarse}>¿No tienes cuenta? Regístrate</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;