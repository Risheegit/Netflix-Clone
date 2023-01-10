//const User = require("../models/UserModel");
import UserModel from "../models/UserModel";
import Express from "express";
import { IMovieArray } from "../../client/src/store";

export const getLikedMovies = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

interface IAddLiked {
  email: string;
  data: IMovieArray;
}

export const addToLikedMovies = async (
  req: Express.Request,
  res: Express.Response
) => {
  console.log("Reached controller");
  try {
    const { email } = req.query;
    const { data }: any = req.query;
    console.log(data);
    console.log(email);
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data?.id);
      if (!movieAlreadyLiked) {
        await UserModel.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await UserModel.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

export const removeFromLikedMovies = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const { email, movieId } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await UserModel.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};
