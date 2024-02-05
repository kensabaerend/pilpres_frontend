// authService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/users';

const userService = {
  createNewUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  },

  editUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${userId}`, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  deleteSelectedUsers: async (userIds) => {
    try {
      const response = await axios.post(`${BASE_URL}/deleteUsers`, userIds, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default userService;
