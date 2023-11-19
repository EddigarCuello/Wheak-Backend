// routes/menu.js
const express = require('express');
const router = express.Router();

router.get('/accion-especial', (req, res) => {
  res.send('Esta es una acción especial del menú.');
});

// Otras rutas de menú aquí

module.exports = router;
