'use client'
import { useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { useRouter } from "next/navigation";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push('/sign-in');
    } catch(e) {
        console.error(e);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-800 to-blue-400 text-white">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <p className="text-white">Already have an account?</p>
          <button
            onClick={()=>{
                router.push('/sign-in')
            }}
            className="text-blue-500 hover:underline focus:outline-none focus:shadow-outline-blue"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
