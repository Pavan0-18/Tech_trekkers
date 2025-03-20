import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-indigo-50 to-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-indigo-200 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 tracking-tight animate-fade-in-down">
          Welcome to the Learning Platform
        </h1>
        <p className="text-gray-700 text-lg mb-8">Are you a student or an instructor?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Student</h2>
            <button
              onClick={() => navigate('/student/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-full hover:from-teal-600 hover:to-teal-800 transition-all duration-300 shadow-lg font-semibold mb-3"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/student/signup')}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-full hover:from-teal-500 hover:to-teal-700 transition-all duration-300 shadow-md font-semibold"
            >
              Sign Up
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Instructor</h2>
            <button
              onClick={() => navigate('/instructor/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 shadow-lg font-semibold mb-3"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/instructor/signup')}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-full hover:from-indigo-500 hover:to-indigo-700 transition-all duration-300 shadow-md font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;