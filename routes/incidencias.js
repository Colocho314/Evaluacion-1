const express = require('express');
const router = express.Router();

const {
    registrarIncidencia,
    obtenerIncidencias,
    obtenerIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
} = require('../controllers/incidenciasController.js');

router.post('/', registrarIncidencia);
router.get('/', obtenerIncidencias);
router.get('/estadisticas', obtenerEstadisticas);
router.get('/:id/clasificacion', obtenerClasificacion);
router.get('/:id', obtenerIncidenciaPorId);
router.put('/:id/estado', cambiarEstadoIncidencia);
router.delete('/:id', eliminarIncidencia);

module.exports = router;
