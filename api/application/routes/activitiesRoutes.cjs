const express = require('express');
const ActivitiesController = require('../controllers/activitiesController.cjs');

const router = express.Router();
const activitiesController = new ActivitiesController();

// Obtener todas las actividades
router.get('/', (req, res) => activitiesController.getActivities(req, res));

// Obtener una actividad por su ID
router.get('/:id', (req, res) => activitiesController.getActivityById(req, res));

// Obtener actividades por ID de usuario
router.get('/user/:userId',  (req, res) => activitiesController.getActivitiesByUserId(req, res));

// Crear una nueva actividad
router.post('/', (req, res) => activitiesController.createActivity(req, res));

router.post('/etiquetas/', (req, res) => activitiesController.addLabelToActivity(req, res));

router.post('/:idActivity/etiquetas/:label', (req, res) => activitiesController.addLabelToActivity(req, res));

router.get('/:idActivity/etiquetas/', (req, res) => activitiesController.getLabelsOfActivity(req, res));

// Actualizar una actividad por su ID
router.put('/:id', (req, res) => activitiesController.updateActivity(req, res));

// Eliminar una actividad por su ID
router.delete('/:id', (req, res) => activitiesController.deleteActivity(req, res));


module.exports = router;