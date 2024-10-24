const ActividadesRepository = require('../../domain/repositories/activitiesRepository.cjs');
const UserRepository = require("../../domain/repositories/usuariosRepository.cjs");

class ActivitiesService {
    constructor() {
        this.actividadesRepository = new ActividadesRepository();
        this.userRepository = new UserRepository();
    }

    async getActividades() {
        const actividades = await this.actividadesRepository.getAll();
        if (!actividades) {
            throw new Error(JSON.stringify({status: 404, message: 'Actividades no encontradas'}));
        }
        return actividades;
    }

    async getActividadById(id) {
        const actividad = await this.actividadesRepository.getById(id);
        if (!actividad) {
            throw new Error(JSON.stringify({status: 404, message: 'Actividad no encontrada'}));
        }
        return actividad;
    }

    async createActividad(data, userId) {
        
        //consultar el id del usuario autenticado en la sesion
        if (!userId)return {message: "usuario no encontrado"}
        const user = await this.userRepository.getById(userId);
        data.usuario_fk = user?._id,
        data.estado = 'pendiente'
        data.fecha_de_creacion = new Date()
        return await this.actividadesRepository.save(data);
    }

    async updateActividad(id, data) {
        const updatedActividad = await this.actividadesRepository.updateById(id, data);
        if (!updatedActividad) {
            throw new Error(JSON.stringify({status: 404, message: 'Actividad no encontrada o no se pudo actualizar'}));
        }
        return updatedActividad;
    }

    async deleteActividad(id) {
        const deletedActividad = await this.actividadesRepository.deleteById(id);
        if (!deletedActividad) {
            throw new Error(JSON.stringify({status: 404, message: 'Actividad no encontrada o no se pudo eliminar'}));
        }
        return deletedActividad;
    }

    async getActividadesByUsuarioId(usuarioId) {
        try {
            const actividades = await this.actividadesRepository.findByUsuarioId(usuarioId);
            return actividades;
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error al obtener las actividades del usuario'}));
        }
    }
}

module.exports = ActivitiesService;