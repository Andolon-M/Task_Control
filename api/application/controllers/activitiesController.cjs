const { validationResult } = require('express-validator');
const ActividadesService = require('../services/activitiesService.cjs');

class ActivitiesController {
    constructor() {
        this.activitiesService = new ActividadesService();
    }

    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Puedes registrar los errores aquí si lo deseas
            console.error("Errores de validación:", errors.array()); 
            return false;
        }
        return true;
    }

    async getActivities(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const activities = await this.activitiesService.getActivities();
            res.status(200).json(activities);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getActivityById(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const activity = await this.activitiesService.getActividadById(req.params.id);
            res.status(200).json(activity);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createActivity(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const activity = await this.activitiesService.createActividad(req.body, req?.session?.passport?.user);
            res.status(201).json(activity);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateActivity(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const activity = await this.activitiesService.updateActividad(req.params.id, req.body);
            res.status(200).json(activity);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteActivity(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const activity = await this.activitiesService.deleteActividad(req.params.id);
            res.status(204).json(activity); 
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getActivitiesByUserId(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const activities = await this.activitiesService.getActividadesByUsuarioId(req.params.userId);
            res.json(activities);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = ActivitiesController;