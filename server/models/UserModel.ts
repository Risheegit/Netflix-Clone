import { Schema, model } from "mongoose";
import { IMovieArray } from "../../client/src/store";

interface IUser {
  email: string;
  likedMovies: IMovieArray[];
}

const userSchema = new Schema<IUser>({
  email: {
    required: true,
    type: String,
    unique: true,
    max: 50,
  },
  likedMovies: Array,
});

const UserModel = model<IUser>("UserModel", userSchema);

export default UserModel;
