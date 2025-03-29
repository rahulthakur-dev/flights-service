class AirplaneService {
    constructor(airplaneRepository) {
        this.airplaneRepository = airplaneRepository;
    }

    async createAirplane(data) {
        try {
            return await this.airplaneRepository.create(data);
        } catch (error) { 
            throw error;
        }
    }

    async deleteAirplane(id) {
        try {
            return await this.airplaneRepository.destroy(id);
        } catch (error) {
            throw error;
        }
    }

    async getAirplane(id) {
        try {
            return await this.airplaneRepository.get(id);
        } catch (error) {
            throw error;
        }
    }

    async getAllAirplanes() {
        try {
            return await this.airplaneRepository.getAll();
        } catch (error) {
            throw error;
        }
    }

    async updateAirplane(id, data) {
        try {
            return await this.airplaneRepository.update(id, data);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AirplaneService;