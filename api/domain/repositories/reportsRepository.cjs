const Reports = require('../models/reportesModel.cjs');

class ReportsRepository {
    async getAll() {
        try {
            const reports = new Reports();
            return await reports.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener los reportes'}));
        }
    }

    async getById(id) {
        try {
            const reports = new Reports();
            return await reports.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener el reporte'}));
        }
    }

    async save(reportData) {
        try {
            const reports = new Reports();
            return await reports.insert(reportData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error al guardar el reporte'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const reports = new Reports();
            return await reports.findByIdAndUpdate(id, updateData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error al actualizar el reporte'}));
        }
    }

    async deleteById(id) {
        try {
            const reports = new Reports();
            return await reports.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error al eliminar el reporte'}));
        }
    }
}

module.exports = ReportsRepository;
