import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const baseUrlImage = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  // snippet of code which runs based on specific condition
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // Always set dependent variable in below so that useEffect can refresh everytime its value changes.
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* poster */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row__poster"
            src={`${baseUrlImage}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {/** containers : poster */}
    </div>
  );
}

export default Row;
