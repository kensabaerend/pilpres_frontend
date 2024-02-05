// tpsService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/tps';

const tpsService = {
  fillBallots: async (tpsId, validBallots) => {
    try {
      const response = await axios.post(`${BASE_URL}/fill/${tpsId}`, validBallots, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllTpsRekap: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllTpsByVillageId: async (villageId) => {
    try {
      const response = await axios.get(`${BASE_URL}/village/${villageId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllTpsByDistrictId: async (districtId) => {
    try {
      const response = await axios.get(`${BASE_URL}/district/${districtId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getTpsById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default tpsService;
