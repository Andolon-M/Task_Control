const ActividadesRepository = require('../../domain/repositories/actividadesRepository.cjs');

class ActivitiesService {
    constructor() {
        this.actividadesRepository = new ActividadesRepository();
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

    async createActividad(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
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