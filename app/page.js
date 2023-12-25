'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-800 to-blue-400 text-white">
      <div className="max-w-md w-full p-14 bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-4 animate-bounce">Welcome 🗞️🎉</h2>
        <p className="text-lg mb-4 animate__animated animate__fadeIn animate__delay-2s">
          Read latest news and enjoy our website!
        </p>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition duration-300 transform hover:scale-105"
            onClick={() => {
              router.push('/sign-in');
            }}
          >
            Login
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green transition duration-300 transform hover:scale-105"
            onClick={() => {
              router.push('/sign-up');
            }}
          >
            Create a User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;









