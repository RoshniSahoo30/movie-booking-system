import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing the pages 
import HomePage from "./pages/HomePage";
import CinemaPage from "./pages/CinemaPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cinema/:cinemaId" element={<CinemaPage />} />
          <Route path="/show/:showId" element={<SeatSelectionPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/history" element={<BookingHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


