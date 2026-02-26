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

module.exports = {
    getAllActivos,
};
