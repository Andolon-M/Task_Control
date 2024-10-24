const Goals = require('../models/objetivosModel.cjs');

class GoalsRepository {
    async getAll() {
        try {
            const goals = new Goals();
            return await goals.findAll();
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error al obtener los objetivos' }));
        }
    }

    async getById(id) {
        try {
            const goals = new Goals();
            return await goals.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error al obtener el objetivo' }));
        }
    }

    async save(goalData) {
        try {
            const goals = new Goals();
            return await goals.insert(goalData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error al guardar el objetivo' }));
        }
    }

    async updateById(id, updateData) {
        try {
            const goals = new Goals();
            return await goals.findByIdAndUpdate(id, updateData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error al actualizar el objetivo' }));
        }
    }

    async deleteById(id) {
        try {
            const goals = new Goals();
            return await goals.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error al eliminar el objetivo' }));
        }
    }

    async findByUserId(userId) {
        try {
            const goals = new Goals();
            return await goals.findByUserId(userId);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error al obtener los objetivos del usuario' }));
        }
    }
}

module.exports = GoalsRepository;
