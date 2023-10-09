import React from "react";
import {useState, useEffect } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// a86597c1

const API_URL = "http://www.omdbapi.com?apikey=a86597c1";

// const movie1 = {
//     "Title": "The Fast and the Furious: Tokyo Drift",
//     "Year": "2006",
//     "imdbID": "tt0463985",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg"
// }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value) }
        />

        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm) } />
      </div>

      {
        movies?.length > 0
        ? (
            <div className="container">
                {movies.map( (movie)=> (
                    <MovieCard movie = {movie}/>
                ))}
            </div>
        ) : (
            <div className="empty">
                <h1>No movies found</h1>
            </div>
        )
      }
    </div>
  );
};

export default App;
