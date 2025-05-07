import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Login_registrarse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    tipoId: "",
    numeroId: "",
    correo: "",
    usuario: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  useEffect(() => {
    const inputs = document.querySelectorAll(".input-group input, .input-group2 input");

    inputs.forEach((input) => {
      const icon = input.parentElement.querySelector("i");
      const originalPlaceholder = input.getAttribute("placeholder");

      const handleInput = () => {
        if (input.value.trim() !== "") {
          icon.style.opacity = "0";
          input.setAttribute("placeholder", "");
        } else {
          icon.style.opacity = "1";
          input.setAttribute("placeholder", originalPlaceholder);
        }
      };

      input.addEventListener("input", handleInput);

      return () => {
        input.removeEventListener("input", handleInput);
      };
    });
  }, []);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    const usuarioParaEnviar = {
      ...formData,
    };
  
    delete usuarioParaEnviar.confirmarContraseña;
  
    console.log("Enviando usuario:", usuarioParaEnviar);
  
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioParaEnviar),
      });
  
      if (response.ok) {
        alert("¡Registro exitoso!");
        setError("");
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.error || "Error en el registro");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <h2><center>Registro de Usuario</center></h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="bx bx-user"></i>
            <input
              type="text"
              name="nombre"
              placeholder="       Nombre"
              value={formData.nombre}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                  setFormData({ ...formData, nombre: value });
                }
              }}
              required
            />
          </div>

          <div className="input-group">
            <i className="bx bx-user"></i>
            <input
              type="text"
              name="apellidos"
              placeholder="       Apellidos"
              value={formData.apellidos}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                  setFormData({ ...formData, apellidos: value });
                }
              }}
              required
            />
          </div>

          <div className="input-group">
            <i className="bx bx-id-card"></i>
            <select
              name="tipoId"
              value={formData.tipoId}
              onChange={handleChange}
              required
            >
              <option value="">Tipo de identificación</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PA">Pasaporte</option>
            </select>
          </div>

          <div className="input-group">
            <i className="bx bx-id-card"></i>
            <input
              type="text"
              name="numeroId"
              placeholder="       Número de identificación"
              value={formData.numeroId}
              onChange={(e) => {
                // Solo permitir números y limitar a 10 dígitos
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setFormData({ ...formData, numeroId: value });
                }
              }}
              required
            />
          </div>

          <div className="input-group">
            <i className="bx bx-envelope"></i>
            <input
              type="email"
              name="correo"
              placeholder=" Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <i className="bx bx-user-circle"></i>
            <input
              type="text"
              name="usuario"
              placeholder="       Nombre de usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group2">
            <i className="bx bx-lock-alt"></i>
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group2">
            <i className="bx bx-lock"></i>
            <input
              type="password"
              name="confirmarContraseña"
              placeholder="Confirmar contraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="register-buttons">
            <button
              type="button"
              className="register-btn cancel"
              onClick={() => navigate("/")}
            >
              Volver al Login
            </button>
            <button type="submit" className="register-btn">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login_registrarse;