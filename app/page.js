'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-4xl font-extrabold mb-4">Welcome</h2>
        <p className="text-lg mb-4">Explore and enjoy our app!</p>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={()=> {
            router.push('/sign-in')
          }}>
            Login
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          onClick={()=>{
            router.push('/sign-up')
          }}>
            Create a User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;









