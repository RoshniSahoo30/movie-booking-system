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
    return <p>Loading shows...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      <div className="space-y-8">
        {Object.keys(groupedShows).map((movieTitle) => (
          <div key={movieTitle}>
            <h2 className="text-2xl font-semibold mb-4">{movieTitle}</h2>
            <div className="flex flex-wrap gap-4">
              {groupedShows[movieTitle].map((show) => (
                <Link
                  key={show._id}
                  to={`/show/${show._id}`}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
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
