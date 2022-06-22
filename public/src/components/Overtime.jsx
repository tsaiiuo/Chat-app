import React from "react";
import { IoIosTimer } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
export default function Logout() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      //   localStorage.clear();
      //   navigate("/login");
      toast.success("Overtime Success", toastOptions);
    }
  };
  return (
    <Button onClick={handleClick}>
      <IoIosTimer />
      <ToastContainer />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
  &:hover {
    background-color: #4e0eff;
  }
`;
