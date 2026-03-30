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
    return await activosDao.getAllActivos();
};

/**
 * Crea un nuevo activo pasando los datos al DAO.
 * @async
 * @param {Object} activoData - Los datos del activo recibidos del cliente.
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
exports.addActivo = async (activoData) => {
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

/**
 * Calcula la proyección de inversión basada en el perfil de riesgo conectando con Supabase.
 * @async
 * @param {number} capital - Dinero inicial invertido.
 * @param {number} beneficioEsperado - Dinero extra que se quiere ganar.
 * @param {string} riesgo - "Bajo", "Medio" o "Alto".
 * @returns {Promise<Object>} JSON con el tiempo estimado y los datos para la gráfica.
 */
exports.calcularProyeccion = async (capital, beneficioEsperado, riesgo) => {
    
    // 1. Pedimos a la BD todos los activos que coincidan con el riesgo elegido
    const { data: activosDb, error } = await activosDao.getActivosByRiesgo(riesgo);
    
    if (error || !activosDb || activosDb.length === 0) {
        throw new Error(`No hay activos guardados en la base de datos para el riesgo: ${riesgo}`);
    }

    // 2. Calculamos la media real sumando todos los valores y dividiendo
    let sumaRentabilidad = 0;
    let sumaDrawdown = 0;

    activosDb.forEach(activo => {
        // Red de seguridad: si la columna está vacía, usamos 0 para que no dé error NaN
        const rentabilidadActivo = activo.rentabilidad || 0; 
        const drawdownActivo = activo.drawdown || 0;

        sumaRentabilidad += rentabilidadActivo; 
        sumaDrawdown += drawdownActivo; 
    });

    const rentabilidadMediaReal = sumaRentabilidad / activosDb.length;
    const drawdownMedioReal = sumaDrawdown / activosDb.length;

    // 3. Aplicamos la matemática con los datos reales extraídos
    const objetivoTotal = capital + beneficioEsperado;
    let capitalActual = capital;
    let año = 0;
    const datosGrafica = [{ año: 0, valor: capital }];

    while (capitalActual < objetivoTotal && año < 50) {
        año++;
        capitalActual = capitalActual * (1 + rentabilidadMediaReal);

        if (año % 3 === 0) {
            capitalActual = capitalActual * (1 + drawdownMedioReal);
        }

        datosGrafica.push({ 
            año: año, 
            valor: parseFloat(capitalActual.toFixed(2)) 
        });
    }

    // 4. Empaquetamos todo listo para el Frontend
    return {
        parametros: { capitalInicial: capital, objetivo: objetivoTotal, riesgoElegido: riesgo },
        resultados: {
            añosEstimados: año,
            rentabilidadMediaAplicada: `${(rentabilidadMediaReal * 100).toFixed(2)}%`,
            peorCaidaEstimada: `${(drawdownMedioReal * 100).toFixed(2)}%`
        },
        historicoGrafica: datosGrafica
    };
};