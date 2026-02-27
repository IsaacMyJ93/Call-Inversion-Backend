/**
 * @file Activos service.
 * Contiene funciones de negocio para activos.
 */
const activosDao = require('../dao/activosDao');

/**
 * Obtiene todos los activos usando el DAO.
* Obtiene todos los activos usando el DAO.
 * @async
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
exports.fetchAllActivos = async () => {
    // El Service SOLO habla con el DAO, nunca con Supabase directamente
    return await activosDao.getAllActivos();
};