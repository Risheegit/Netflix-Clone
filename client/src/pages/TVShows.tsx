import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, fetchMovies, getGenres, RootState } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { TVShowsContainer as Container } from "../globalStyles";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state: RootState) => state.netflix.movies);
  const genres = useSelector((state: RootState) => state.netflix.genres);
  const genresLoaded = useSelector(
    (state: RootState) => state.netflix.genresLoaded
  );
  //const dataLoading = useSelector((state : RootState) => state.netflix.dataLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  //   useEffect(() => {
  //     if (genresLoaded) {
  //       dispatch(fetchMovies({ genres, type: "tv" }));
  //     }
  //   }, [genresLoaded]);

  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) setUser(currentUser.uid);
    // else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

export default TVShows;
