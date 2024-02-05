// authService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/auth';

const authService = {
  signupAdmin: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  loginUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  logoutUser: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default authService;
