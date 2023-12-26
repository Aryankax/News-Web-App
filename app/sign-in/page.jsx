'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

import { setPersistence, browserSessionPersistence, getAuth } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const auth1 = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (res === undefined) {
        setErrorMessage('Wrong credentials. Please try again.');
      } else {
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');
        router.push('/home');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const persistSession = async () => {
    try {
      await setPersistence(auth1, browserSessionPersistence);
    } catch (error) {
      console.error('Error setting session persistence:', error);
    }
  };

  persistSession();

  const handleSignUp = () => {
    router.push('/sign-up');
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-800 to-blue-400 text-white">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md shadow-md transition-transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Sign In
        </h2>
        <form onSubmit={handleSignIn} className="animate__animated animate__fadeIn animate__delay-2s">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full text-gray-800 bg-gray-300 rounded-md transition-all duration-300 focus:outline-none focus:shadow-outline-blue"
              onChange={handleEmailChange}
              value={email}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full text-gray-800 bg-gray-300 rounded-md transition-all duration-300 focus:outline-none focus:shadow-outline-blue"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green transition duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
