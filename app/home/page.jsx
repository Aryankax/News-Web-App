'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { collection, getDocs, addDoc} from 'firebase/firestore';

import { db } from '../firebase/config';

const NewsReader = () => {
    const [news, setNews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [description, setDescription] = useState([]);

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
          description: articles.description
        });
        console.log('Document written with ID: ', docRef.id);
        getFavs(); 
      } catch (e) {
        console.error('Error adding document to the DB: ', e);
      }
    };

    const refreshPage = () => {
        window.location.reload();
    }
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to "News Read"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <div key={article.title} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-400">{article.description}</p>
            <button
              onClick={() => addToFavorites(article)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">Favorites</h2>
  <button onClick={refreshPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Refresh</button>
  {favorites.map((title, index) => (
    <div key={index} className="bg-gray-800 p-4 rounded mb-4">
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      <p className="text-gray-400">{description[index]}</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default NewsReader;
