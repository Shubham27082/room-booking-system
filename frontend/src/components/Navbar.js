import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-white text-xl font-bold">Room Booking</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/my-bookings" 
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  My Bookings
                </Link>
                <span className="text-blue-100 text-sm hidden sm:block">
                  Hello, {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
