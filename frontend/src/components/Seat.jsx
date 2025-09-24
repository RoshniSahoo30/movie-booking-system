import React from "react";

const Seat = ({ seatNumber, status, onClick }) => {
  const getSeatColor = () => {
    switch (status) {
      case "booked":
        return "bg-gray-500 cursor-not-allowed";
      case "selected":
        return "bg-green-500";
      case "available":
      default:
        return "bg-gray-200 hover:bg-gray-300";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`w-8 h-8 m-1 flex justify-center items-center rounded cursor-pointer ${getSeatColor()}`}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
