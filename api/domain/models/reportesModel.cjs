const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");

class Reports {
    async findAll() {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('reports');
        const res = await collection.find().toArray();
        return res;
    }

    async findById(id) {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('reports');
        const res = await collection.findOne({ _id: new ObjectId(id) });
        return res;
    }

    async insert(reportData) {
        try {
            const obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('reports');
            const res = await collection.insertOne(reportData);
            return res;
        } catch (error) {
            console.error("Error al insertar reporte:", error);
            throw error;
        }
    }

    async findByIdAndUpdate(id, updateData) {
        try {
            const obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('reports');
            const res = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            return res;
        } catch (error) {
            console.error("Error al actualizar reporte:", error);
            throw error;
        }
    }

    async findByIdAndDelete(id) {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('reports');
        const res = await collection.deleteOne({ _id: new ObjectId(id) });
        return res;
    }

    async find(find) {
        const obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('reports');
        const res = await collection.find(find).toArray();
        return res;
    }
}

module.exports = Reports;
