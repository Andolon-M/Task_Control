const Recordatorios = require('../models/recordatoriosModel.cjs'); // Asegúrate de que la ruta sea correcta

class RemindersRepository {
    async getAll() {
        try {
            const recordatorios = new Recordatorios();
            return await recordatorios.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener los recordatorios'}));
        }
    }

    async getById(id) {
        try {
            const recordatorios = new Recordatorios();
            return await recordatorios.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener el recordatorio'}));
        }
    }

    async save(recordatorioData) {
        try {
            const recordatorios = new Recordatorios();
            return await recordatorios.insert(recordatorioData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error al guardar el recordatorio'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const recordatorios = new Recordatorios();
            return await recordatorios.findByIdAndUpdate(id, updateData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error al actualizar el recordatorio'}));
        }
    }

    async deleteById(id) {
        try {
            const recordatorios = new Recordatorios();
            return await recordatorios.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error al eliminar el recordatorio'}));
        }
    }

    async findByActivityId(actividadId) {
        try {
            const recordatorios = new Recordatorios();
            return await recordatorios.findByActividadId(actividadId);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener los recordatorios de la actividad'}));
        }
    }
}

module.exports = RemindersRepository;