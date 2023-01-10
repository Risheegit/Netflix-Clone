import React, { useState } from "react";
import { AppDispatch, IMovieArray } from "../store";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { removeMovieFromLiked } from "../store/index";
import { useDispatch } from "react-redux";
import { CardContainer as Container } from "../globalStyles";

interface ICardProps {
  movieData: IMovieArray;
  index: number;
  key: number;
  isLiked?: boolean;
}

interface IEMail {
  email: {
    required: boolean;
    type: string;
    unique: boolean;
    max: number;
  };
}

export default React.memo(function Card(props: ICardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState<string | null>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    console.log("Add button clicked");
    try {
      await axios.post("http://localhost:5000/api/user/add", null, {
        params: {
          email,
          data: props.movieData,
        },
      });
      console.log("Reached end of try");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${props.movieData.image}`}
        alt="Movie image"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${props.movieData.image}`}
              alt="Movie image"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay
              muted
              loop
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {props.movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="like" />
                <RiThumbDownFill title="dislike" />
                {props.isLiked ? (
                  <BsCheck
                    title="Remove from list"
                    onClick={() => {
                      dispatch(
                        removeMovieFromLiked({
                          movieId: props.movieData.id,
                          email,
                        })
                      );
                    }}
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {props.movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});
