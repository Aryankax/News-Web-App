'use client'
import React, { useState } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    // Implement sign out logic
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-4xl font-extrabold mb-4">Welcome</h2>
        {user ? (
          <div>
            <p className="text-lg mb-4">Hello, {user}!</p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p className="text-lg mb-4">Explore and enjoy our app!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
