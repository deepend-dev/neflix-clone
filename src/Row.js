import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "react-modal";
import "./Row.css";

const baseUrlImage = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  const opts = {
    // height: "390",
    // width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          // Below snippet find out value of v in : https://www.youtube.com/watch?v=XtMThy8QKqU&t=10520s
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
    openModal();
  };

  Modal.setAppElement("#root");

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* poster */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            /** For large poster on trending now and smaller but bigger width poster on all others. We apply extra class for bigger poster*/
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrlImage}${
              /** For large poster on trending now and smaller but bigger width poster on all others */
              /** ? is for if statement */
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.name || movie?.title || movie?.original_name}
          />
        ))}
      </div>
      {trailerUrl && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          centered
          className="modal__pop"
        >
          <YouTube videoId={trailerUrl} opts={opts} />
        </Modal>
      )}
    </div>
  );
}

export default Row;
