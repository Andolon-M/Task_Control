const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");

class Recordatorios { // Cambiar nombre de la clase a Recordatorios
    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
        const res = await collection.find().toArray();
        return res;
    }

    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
        const res = await collection.findOne({ _id: new ObjectId(id) });
        return res;
    }

    async findByActividadId(actividadId) { // Cambiar a findByActividadId
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
        const res = await collection.find({ actividades_fk: new ObjectId(actividadId) }).toArray(); // Cambiar a actividades_fk
        return res;
    }

    async insert(recordatorioData) { // Cambiar nombre del parámetro
        try {
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
            const res = await collection.insertOne(recordatorioData); // Cambiar nombre del parámetro
            return res;
        } catch (error) {
            console.error("Error al insertar recordatorio:", error); // Cambiar mensaje de error
            throw error; 
        }
    }

    async findByIdAndUpdate(id, updateData) {
        try {
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
            const res = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            return res;
        } catch (error) {
            console.error("Error al actualizar recordatorio:", error); // Cambiar mensaje de error
            throw error;
        }
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
        const res = await collection.deleteOne({ _id: new ObjectId(id) });
        return res;
    }

    async find(find) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('recordatorios'); // Cambiar a colección 'recordatorios'
        const res = await collection.find(find).toArray();
        return res;
    }
}

module.exports = Recordatorios; //Cambiar nombre de la clase a Recordatorios