const express = require('express');
const router = express.Router();

const {
    registrarIncidencia,
    obtenerIncidencias
}=require('../controllers/incidenciasController.js');

router.post('/', registrarIncidencia);
router.get('/', obtenerIncidencias);

module.exports = router;