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

/**
 * Calcula la proyección de inversión basada en el perfil de riesgo.
 * @param {number} capital - Dinero inicial invertido.
 * @param {number} beneficioEsperado - Dinero extra que se quiere ganar.
 * @param {string} riesgo - "Bajo", "Medio" o "Alto".
 * @returns {Object} JSON con el tiempo estimado y los datos para la gráfica.
 */
exports.calcularProyeccion = (capital, beneficioEsperado, riesgo) => {
    // 1. Definimos el comportamiento histórico de nuestros 3 grupos (MVP)
    const metricasRiesgo = {
        "Bajo":  { rentabilidadAnual: 0.04, drawdownMaximo: -0.02 }, // Gana un 4%, cae máximo un 2%
        "Medio": { rentabilidadAnual: 0.08, drawdownMaximo: -0.10 }, // Gana un 8%, cae un 10%
        "Alto":  { rentabilidadAnual: 0.15, drawdownMaximo: -0.25 }  // Gana un 15%, pero puede caer un 25%
    };

    const perfil = metricasRiesgo[riesgo];
    if (!perfil) throw new Error("Nivel de riesgo no válido");

    const objetivoTotal = capital + beneficioEsperado;
    let capitalActual = capital;
    let año = 0;
    
    // Aquí guardaremos los puntos exactos para pintar la gráfica
    const datosGrafica = [{ año: 0, valor: capital }];

    // 2. Simulamos el paso del tiempo hasta alcanzar el objetivo
    // Le ponemos un límite de 50 años para que el servidor no se quede pillado en un bucle infinito
    while (capitalActual < objetivoTotal && año < 50) {
        año++;
        
        // Aplicamos la rentabilidad de ese año
        capitalActual = capitalActual * (1 + perfil.rentabilidadAnual);

        // Simulamos un Drawdown (caída del mercado) cada 3 años para darle realismo a la gráfica
        if (año % 3 === 0) {
            capitalActual = capitalActual * (1 + perfil.drawdownMaximo);
        }

        // Guardamos el punto exacto de este año para la gráfica
        datosGrafica.push({ 
            año: año, 
            valor: parseFloat(capitalActual.toFixed(2)) // Redondeamos a 2 decimales
        });
    }

    // 3. Empaquetamos todo listo para el Frontend
    return {
        parametros: { capitalInicial: capital, objetivo: objetivoTotal, riesgoElegido: riesgo },
        resultados: {
            añosEstimados: año,
            mensaje: `Alcanzarás tu objetivo en aproximadamente ${año} años asumiendo un riesgo ${riesgo}.`,
            rentabilidadMediaAplicada: `${perfil.rentabilidadAnual * 100}%`,
            peorCaidaEstimada: `${perfil.drawdownMaximo * 100}%`
        },
        historicoGrafica: datosGrafica // <--- ESTO ES LO QUE MARCOS NECESITA
    };
};