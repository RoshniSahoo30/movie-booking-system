import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/api";

const BookingHistoryPage = () => {
  const { user } = useAuth(); 
  console.log("User object from context:", user);// Get the logged-in user from context
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (user) {
        console.log("Fetching bookings for user ID:", user.id);
      const fetchBookings = async () => {
        try {
          const data = await getUserBookings(user.id);
          setBookings(data);
        } catch (error) {
          console.error("Failed to fetch bookings");
          console.log(error)
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [user]);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Booking History</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 bg-white border rounded-lg shadow"
            >
              <h2 className="text-xl font-bold">{booking.show.movie.title}</h2>
              <p className="text-gray-600">
                {new Date(booking.show.startTime).toLocaleString()}
              </p>
              <p className="text-gray-800 mt-2">
                Seats:{" "}
                <span className="font-semibold">
                  {booking.seats.join(", ")}
                </span>
              </p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistoryPage;
