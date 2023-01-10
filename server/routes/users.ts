import express from "express";
import {
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies,
} from "../controllers/users";

const router = express.Router();

router.get("/liked/:email", getLikedMovies);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);

export default router;
