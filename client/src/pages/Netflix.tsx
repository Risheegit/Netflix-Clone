import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { getGenres, fetchMovies } from "../store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState, AppDispatch } from "../store";
import Slider from "../components/Slider";
import { NetflixContainer as Container } from "../globalStyles";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector(
    (state: RootState) => state.netflix.genresLoaded
  );
  const movies = useSelector((state: RootState) => state.netflix.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie logo" />
          </div>
          <div className="buttons flex">
            <button
              className="a-center j-center flex"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="a-center j-center flex">
              <AiOutlineInfoCircle /> More info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

export default Netflix;
