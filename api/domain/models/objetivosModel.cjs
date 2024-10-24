const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");

class Objetivos {
    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('objetivos');
        const res = await collection.find().toArray();
        return res;
    }

    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('objetivos');
        const res = await collection.findOne({ _id: new ObjectId(id) });
        return res;
    }

    async findByUserId(userId) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('objetivos');
        const res = await collection.find({ usuario_fk: new ObjectId(userId) }).toArray();
        return res;
    }

    async insert(goalData) {
        try {
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('objetivos');
            const res = await collection.insertOne(goalData);
            return res;
        } catch (error) {
            console.error("Error al insertar objetivo:", error);
            throw error;
        }
    }

    async findByIdAndUpdate(id, updateData) {
        try {
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('objetivos');
            const res = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            return res;
        } catch (error) {
            console.error("Error al actualizar objetivo:", error);
            throw error;
        }
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('objetivos');
        const res = await collection.deleteOne({ _id: new ObjectId(id) });
        return res;
    }
}

module.exports = Objetivos;
