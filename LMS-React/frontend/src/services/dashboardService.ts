import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/dashboard/`;

export const fetchDashboardData = async (accessToken: string) => {
  const response = await axios.get(`${API_BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const fetchOverdueBorrowers = async (accessToken: string) => {
  const response = await axios.get(`${API_BASE_URL}GetOverdueBorrowers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};