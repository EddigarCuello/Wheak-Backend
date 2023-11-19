const express = require('express');
const router = express.Router();
const multer = require('multer'); // Importar Multer
const path = require('path');
const userController = require('../Controlador/UserController.js');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Directorio de destino para almacenar las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo único
  }
});

const upload = multer({ storage: storage });

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener un usuario por nombre de usuario
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const user = await userController.getUserByUsername(username);
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario por nombre de usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo usuario con carga de imagen
router.post('/', upload.single('foto_perfil'), async (req, res) => {
  const userData = req.body;
  userData.foto_perfil = req.file ? req.file.filename : null; // Asignar el nombre del archivo si se proporciona una imagen

  try {
    const newUser = await userController.createUser(userData);
    res.json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Resto del código sin cambios

module.exports = router;
