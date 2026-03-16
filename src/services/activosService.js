/**
 * @file Activos service.
 * Contiene funciones de negocio para activos.
 */
const activosDao = require('../dao/activosDao');

/**
 * Obtiene todos los activos usando el DAO.
 * @async
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
exports.fetchAllActivos = async () => {
    // El Service SOLO habla con el DAO, nunca con Supabase directamente
    return await activosDao.getAllActivos();
};

/**
 * Crea un nuevo activo pasando los datos al DAO.
 * @async
 * @param {Object} activoData - Los datos del activo recibidos del cliente.
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
exports.addActivo = async (activoData) => {
    // Aquí en el futuro podríamos validar cosas, por ejemplo:
    // if (!activoData.simbolo) throw new Error("Falta el símbolo");
    
    return await activosDao.createActivo(activoData);
};

/**
 * Modifica un activo existente.
 * @async
 * @param {string|number} id - ID del activo.
 * @param {Object} activoData - Nuevos datos.
 */
exports.modifyActivo = async (id, activoData) => {
    return await activosDao.updateActivo(id, activoData);
};

/**
 * Elimina un activo.
 * @async
 * @param {string|number} id - ID del activo.
 */
exports.removeActivo = async (id) => {
    return await activosDao.deleteActivo(id);
};