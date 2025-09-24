import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShowDetails, createBooking } from "../services/api";
import Seat from "../components/Seat";
import { useAuth } from "../context/AuthContext";

const SeatSelectionPage = () => {
  const { user } = useAuth();
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await getShowDetails(showId);
        setShow(data);
      } catch (error) {
        console.error("Failed to fetch show details");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [showId]);

  const handleSeatClick = (seatNumber) => {
    // Prevent clicking on booked seats
    if (show.bookedSeats.includes(seatNumber)) {
      return;
    }

    // Logic to select/deselect seats
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      // Enforce max 6 seats
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert("You can select a maximum of 6 seats.");
      }
    }
  };

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to proceed with booking.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Replace this with the actual user ID you copied
    const userId =user.id;

    const bookingData = {
      user: userId,
      show: showId,
      seats: selectedSeats,
    };

    try {
      await createBooking(bookingData);
      // On success, navigate to the confirmation page
      navigate("/confirmation");
    } catch (error) {
      alert("Failed to create booking. Please try again.");
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading seat map...</p>;
  }
  if (!show) {
    return <p>Show not found.</p>;
  }

  // Generate the 10x10 grid
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{show.movie.title}</h1>
      <p className="text-lg text-gray-600 mb-6">
        {show.screen.cinema.name} | {new Date(show.startTime).toLocaleString()}
      </p>

      <div className="flex flex-col items-center">
        <div className="p-4 border-2 border-dashed rounded-lg">
          {rows.map((row) => (
            <div key={row} className="flex">
              {cols.map((col) => {
                const seatNumber = `${row}${col}`;
                let status = "available";
                if (show.bookedSeats.includes(seatNumber)) {
                  status = "booked";
                } else if (selectedSeats.includes(seatNumber)) {
                  status = "selected";
                }

                return (
                  <Seat
                    key={seatNumber}
                    seatNumber={seatNumber}
                    status={status}
                    onClick={() => handleSeatClick(seatNumber)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="w-full text-center p-2 my-2 bg-gray-300 text-gray-800 rounded">
          SCREEN
        </div>
        <button
          onClick={handleBooking}
          className="mt-6 bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 text-xl disabled:bg-gray-400"
          disabled={selectedSeats.length === 0}
        >
          Pay & Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
