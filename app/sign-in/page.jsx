'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSignUp = () => {
    // Implement your sign-up logic or redirect to the sign-up page
    router.push('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
        <form onSubmit={handleSignIn}>
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
              className="mt-1 p-2 w-full text-gray-800 bg-gray-300 rounded-md"
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
              className="mt-1 p-2 w-full text-gray-800 bg-gray-300 rounded-md"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={()=> {
                router.push('/sign-up')
              }}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
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
