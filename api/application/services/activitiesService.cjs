const { ObjectId } = require('mongodb');
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
            throw new Error(JSON.stringify({ status: 404, message: 'Actividades no encontradas' }));
        }
        return actividades;
    }

    async getActividadById(id) {
        const actividad = await this.actividadesRepository.getById(id);
        if (!actividad) {
            throw new Error(JSON.stringify({ status: 404, message: 'Actividad no encontrada' }));
        }
        return actividad;
    }

    async createActividad(data, userId) {

        //consultar el id del usuario autenticado en la sesion
        if (!userId) return { message: "usuario no encontrado" }
        const user = await this.userRepository.getById(userId);
        data.usuario_fk = user?._id;
        data.estado = 'pendiente';
        data.etiquetas = [];
        data.fecha_de_creacion = new Date()
        return await this.actividadesRepository.save(data);
    }

    async updateActividad(id, data) {
        const updatedActividad = await this.actividadesRepository.updateById(id, data);
        if (!updatedActividad) {
            throw new Error(JSON.stringify({ status: 404, message: 'Actividad no encontrada o no se pudo actualizar' }));
        }
        return updatedActividad;
    }

    async deleteActividad(id) {
        const deletedActividad = await this.actividadesRepository.deleteById(id);
        if (!deletedActividad) {
            throw new Error(JSON.stringify({ status: 404, message: 'Actividad no encontrada o no se pudo eliminar' }));
        }
        return deletedActividad;
    }

    async getActividadesByUsuarioId(usuarioId) {
        try {
            const actividades = await this.actividadesRepository.findByUsuarioId(usuarioId);
            return actividades;
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error al obtener las actividades del usuario' }));
        }
    }

    async addLabelToActivity(data, userId) {
        console.log(data);

        const idActivity = data.idActivity
        const label = data.label
        if (!idActivity || !label) return { message: "Datos no válidos" }

        const activity = await this.actividadesRepository.getById(idActivity)
        if (!activity) return { message: "No se encontro la actividad" }


        // Consultar el ID del usuario autenticado en la sesión
        if (!userId) return { message: "Usuario no encontrado" }
        const user = await this.userRepository.getById(userId);
        console.log(user);

        // Verificar si la actividad pertenece al usuario autenticado
        if (!activity?.usuario_fk.equals(user?._id)) return { message: 'La actividad no corresponde al usuario' }

        // Verificar si la etiqueta ya existe en el array de etiquetas de la actividad
        if (activity?.etiquetas && activity.etiquetas.some(etiqueta => etiqueta.nombre === label)) {
            return { message: 'La etiqueta ya existe en la actividad' }
        }

        // Si la etiqueta no existe, agregarla al array de etiquetas
        activity.etiquetas.push({ id: new ObjectId(), nombre: label });

        // Actualizar la actividad en la base de datos
        const updatedActivity = await this.actividadesRepository.updateById(idActivity, activity);

        if (!updatedActivity) {
            return { message: 'Error al actualizar la actividad' }
        }

        return { message: 'Etiqueta agregada correctamente' }
    }

    async getLabelsOfActivity(idActivity, userId) {

        const actividad = await this.actividadesRepository.getLabelsOfActivity(idActivity);
        if (!actividad) {
            throw new Error(JSON.stringify({ status: 404, message: 'Actividad no encontrada' }));
        }
        return actividad;

    }
}

module.exports = ActivitiesService;