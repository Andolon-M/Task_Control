const express = require('express');
const ActivitiesController = require('../controllers/activitiesController.cjs');
const ActivitiesValidator = require('../validator/activitiesValidator.cjs'); // Asegúrate de tener este validador

const router = express.Router();
const activitiesController = new ActivitiesController();
const activitiesValidator = new ActivitiesValidator(); // Crea una instancia del validador

// Obtener todas las actividades
router.get('/', (req, res) => activitiesController.getActivities(req, res));

// Obtener una actividad por su ID
router.get('/:id', activitiesValidator.validateActivityId(), (req, res) => activitiesController.getActivityById(req, res));

// Obtener actividades por ID de usuario
router.get('/user/:userId', activitiesValidator.validateUserId(), (req, res) => activitiesController.getActivitiesByUserId(req, res));

// Crear una nueva actividad
router.post('/', activitiesValidator.validateActivityData(), (req, res) => activitiesController.createActivity(req, res));

// Actualizar una actividad por su ID
router.put('/:id', activitiesValidator.validateActivityUpdateDataById(), (req, res) => activitiesController.updateActivity(req, res));

// Eliminar una actividad por su ID
router.delete('/:id', activitiesValidator.validateActivityId(), (req, res) => activitiesController.deleteActivity(req, res));


module.exports = router;