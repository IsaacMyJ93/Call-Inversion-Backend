const express = require('express');
const router = express.Router();
const calculadoraController = require('../controllers/calculadoraController');

// POST: /api/calculadora
router.post('/', calculadoraController.calcular);

module.exports = router;