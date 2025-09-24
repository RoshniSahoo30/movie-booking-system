import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowsByCinema } from "../services/api";

const CinemaPage = () => {
  const { cinemaId } = useParams(); // Gets cinemaId from the URL
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedShows, setGroupedShows] = useState({});

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShowsByCinema(cinemaId);
        setShows(data);
        
        const grouped = data.reduce((acc, show) => {
          const movieTitle = show.movie.title;
          if (!acc[movieTitle]) {
            acc[movieTitle] = [];
          }
          acc[movieTitle].push(show);
          return acc;
        }, {});
        setGroupedShows(grouped);
      } catch (error) {
        console.error("Failed to fetch shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [cinemaId]); 

  if (loading) {
    return <p className="text-white/80">Loading shows...</p>;
  }

  return (
    <div>
      <div className="hero mb-8 text-white">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-2">Now Showing</h1>
        <p className="text-white/80">Choose a showtime to continue to seat selection.</p>
      </div>
      <div className="space-y-8">
        {Object.keys(groupedShows).map((movieTitle) => (
          <div key={movieTitle} className="card p-5">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">{movieTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {groupedShows[movieTitle].map((show) => (
                <Link
                  key={show._id}
                  to={`/show/${show._id}`}
                  className="chip font-medium"
                >
                  {new Date(show.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaPage;
