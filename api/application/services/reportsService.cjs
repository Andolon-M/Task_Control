const ReportsRepository = require('../../domain/repositories/reportsRepository.cjs');
const UserRepository = require("../../domain/repositories/usuariosRepository.cjs");

class ReportsService {
    constructor() {
        this.reportsRepository = new ReportsRepository();
        this.userRepository = new UserRepository();
    }

    async getReports() {
        const reports = await this.reportsRepository.getAll();
        if (!reports) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reportes no encontrados' }));
        }
        return reports;
    }

    async getReportById(id) {
        const report = await this.reportsRepository.getById(id);
        if (!report) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reporte no encontrado' }));
        }
        return report;
    }

    async createReport(data, userId) {
        if (!userId) return { message: "Usuario no encontrado" };
        const user = await this.userRepository.getById(userId);
        //hay que caulcular las actividades y objetivos entre la fecha de inicio y de fin que se envie en data

        data.usuario_fk = user?._id;  // Asignar el usuario desde la sesión
        data.actividades_completadas = "no se ha calculado aun";
        data.objetivos_completados = "no se ha calculado aun";
        
        return await this.reportsRepository.save(data);
    }

    async updateReport(id, data) {
        const updatedReport = await this.reportsRepository.updateById(id, data);
        if (!updatedReport) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reporte no encontrado o no se pudo actualizar' }));
        }
        return updatedReport;
    }

    async deleteReport(id) {
        const deletedReport = await this.reportsRepository.deleteById(id);
        if (!deletedReport) {
            throw new Error(JSON.stringify({ status: 404, message: 'Reporte no encontrado o no se pudo eliminar' }));
        }
        return deletedReport;
    }
}

module.exports = ReportsService;
