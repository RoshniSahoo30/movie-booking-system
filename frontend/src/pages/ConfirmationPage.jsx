import React from "react";
import { Link } from "react-router-dom";

const ConfirmationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Booking Confirmed!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Thank you for your booking. We've sent a confirmation to your email (not
        really!).
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ConfirmationPage;
