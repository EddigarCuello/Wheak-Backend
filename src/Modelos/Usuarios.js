// Modelos/Usuarios.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  correo: String,
  Usuario: String,
  contraseña: String,
  fecha_Nacimiento: Date,
  amigos: [],
  publicaciones: [],
  foto_perfil: Buffer, // Cambiado a Buffer para manejar imágenes
});

const User = mongoose.model('Usuarios', userSchema);

module.exports = User;
