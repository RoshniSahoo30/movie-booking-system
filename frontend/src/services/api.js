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

export const getShowDetails = async (showId) => {
  try {
    const response = await api.get(`/shows/${showId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for show ${showId}:`, error);
    throw error;
  }
};



export const createBooking = async (bookingData) => {
  try {
    
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};


export const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data; // This will be { token: "..." }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  export const getUserBookings = async (userId) => {
    try {
      const response = await api.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      throw error;
    }
  };


export default api;
