const { validationResult } = require('express-validator');
const ReportsService = require('../services/reportsService.cjs');

class ReportsController {
    constructor() {
        this.reportsService = new ReportsService();
    }

    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Errores de validación:", errors.array());
            return false;
        }
        return true;
    }

    async getReports(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const reports = await this.reportsService.getReports();
            res.status(200).json(reports);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getReportById(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const report = await this.reportsService.getReportById(req.params.id);
            res.status(200).json(report);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createReport(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const report = await this.reportsService.createReport(req.body, req?.session?.passport?.user);
            res.status(201).json(report);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateReport(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const report = await this.reportsService.updateReport(req.params.id, req.body);
            res.status(200).json(report);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteReport(req, res) {
        try {
            if (!this.validateRequest(req)) {
                return res.status(400).json({ errors: errors.array() });
            }
            const report = await this.reportsService.deleteReport(req.params.id);
            res.status(204).json(report);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = ReportsController;
