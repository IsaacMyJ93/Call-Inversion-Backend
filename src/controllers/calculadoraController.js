const activosService = require('../services/activosService');

exports.calcular = async (req, res) => {
    try {
        const { capital, beneficioEsperado, riesgo } = req.body;

        if (!capital || !beneficioEsperado || !riesgo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const resultado = await activosService.calcularProyeccion(capital, beneficioEsperado, riesgo);
        
        res.json(resultado);

    } catch (error) {
       
        console.error("Error en la calculadora:", error.message);
        res.status(500).json({ error: error.message });
    }
};