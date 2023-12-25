'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

import { getAuth, signOut } from 'firebase/auth';

import { useRouter } from 'next/navigation';

import { db } from '../firebase/config';

const NewsReader = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [description, setDescription] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=ff5e984f28eb40b39f29dde71b64e34f'
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    const getFavs = async () => {
      try {
        const getFavDocs = await getDocs(collection(db, 'favs'));
        const favTitles = getFavDocs.docs.map((doc) => doc.data().title);
        const favDescription = getFavDocs.docs.map((doc) => doc.data().description);
        setFavorites(favTitles);
        setDescription(favDescription);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchNews();
    getFavs();
  }, []);

  const addToFavorites = async (articles) => {
    try {
      const docRef = await addDoc(collection(db, 'favs'), {
        title: articles.title,
        description: articles.description,
      });
      console.log('Document written with ID: ', docRef.id);
      getFavs();
    } catch (e) {
      console.error('Error adding document to the DB: ', e);
    }
  };

  const removeFromFavorites = async (title) => {
    try {
      const favDocs = await getDocs(collection(db, 'favs'));
      const docToDelete = favDocs.docs.find((doc)=> doc.data().title === title);
      if(docToDelete){
        await deleteDoc(doc(db, "title", docToDelete.id))
      }
      
    } catch (error) {
      console.error('Error removing document from favorites:', error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Signout done")
      router.push('/sign-in')
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
        <div className="bg-gray-800 text-white min-h-screen p-8">
        <div className="flex justify-end">
        <button onClick={handleLogout} className="text-blue-500 hover:text-blue-300 focus:outline-none transition duration-300 text-lg">
        Logout
        </button>
      </div>
      <h1 className="text-5xl font-bold mb-2 text-white animate-pulse">Welcome to "News Read" 📰📖</h1>
      <p className="text-gray-400 mb-8 translate-x-5 text-xl">
        Your source for the latest and trending news articles.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <div key={article.title} className="bg-gray-700 p-6 rounded-lg transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-white">{article.title}</h2>
            <p className="text-gray-400 mb-4">{article.description}</p>
            <button
              onClick={() => addToFavorites(article)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
            >
              Add to Favourites
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h1 className="text-5xl font-bold mb-4 text-white">Favourites</h1>
        <button
          onClick={refreshPage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue mb-4"
        >
          Refresh
        </button>
        {favorites.map((title, index) => (
          <div key={title} className="bg-gray-700 p-6 rounded-lg mb-4 transform transition-transform hover:scale-101 transition-color hover:bg-gray-600">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <button
                onClick={() => removeFromFavorites(title)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-red"
                >
                Remove
              </button>
            </div>
            <p className="text-gray-400">{description[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsReader;
