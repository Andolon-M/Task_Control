const express = require('express');
const ReportsController = require('../controllers/reportsController.cjs');

const router = express.Router();
const reportsController = new ReportsController();

// Obtener todos los reportes
router.get('/', (req, res) => reportsController.getReports(req, res));

// Obtener un reporte por su ID
router.get('/:id', (req, res) => reportsController.getReportById(req, res));

// Crear un nuevo reporte
router.post('/', (req, res) => reportsController.createReport(req, res));

// Actualizar un reporte por su ID
router.put('/:id', (req, res) => reportsController.updateReport(req, res));

// Eliminar un reporte por su ID
router.delete('/:id', (req, res) => reportsController.deleteReport(req, res));

module.exports = router;
