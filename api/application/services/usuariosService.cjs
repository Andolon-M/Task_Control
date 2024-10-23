// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const UserRepository = require("../../domain/repositories/usuariosRepository.cjs");
const { ObjectId } = require("mongodb");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Método para obtener todos los usuarios
  async getUsers() {
    const user = await this.userRepository.getAll(); // Llama al método del repositorio para obtener todos los usuarios
    // Si no se encuentran usuarios, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      ); // Lanza un error 404 si no hay usuarios
    }
    return user; // Devuelve la lista de usuarios
  }

  async getUserByObjectId(id) {
    const user = await this.userRepository.getByObjectId(id);
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      );
    }
    return user;
  }

  async getUserById(id) {
    const user = await this.userRepository.getById(id); // Llama al repositorio para obtener el usuario por ID
    // Si no se encuentra el usuario, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      );
    }
    return user; // Devuelve el usuario encontrado
  }

  // Método para obtener un usuario por su correo electrónico
  async getUserbyUserName(UserName) {
    const user = await this.userRepository.getByUserName(UserName); // Llama al repositorio para obtener el usuario por email
    // Si no se encuentra el usuario, lanza un error
    if (!user) {
      throw new Error(
        JSON.stringify({ status: 404, message: "User not found" })
      );
    }
    return user; // Devuelve el usuario encontrado
  }

  // Método para crear un nuevo usuario
  async createUser(data) {
  
    return await this.userRepository.save(data); 
  }

  async updateUser(id, data) {
    const updatedUser = await this.userRepository.updateById(id, data); 
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be updated",
        })
      ); 
    }
    return updatedUser; 
  }

  async updateUserForm(id, data) {
    const updatedUser = await this.userRepository.updateUserIdForm(id, data); 
    if (!updatedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be updated",
        })
      ); 
    }
    return updatedUser; 
  }

  // Método para eliminar un usuario por ID
  async deleteUser(id) {
    const deletedUser = await this.userRepository.deleteById(id); 
    if (!deletedUser) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "User not found or could not be deleted",
        })
      ); 
    }
    return deletedUser; 
  }

}

module.exports = UserService; // Exporta la clase UserService para su uso en otros módulos
