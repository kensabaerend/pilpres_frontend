// historyService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/history';
const historyService = {
  getAllHistoryByTps: async (tpsId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${tpsId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default historyService;
