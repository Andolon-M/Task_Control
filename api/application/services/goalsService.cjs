const GoalsRepository = require('../../domain/repositories/goalsRepository.cjs');
const UserRepository = require("../../domain/repositories/usuariosRepository.cjs");

class GoalsService {
    constructor() {
        this.goalsRepository = new GoalsRepository();
        this.userRepository = new UserRepository();
    }

    async getGoals() {
        const goals = await this.goalsRepository.getAll();
        if (!goals) {
            throw new Error(JSON.stringify({ status: 404, message: 'Objetivos no encontrados' }));
        }
        return goals;
    }

    async getGoalById(id) {
        const goal = await this.goalsRepository.getById(id);
        if (!goal) {
            throw new Error(JSON.stringify({ status: 404, message: 'Objetivo no encontrado' }));
        }
        return goal;
    }

    async createGoal(data, userId) {
        if (!userId) return { message: "Usuario no encontrado" };

        const user = await this.userRepository.getById(userId);
        data.usuario_fk = user?._id;
        data.estado = 'pendiente';
        data.fecha_de_creacion = new Date();

        return await this.goalsRepository.save(data);
    }

    async updateGoal(id, data) {
        const updatedGoal = await this.goalsRepository.updateById(id, data);
        if (!updatedGoal) {
            throw new Error(JSON.stringify({ status: 404, message: 'Objetivo no encontrado o no se pudo actualizar' }));
        }
        return updatedGoal;
    }

    async deleteGoal(id) {
        const deletedGoal = await this.goalsRepository.deleteById(id);
        if (!deletedGoal) {
            throw new Error(JSON.stringify({ status: 404, message: 'Objetivo no encontrado o no se pudo eliminar' }));
        }
        return deletedGoal;
    }

    async getGoalsByUserId(userId) {
        try {
            const goals = await this.goalsRepository.findByUserId(userId);
            return goals;
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error al obtener los objetivos del usuario' }));
        }
    }
}

module.exports = GoalsService;
