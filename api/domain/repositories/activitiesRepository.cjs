const Actividades = require('../models/actividadesModel.cjs'); 

class ActivitiesRepository {
    async getAll() {
        try {
            const actividades = new Actividades();
            return await actividades.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener las actividades'}));
        }
    }

    async getById(id) {
        try {
            const actividades = new Actividades();
            return await actividades.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener la actividad'}));
        }
    }

    async save(actividadData) {
        try {
            const actividades = new Actividades();
            return await actividades.insert(actividadData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error al guardar la actividad'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const actividades = new Actividades();
            return await actividades.findByIdAndUpdate(id, updateData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error al actualizar la actividad'}));
        }
    }

    async deleteById(id) {
        try {
            const actividades = new Actividades();
            return await actividades.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error al eliminar la actividad'}));
        }
    }

    async findByUsuarioId(usuarioId) {
        try {
            const actividades = new Actividades();
            return await actividades.findByUsuarioId(usuarioId);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener las actividades del usuario'}));
        }
    }
}

module.exports = ActivitiesRepository;