import React from "react";
import { Link } from "react-router-dom";

const ConfirmationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16">
      <div className="card p-8 max-w-lg w-full">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-green-500/15 text-green-600 flex items-center justify-center">
          ✓
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 heading-gradient">
          Booking Confirmed!
        </h1>
        <p className="text-base text-slate-700 mb-8">
          Thank you for your booking. A confirmation has been sent to your email.
        </p>
        <Link to="/" className="btn-primary px-5 py-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
