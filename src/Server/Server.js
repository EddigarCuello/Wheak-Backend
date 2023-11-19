// server/server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el módulo CORS
const userRoutes = require('../Routes/User');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/WheakDb', { useNewUrlParser: true, useUnifiedTopology: true });

// Configura CORS antes de tus rutas
app.use(cors());

app.use(express.json());
app.use('/User', userRoutes);

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Servidor Express en http://localhost:${port}`);
});
