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

module.exports = router;
