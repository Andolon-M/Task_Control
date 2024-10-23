// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const { ObjectId } = require("mongodb");
const RequestRepository = require("../../domain/repositories/requestsRepository.cjs");

class RequestService {
  constructor() {
    this.requestRepository = new RequestRepository();
  }

  async getRequests() {
    const request = await this.requestRepository.getAll();
    if (!request) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Request not found" })
      );
    }
    return request;
  }

  async getRequestById(id) {
    const request = await this.requestRepository.getById(id);
    if (!request) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Request not found" })
      );
    }
    return request;
  }

  async getRequestsByUserId(id) {
    const request = await this.requestRepository.getRequestsByUserId(id);
    if (!request) {
      throw new Error(
        JSON.stringify({ status: 404, message: "Request not found" })
      );
    }
    return request;
  }
  async createRequest(usuarioId, carrito, aPagar, cuponCode) {
  }

  async updateRequest(id, data) {
    const updatedRequest = await this.requestRepository.updateById(id, data);
    if (!updatedRequest) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "Request not found or could not be updated",
        })
      );
    }
    return updatedRequest;
  }

  async deleteRequest(id) {
    const deletedRequest = await this.requestRepository.deleteById(id);
    if (!deletedRequest) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: "Request not found or could not be deleted",
        })
      );
    }
    return deletedRequest;
  }

  async searchRequestsByName(name) {
    return await this.requestRepository.searchByName(name);
  }
}

module.exports = RequestService;
