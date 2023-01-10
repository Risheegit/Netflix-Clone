import React from "react";
import styled from "styled-components";
import { AppDispatch, getGenres, IGenreList } from "../store";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

interface ISelectGenreProps {
  genres: IGenreList[];
  type: string;
}

function SelectGenre(props: ISelectGenreProps) {
  const dispatch = useDispatch<AppDispatch>();
  const type = props.type;
  const genres = props.genres;

  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {props.genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

export default SelectGenre;

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;
