const express = require('express');
const GoalsController = require('../controllers/goalsController.cjs');

const router = express.Router();
const goalsController = new GoalsController();

// Obtener todos los objetivos
router.get('/', (req, res) => goalsController.getGoals(req, res));

// Obtener un objetivo por su ID
router.get('/:id', (req, res) => goalsController.getGoalById(req, res));

// Obtener objetivos por ID de usuario
router.get('/user/:userId', (req, res) => goalsController.getGoalsByUserId(req, res));

// Crear un nuevo objetivo
router.post('/', (req, res) => goalsController.createGoal(req, res));

// Actualizar un objetivo por su ID
router.put('/:id', (req, res) => goalsController.updateGoal(req, res));

// Eliminar un objetivo por su ID
router.delete('/:id', (req, res) => goalsController.deleteGoal(req, res));

module.exports = router;
