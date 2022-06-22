import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import styled from "styled-components";

export default function Logout() {
  return (
    <Button>
      <BiHomeAlt />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #4e0eff;
  }
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
