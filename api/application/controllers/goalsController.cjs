const { validationResult } = require('express-validator');
const GoalsService = require('../services/goalsService.cjs');

class GoalsController {
    constructor() {
        this.goalsService = new GoalsService();
    }

    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Errores de validación:", errors.array());
            return false;
        }
        return true;
    }

    async getGoals(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const goals = await this.goalsService.getGoals();
            res.status(200).json(goals);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getGoalById(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const goal = await this.goalsService.getGoalById(req.params.id);
            res.status(200).json(goal);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createGoal(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const goal = await this.goalsService.createGoal(req.body, req?.session?.passport?.user);
            res.status(201).json(goal);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateGoal(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const goal = await this.goalsService.updateGoal(req.params.id, req.body);
            res.status(200).json(goal);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteGoal(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const goal = await this.goalsService.deleteGoal(req.params.id);
            res.status(204).json(goal);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getGoalsByUserId(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const goals = await this.goalsService.getGoalsByUserId(req.params.userId);
            res.json(goals);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = GoalsController;
