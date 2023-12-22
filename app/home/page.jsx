'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsReader = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

    fetchNews();
  }, []);

  const addToFavorites = (article) => {
    // Check if the article is already in favorites
    if (!favorites.find((fav) => fav.title === article.title)) {
      const newFavorites = [...favorites, article];
      setFavorites(newFavorites);
      // Save to local storage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

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
        {favorites.map((fav) => (
          <div key={fav.title} className="mb-4">
            <h3 className="text-lg font-semibold">{fav.title}</h3>
            <p className="text-gray-400">{fav.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsReader;
