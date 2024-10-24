const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");
class Usuarios {

    async findAll() {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');

        const res = await collection.find().toArray();
        return res;
    }

    async findByObjectId(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const [res] = await collection.find({ _id: id }).toArray();
        return res;
    }

    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const [res] = await collection.find({ id: id }).toArray();
        return res;
    }

    async findByUserName(UserName) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const [res] = await collection.find({nombre_usuario: UserName}).toArray();
        return res;
    }

    async insert(userData) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.insertOne(userData);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }

    async findByIdAndUpdateForm(id, updateData, upsert) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.updateOne({ id: id }, { $set: updateData }, upsert);
        return res;
    }

    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

    async aggregate(dataUser) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        const res = await collection.aggregate(dataUser).toArray();
        return res;
    }

    /**
     * Busca usuarios utilizando una consulta específica.
     * @param {string} query - La consulta para buscar usuarios.
     * @returns {Promise<Array>} - Una promesa que se resuelve con un array de usuarios encontrados.
     */
   

    async updateOne(query, updateData, options = {}) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('usuarios');
        try {
            const res = await collection.updateOne(query, updateData, options);
            return res;
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating user' }));
        }
    }

   

}

module.exports = Usuarios;