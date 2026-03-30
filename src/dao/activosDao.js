/**
 * @file Activos DAO.
 * Encapsula el acceso a datos de la tabla 'activos' en Supabase.
 */
const supabase = require('../../config/supabaseClient');

/**
 * Obtiene todos los activos desde Supabase.
 * @async
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
async function getAllActivos() {
    return await supabase
        .from('activos')
        .select('*');
}

/**
 * Inserta un nuevo activo en la tabla de Supabase.
 * @async
 * @param {Object} activo - Objeto con los datos del activo (simbolo, nombre, tipo, riesgo).
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
async function createActivo(activo) {
    return await supabase
        .from('activos')
        .insert([activo]) // Supabase espera un array para el insert
        .select(); // Esto le dice a Supabase que nos devuelva el registro recién creado
}

/**
 * Actualiza un activo existente en Supabase.
 * @async
 * @param {string|number} id - El ID del activo a actualizar.
 * @param {Object} activoData - Los nuevos datos.
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
async function updateActivo(id, activoData) {
    return await supabase
        .from('activos')
        .update(activoData)
        .eq('id', id)
        .select();
}

/**
 * Elimina un activo de Supabase.
 * @async
 * @param {string|number} id - El ID del activo a eliminar.
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
async function deleteActivo(id) {
    return await supabase
        .from('activos')
        .delete()
        .eq('id', id);
}

/**
 * Consulta la base de datos y obtiene una lista de activos filtrados por nivel de riesgo.
 * * @async
 * @function getActivosByRiesgo
 * @param {string} nivelRiesgo - El nivel de riesgo deseado para filtrar los activos (ej. "Bajo", "Medio", "Alto").
 * @returns {Promise<{data: Array<Object>|null, error: Object|null}>} Promesa que resuelve con un objeto de Supabase que contiene el array de activos encontrados o el error de la consulta.
 */
async function getActivosByRiesgo(nivelRiesgo) {
    return await supabase
        .from('activos')
        .select('*')
        .eq('riesgo', nivelRiesgo); // Filtra: "Dame solo los de riesgo Alto/Medio/Bajo"
}

module.exports = {
    getAllActivos,
    createActivo,
    updateActivo,
    deleteActivo,
    getActivosByRiesgo
};

