import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCinemas } from "../services/api"; 

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
    return <p className="text-center text-white/80">Loading cinemas...</p>;
  }

  return (
    <div>
      <section className="hero mb-8 text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">MoviesBook</h1>
        <p className="text-white/80 max-w-2xl">Discover movies, pick your seats, and book instantly. A simple, elegant experience for your next showtime.</p>
      </section>
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 heading-gradient">Select a Cinema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cinemas.map((cinema) => (
          <Link
            key={cinema._id}
            to={`/cinema/${cinema._id}`}
            className="card block p-6 hover:shadow-xl hover:-translate-y-0.5 transition-transform"
          >
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">
              {cinema.name}
            </h5>
            <p className="font-normal text-slate-600">{cinema.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
