import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/villages';

const villageService = {
  getAllVillageByDistrictId: async (districtId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${districtId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllVillages: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default villageService;
