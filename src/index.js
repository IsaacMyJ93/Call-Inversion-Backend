/**
 * @file Entry point for the backend server.
 * Loads environment variables, sets up Express, and starts the server.
 */

require('dotenv').config();
const express = require('express');
const activosRoutes = require('./routes/activos');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

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
 * Rutas de activos
 * @module routes/activos
 */
app.use('/api/activos', activosRoutes);

/**
 * Starts the Express server.
 * @function
 * @param {number} PORT - The port on which the server listens.
 */
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://127.0.0.1:${PORT}`);
});
