/**
 * @file Activos routes.
 * Defines routes for activos endpoints.
 */
const express = require('express');
const router = express.Router();
const activosController = require('../controllers/activosController');

/**
 * GET /api/activos
 * Returns all activos from the database.
 * @route GET /api/activos
 */
router.get('/', activosController.getAllActivos);

/**
 * POST /api/activos
 * Crea un nuevo activo en la base de datos.
 * @route POST /api/activos
 */
router.post('/', activosController.createActivo);

// PUT: Actualizar un activo por ID
router.put('/:id', activosController.updateActivo);

// DELETE: Borrar un activo por ID
router.delete('/:id', activosController.deleteActivo);

module.exports = router;
