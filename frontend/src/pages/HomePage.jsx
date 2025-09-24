import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCinemas } from "../services/api"; // Import your API function

const HomePage = () => {
  
  const [cinemas, setCinemas] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const data = await getAllCinemas();
        setCinemas(data);
      } catch (error) {
        console.error("Failed to fetch cinemas");
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []); 

  if (loading) {
    return <p className="text-center text-gray-500">Loading cinemas...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Select a Cinema</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cinemas.map((cinema) => (
          <Link
            key={cinema._id}
            to={`/cinema/${cinema._id}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {cinema.name}
            </h5>
            <p className="font-normal text-gray-700">{cinema.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
