const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  tipoId: String,
  numeroId: String,
  correo: String,
  usuario: String,
  contraseña: String,
});

module.exports = mongoose.model("User", userSchema);