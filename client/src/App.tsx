import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/myList" element={<UserListedMovies />} />
        <Route path="/" element={<Netflix />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
