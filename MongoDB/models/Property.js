const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    predio: { type: String, required: true },
    ciudad: { type: String, required: true },
    departamento: { type: String, required: true },
  }, { collection: 'Predios' });

module.exports = mongoose.model("Property", propertySchema);
