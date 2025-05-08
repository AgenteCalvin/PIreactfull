const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");
const Property = require("./models/Property");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/Login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

  

// ----------------------- RUTAS -----------------------

// Ruta para registrar usuarios
app.post("/api/register", async (req, res) => {
  console.log("Datos recibidos en el backend:", req.body);

  try {
    const {
      nombre,
      apellidos,
      tipoId,
      numeroId,
      correo,
      usuario,
      contraseña,
    } = req.body;

    const validator = require('validator');

const existingUser = await User.findOne({ correo }); 
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const nuevoUsuario = new User({
      nombre,,
      apellidos,
      tipoId,
      numeroId,
      correo,
      usuario,
      contraseña,
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario registrado correctamente", user: nuevoUsuario });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

// Ruta de login
app.post("/login", async (req, res) => {
  const { usernameOrEmail, contraseña } = req.body;.

  try {
   const sanitizeInput = input => typeof input === 'string' ? input : '';

const sanitizedInput = sanitizeInput(usernameOrEmail);

const user = await User.findOne({
  $or: [
    { usuario: sanitizedInput },
    { correo: sanitizedInput }
  ]
});

    if (!user) {
      return res.status(404).json({ message: "Usuario o correo no encontrado" });
    }

    if (user.contraseña !== contraseña) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

// Ruta para obtener usuarios
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
});

// Ruta para obtener propiedades/regiones
app.get("/api/regiones", async (req, res) => {
  console.log("Entrando a /api/regiones");
  try {
    const regiones = await Property.find();
    console.log("Regiones encontradas:", regiones); 
    res.status(200).json(regiones);
  } catch (error) {
    console.error("Error al buscar regiones:", error);
    res.status(500).json({ message: "Error al obtener las regiones", error });
  }
});

// --------------------- INICIAR SERVIDOR ---------------------

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
