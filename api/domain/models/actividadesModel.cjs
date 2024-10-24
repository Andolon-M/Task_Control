const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");

class Actividades {
    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('actividades');

        const res = await collection.find().toArray();
        return res;
    }

    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('actividades');
        const res = await collection.findOne({ _id: new ObjectId(id) });
        return res;
    }

    async findByUsuarioId(usuarioId) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('actividades');
        const res = await collection.find({ usuario_fk: new ObjectId(usuarioId) }).toArray();
        return res;
    }

    async insert(actividadData) {
        try {
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('actividades');
            const res = await collection.insertOne(actividadData);
            return res;
        } catch (error) {
            // Manejar errores de validación del esquema, si existe
            console.error("Error al insertar actividad:", error);
            throw error; // Propagar el error para que se maneje en la capa superior
        }
    }

    async findByIdAndUpdate(id, updateData) {
        try {
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('actividades');
            const res = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            return res;
        } catch (error) {
            // Manejar errores de validación del esquema, si existe
            console.error("Error al actualizar actividad:", error);
            throw error; // Propagar el error para que se maneje en la capa superior
        }
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('actividades');
        const res = await collection.deleteOne({ _id: new ObjectId(id) });
        return res;
    }

    async find(find) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('actividades');
        const res = await collection.find(find).toArray();
        return res;
    }

    async findLabelsByActivity(idActivity) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('actividades');
        const res = await collection.aggregate(
            [

                {
                    $match: {
                        _id: new ObjectId(idActivity)
                    }
                },
                {
                    $project: {
                        etiquetas: 1
                    }
                }


            ]
        ).toArray();
        return res;
    }
}

module.exports = Actividades;