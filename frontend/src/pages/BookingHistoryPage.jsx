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
    return <p className="text-white/80">Loading your bookings...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 heading-gradient">My Booking History</h1>
      {bookings.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-white/60 text-slate-700 flex items-center justify-center">☕</div>
          <p className="text-slate-700">No bookings yet. Find a cinema and book your first show!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="card p-5">
              <h2 className="text-xl font-bold text-slate-900">{booking.show.movie.title}</h2>
              <p className="text-slate-600">{new Date(booking.show.startTime).toLocaleString()}</p>
              <p className="text-slate-800 mt-2">
                Seats: <span className="font-semibold">{booking.seats.join(", ")}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistoryPage;
