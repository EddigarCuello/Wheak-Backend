// index.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { procesarUsuario } = require('./ProcesosUsuarios');

const app = express();
const port = 3001;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (data) => {
    try {
      const { mensaje, usuario } = JSON.parse(data);
      console.log(`Mensaje recibido: ${mensaje}`);
      console.log('Objeto usuario:', usuario);
      
      procesarUsuario(mensaje, ws, usuario);
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
    }
  });

  ws.send('¡Conexión exitosa!');

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor Express y WebSocket escuchando en http://localhost:${port}`);
});
