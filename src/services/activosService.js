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

    
    // 2. Calculamos los pesos (Ponderación Inversa al Riesgo) y las medias reales
    let sumaInversos = 0;

    // Paso A: Calcular el inverso del riesgo (drawdown) de cada activo
    activosDb.forEach(activo => {
        // Usamos Math.abs para quitar el negativo. Si es 0, usamos 0.01 para no dividir por cero
        const dd = Math.abs(activo.drawdown || 0.01);
        activo.inversoDrawdown = 1 / dd;
        sumaInversos += activo.inversoDrawdown;
    });

    let rentabilidadMediaReal = 0;
    let drawdownMedioReal = 0;

    // Paso B: Asignar el porcentaje de dinero a cada activo y calcular la media global
    const carteraRecomendada = activosDb.map(activo => {
        const peso = activo.inversoDrawdown / sumaInversos; // Nos da un porcentaje de 0 a 1

        // Sumamos a la media global la parte proporcional de este activo
        rentabilidadMediaReal += (activo.rentabilidad || 0) * peso;
        drawdownMedioReal += (activo.drawdown || 0) * peso;

        // Calculamos el dinero exacto que toca poner en este activo
        const dineroAsignado = capital * peso;

        return {
            simbolo: activo.simbolo,
            nombre: activo.nombre,
            rentabilidadAsignada: `${((activo.rentabilidad || 0) * 100).toFixed(2)}%`,
            pesoCartera: `${(peso * 100).toFixed(2)}%`,
            capitalAsignado: `${dineroAsignado.toFixed(2)} €`
        };
    });

    // 3. Aplicamos la matemática de proyección con las medias ponderadas
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

    // 4. Empaquetado todo listo para el Frontend
    return {
        parametros: { capitalInicial: capital, objetivo: objetivoTotal, riesgoElegido: riesgo },
        resultados: {
            añosEstimados: año,
            rentabilidadMediaAplicada: `${(rentabilidadMediaReal * 100).toFixed(2)}%`,
            peorCaidaEstimada: `${(drawdownMedioReal * 100).toFixed(2)}%`
        },
        cartera: carteraRecomendada, 
        historicoGrafica: datosGrafica
    };
};