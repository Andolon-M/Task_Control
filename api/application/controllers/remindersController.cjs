const { validationResult } = require('express-validator');
const RemindersService = require('../services/remindersService.cjs');

class RemindersController {
    constructor() {
        this.remindersService = new RemindersService();
    }

    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Validation errors:", errors.array());
            return false;
        }
        return true;
    }

    async getReminders(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reminders = await this.remindersService.getReminders();
            res.status(200).json(reminders);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getReminderById(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reminder = await this.remindersService.getReminderById(req.params.id);
            res.status(200).json(reminder);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createReminder(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reminder = await this.remindersService.createReminder(req.body, req?.session?.passport?.user);
            res.status(201).json(reminder);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateReminder(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reminder = await this.remindersService.updateReminder(req.params.id, req.body);
            res.status(200).json(reminder);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteReminder(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reminder = await this.remindersService.deleteReminder(req.params.id);
            res.status(204).json(reminder);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getRemindersByActivityId(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reminders = await this.remindersService.getRemindersByActivityId(req.params.activityId);
            res.json(reminders);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = RemindersController;
