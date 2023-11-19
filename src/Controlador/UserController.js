// controllers/userController.js
const mongoose = require('mongoose');
const User = require('../Modelos/Usuarios.js');

async function getAllUsers() {
  return await User.find();
}

async function createUser(userData) {
  const newUser = new User(userData);

  if (userData.foto_perfil) {
    newUser.foto_perfil.data = fs.readFileSync(userData.foto_perfil.path);
    newUser.foto_perfil.contentType = userData.foto_perfil.mimetype;
  }

  return await newUser.save();
}

async function createUser(userData) {
  const newUser = new User(userData);
  return await newUser.save();
}

async function updateUserByUsername(username, updateData) {
  return await User.findOneAndUpdate({ usuario: username }, updateData, { new: true }); // Cambiado a "usuario"
}

async function deleteUserByUsername(username) {
  return await User.findOneAndDelete({ usuario: username }); // Cambiado a "usuario"
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUserByUsername,
  deleteUserByUsername,
};
