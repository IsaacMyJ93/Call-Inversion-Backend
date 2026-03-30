/**
 * @file Entry point for the backend server.
 * Loads environment variables, sets up Express, and starts the server.
 */

require('dotenv').config();
const express = require('express');

// 1. Importaciones de rutas (unificadas apuntando a la carpeta src)
const activosRoutes = require('./routes/activos');
const calculadoraRoutes = require('./routes/calculadora');

// 2. Inicialización de Express
const app = express();
const PORT = process.env.PORT || 8080;

// 3. Middlewares
app.use(express.json()); // Permite a Express leer los JSON que enviamos en el Body

/**
 * GET /api/status
 * Checks if the backend server is running.
 * @route GET /api/status
 * @returns {Object} 200 - JSON message indicating server status
 */
app.get('/api/status', (req, res) => {
    res.json({ mensaje: "El backend de Call-Inversion está funcionando correctamente" });
});

/**
 * 4. Rutas principales de la API
 */
app.use('/api/activos', activosRoutes);
app.use('/api/calculadora', calculadoraRoutes);

/**
 * Starts the Express server.
 * @function
 */
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://127.0.0.1:${PORT}`);
});