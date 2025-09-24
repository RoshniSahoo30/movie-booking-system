import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // 
  headers: {
    "Content-Type": "application/json",
  },
});


export const getAllCinemas = async () => {
  try {
    const response = await api.get("/cinemas");
    return response.data;
  } catch (error) {
    console.error("Error fetching cinemas:", error);
    throw error;
  }
};



export const getShowsByCinema = async (cinemaId) => {
  try {
    const response = await api.get(`/shows/cinema/${cinemaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shows for cinema ${cinemaId}:`, error);
    throw error;
  }
};


export default api;
