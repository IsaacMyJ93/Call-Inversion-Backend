const activosService = require('../services/activosService');

exports.calcular = (req, res) => {
    try {
        // 1. Recogemos los datos que nos envían Thunder Client (o React) en el Body
        const { capital, beneficioEsperado, riesgo } = req.body;

        // 2. Pequeña validación de seguridad (MVP)
        if (!capital || !beneficioEsperado || !riesgo) {
            return res.status(400).json({ error: "Faltan datos obligatorios: capital, Beneficio Esperado o riesgo" });
        }

        // 3. Le pasamos los datos a la capa de Servicios ( motor matemático)
        const resultado = activosService.calcularProyeccion(capital, beneficioEsperado, riesgo);

        // 4. Devolvemos el JSON de éxito
        res.json(resultado);

    } catch (error) {
        console.error("Error en la calculadora:", error.message);
        res.status(500).json({ error: error.message });
    }
};