import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { StyledHeader } from "../globalStyles";

interface IHeaderProps {
  login: boolean;
}

function Header(props: IHeaderProps) {
  const navigate = useNavigate();

  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}

export default Header;
