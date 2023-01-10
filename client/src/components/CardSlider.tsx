import React, { useState, useRef } from "react";
import { IMovieArray } from "../store";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import styled from "styled-components";
import { CardSliderContainer as Container } from "../globalStyles";

interface ICardSliderProps {
  title: string;
  data: IMovieArray[];
}

export default React.memo(function CardSlider(props: ICardSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  // const listRef = useRef();
  const divRef = React.useRef<HTMLDivElement>(null);

  const handleDirection = (direction: string) => {
    if (divRef.current) {
      let distance = divRef.current.getBoundingClientRect().x - 70;
      if (direction === "left" && sliderPosition > 0) {
        divRef.current.style.transform = `translateX(${230 + distance}px)`;
        setSliderPosition(sliderPosition - 1);
      }
      if (direction === "right" && sliderPosition < 4) {
        divRef.current.style.transform = `translateX(${-230 + distance}px)`;
        setSliderPosition(sliderPosition + 1);
      }
    }
  };

  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{props.title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="flex slider" ref={divRef}>
          {/* <div className="flex slider"> */}
          {props.data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});
