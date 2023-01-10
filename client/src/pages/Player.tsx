import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";
import { PlayerContainer as Container } from "../globalStyles";

function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay controls loop muted />
      </div>
    </Container>
  );
}

export default Player;
