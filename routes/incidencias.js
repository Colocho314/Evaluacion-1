const express = require('express');
const router = express.Router();

const {
    registrarIncidencia
}=require('../controllers/incidenciasController.js');

router.post('/', registrarIncidencia);

module.exports = router;