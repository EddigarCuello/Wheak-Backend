// index.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3001;

// Crear un servidor HTTP para Express
const server = http.createServer(app);

// Crear un servidor de WebSockets que escucha en el mismo servidor HTTP
const wss = new WebSocket.Server({ server });

// Manejar conexión de WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Manejar mensajes recibidos desde el cliente
  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
  });

  // Enviar mensajes al cliente
  ws.send('¡Conexión exitosa!');

  // Manejar desconexión del cliente
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor Express y WebSocket escuchando en http://localhost:${port}`);
});
