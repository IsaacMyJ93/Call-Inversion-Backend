/**
 * @file Activos controller.
 * Handles business logic for activos endpoints.
 */
const activosService = require('../services/activosService');

/**
 * Controller to get all activos.
 * @function
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
exports.getAllActivos = async (req, res) => {
    try {
        const { data, error } = await activosService.fetchAllActivos();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error("Error al consultar Supabase:", error.message);
        res.status(500).json({ error: "Problema interno en el servidor" });
    }
};
