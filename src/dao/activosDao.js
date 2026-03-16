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

module.exports = {
    getAllActivos,
    createActivo,
    updateActivo,
    deleteActivo
};

