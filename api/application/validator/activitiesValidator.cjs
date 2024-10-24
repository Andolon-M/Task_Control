const { body, param } = require('express-validator');

class ActivitiesValidator {
    validateActivityId() {
        return [
            param('id').isMongoId().withMessage('ID de actividad inválido')
        ];
    }

    validateActivityData() {
        return [
            body('usuario_fk').isMongoId().withMessage('ID de usuario inválido'),
            body('titulo').notEmpty().withMessage('El título es obligatorio'),
            body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
            body('estado').isIn(['pendiente', 'en curso', 'completada']).withMessage('Estado inválido'),
            body('prioridad').isIn(['baja', 'media', 'alta']).withMessage('Prioridad inválida'),
            // ... otras validaciones para los campos de la actividad ...
        ];
    }

    validateActivityUpdateDataById() {
        return [
            param('id').isMongoId().withMessage('ID de actividad inválido'),
            // ... validaciones para los campos que se pueden actualizar ...
        ];
    }

    validateUserId() {
        return [
            param('userId').isMongoId().withMessage('ID de usuario inválido')
        ];
    }
}

module.exports = ActivitiesValidator;