const express = require('express');
const RemindersController = require('../controllers/remindersController.cjs');

const router = express.Router();
const remindersController = new RemindersController();

// Obtener todos los recordatorios
router.get('/', (req, res) => remindersController.getReminders(req, res));

// Obtener un recordatorio por su ID
router.get('/:id', (req, res) => remindersController.getReminderById(req, res));

// Obtener recordatorios por ID de actividad
router.get('/activity/:activityId', (req, res) => remindersController.getRemindersByActivityId(req, res));

// Crear un nuevo recordatorio
router.post('/', (req, res) => remindersController.createReminder(req, res));

// Actualizar un recordatorio por su ID
router.put('/:id', (req, res) => remindersController.updateReminder(req, res));

// Eliminar un recordatorio por su ID
router.delete('/:id', (req, res) => remindersController.deleteReminder(req, res));

module.exports = router;
