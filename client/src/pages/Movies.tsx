import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { getGenres, fetchMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";
import NotAvailable from "../components/NotAvailable";
import { MovieContainer as Container } from "../globalStyles";

interface ICurrentUser {
  accessToken?: string;
  auth?: unknown;
  displayName?: null;
  email?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  metadata?: unknown;
  phoneNumber?: null;
  photoURL?: null;
  proactiveRefresh?: unknown;
  providerData?: unknown;
  providerId?: string;
  reloadListener?: null;
  reloadUserInfo?: unknown;
  stsTokenManager?: unknown;
  tenantId?: null;
  uid?: string;
}
function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genres = useSelector((state: RootState) => state.netflix.genres);
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

  const [user, setUser] = useState<any | null>(null);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    console.log(currentUser);
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

export default Movies;
