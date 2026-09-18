const { esTextoValido } = require('../utils/helpers.js');
const incidencias = [];
let nextId = 1;

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
        id: nextId++,
        empleado,
        area,
        descripcion,
        prioridad,
        estado: 'Pendiente'
    };
    incidencias.push(nuevaIncidencia);
    res.status(201).json({ "mensaje": "Incidencia registrada correctamente" });
};

const obtenerIncidencias = (req, res) => {
    res.status(200).json(incidencias);
}

const obtenerIncidenciaPorId = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'ID de incidencia no válido' });
        }

        const incidencia = incidencias.find((incidencia) => incidencia.id === id);

        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }

        res.status(200).json(incidencia);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la incidencia' });
    }
};

const cambiarEstadoIncidencia = (req, res) => {
    try {
        const id = Number(req.params.id);
        const { estado } = req.body;

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'ID de incidencia no válido' });
        }

        const incidencia = incidencias.find((incidencia) => incidencia.id === id);

        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }

        switch (estado) {
            case 'Pendiente':
            case 'En Proceso':
            case 'Resuelta':
            case 'Cancelada':
                incidencia.estado = estado;
                return res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
            default:
                return res.status(400).json({ error: 'Estado no válido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el estado de la incidencia' });
    }
};

const eliminarIncidencia = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'ID de incidencia no válido' });
        }

        const indice = incidencias.findIndex((incidencia) => incidencia.id === id);

        if (indice === -1) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }

        incidencias.splice(indice, 1);
        res.status(200).json({ mensaje: 'Incidencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la incidencia' });
    }
};

const obtenerEstadisticas = (req, res) => {
    try {
        res.status(200).json({
            totalIncidencias: incidencias.length,
            pendientes: incidencias.filter((incidencia) => incidencia.estado === 'Pendiente').length,
            enProceso: incidencias.filter((incidencia) => incidencia.estado === 'En Proceso').length,
            resueltas: incidencias.filter((incidencia) => incidencia.estado === 'Resuelta').length,
            canceladas: incidencias.filter((incidencia) => incidencia.estado === 'Cancelada').length
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
};

const obtenerClasificacion = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'ID de incidencia no válido' });
        }

        const incidencia = incidencias.find((incidencia) => incidencia.id === id);

        if (!incidencia) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }

        switch (incidencia.prioridad) {
            case 'Alta':
                return res.status(200).json({ id: incidencia.id, clasificacion: 'Crítica' });
            case 'Media':
                return res.status(200).json({ id: incidencia.id, clasificacion: 'Importante' });
            case 'Baja':
                return res.status(200).json({ id: incidencia.id, clasificacion: 'Normal' });
            default:
                return res.status(400).json({ error: 'Prioridad no válida' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al clasificar la incidencia' });
    }
};

module.exports = {
    registrarIncidencia,
    obtenerIncidencias,
    obtenerIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion,
    incidencias
};
