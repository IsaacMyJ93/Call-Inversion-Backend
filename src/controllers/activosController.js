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

/**
 * Controller to create a new activo.
 * @function
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
exports.createActivo = async (req, res) => {
    try {
        const nuevoActivo = req.body; 
        const { data, error } = await activosService.addActivo(nuevoActivo);
        
        if (error) throw error;
        
        // 201 significa "Creado con éxito"
        res.status(201).json({
            mensaje: "Activo insertado correctamente",
            dato: data[0]
        });
    } catch (error) {
        console.error("Error al insertar en Supabase:", error.message);
        res.status(500).json({ error: "Problema al crear el activo" });
    }
};

/**
 * Controller para actualizar un activo.
 */
exports.updateActivo = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        
        const { data, error } = await activosService.modifyActivo(id, datosActualizados);
        if (error) throw error;
        
        res.json({ mensaje: "Activo actualizado", dato: data[0] });
    } catch (error) {
        console.error("Error al actualizar:", error.message);
        res.status(500).json({ error: "Problema al actualizar el activo" });
    }
};

/**
 * Controller para borrar un activo.
 */
exports.deleteActivo = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { error } = await activosService.removeActivo(id);
        if (error) throw error;
        
        res.json({ mensaje: "Activo eliminado correctamente" });
    } catch (error) {
        console.error("Error al borrar:", error.message);
        res.status(500).json({ error: "Problema al eliminar el activo" });
    }
};