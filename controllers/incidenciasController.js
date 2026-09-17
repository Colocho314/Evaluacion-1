const { esTextoValido } = require('../utils/helpers.js');
const incidencias = [];

const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;
    if (!esTextoValido(empleado) ||
        !esTextoValido(area) || !esTextoValido(descripcion) || !esTextoValido(prioridad)) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    };
    if (prioridad !== 'Alta' && prioridad !== 'Media' && prioridad !== 'Baja') {
        return res.status(400).json({ error: 'La prioridad debe ser Alta, Media o Baja' });
    };
    const nuevaIncidencia = {
        id: incidencias.length + 1,
        empleado,
        area,
        descripcion,
        prioridad,
        estado: 'Pendiente'
    };
    incidencias.push(nuevaIncidencia);
    res.status(201).json({ "mensaje": "Incidencia registrada correctamente" });
};

module.exports = {
    registrarIncidencia,
    incidencias
};