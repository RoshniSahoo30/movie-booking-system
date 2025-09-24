import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/0 border-b border-white/10 text-white">
      <div className="container mx-auto h-16 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight heading-gradient">
          MoviesBook
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link to="/" className="hidden sm:inline-flex btn-ghost px-3 py-2">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/history" className="btn-ghost px-3 py-2">
                My Bookings
              </Link>
              <button onClick={handleLogout} className="btn-primary px-4 py-2">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary px-4 py-2">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
