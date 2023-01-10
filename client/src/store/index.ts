import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

interface IMovieState {
  //Replaced state of movies string[] with IMovie[]
  movies: IMovieArray[];
  genresLoaded: boolean;
  genres: IGenreList[];
}

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  title: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
} as IMovieState;

export interface IGenreList {
  id: number;
  name: string;
}

export interface IMovieArray {
  id: number;
  name: string;
  image: string;
  genres: string[];
}

interface IRemoveLikedProps {
  email: string | null;
  movieId: number;
}

export const getGenres = createAsyncThunk("netflix-genres/", async () => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const genres: IGenreList[] = [];
  const { genres: genreObjects } = data;
  genreObjects.map((genreItem: IGenreList) => {
    genres.push(genreItem);
  });
  return genres;
});

const createArrayFromRawData = (
  array: IMovie[],
  moviesArray: IMovieArray[],
  genres: IGenreList[]
) => {
  array.forEach((movie) => {
    const movieGenres: string[] = [];
    //We dont have genre in the list
    movie.genre_ids.forEach((genre) => {
      const name = genres.find((id) => id.id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (
  api: string,
  genres: IGenreList[],
  paging: boolean = false
) => {
  const moviesArray: IMovieArray[] = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const { data } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    const { results } = data;
    createArrayFromRawData(results, moviesArray, genres);
  }
  // const { data } = await axios.get(
  //   `${TMDB_BASE_URL}/trending/all/week?api_key=${API_KEY}`
  // );
  //data.results is of type IMovie[]
  return moviesArray;
};

interface IType {
  type: string;
}

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }: IType, thunkApi) => {
    //Replace all with type
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`
    );
    const { results } = data;
    const { netflix }: any = thunkApi.getState();
    const { genres } = netflix;
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

interface IGenreObject {
  genres?: unknown;
  genre: unknown;
  type: string;
}
export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }: IGenreObject, thunkAPI) => {
    const { netflix }: any = thunkAPI.getState();
    const { genres } = netflix;
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email: string) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }: IRemoveLikedProps) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);
// return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`)

const NetfilxSlice = createSlice({
  name: "Netflix",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    }),
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      }),
      builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      }),
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      }),
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetfilxSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async (type: Mediatype, thunkApi) => {
//     // const {
//     //   netflix: { genres },
//     // } = thunkApi.getState();
//     console.log(thunkApi.getState());
//     const data = getRawData(
//       `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
//       genres,
//       true
//     );
//     console.log(data);
//   }
// );
