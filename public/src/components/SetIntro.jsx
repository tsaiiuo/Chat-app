import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setIntroRoute } from "../utils/APIRoutes";
import Select from "react-select";

export default function SetIntro() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    age: "",
    home: "",
    gender: "",
    major: "",
    habit: [],
    gang: [],
    hate: [],
    positive: "",
  });
  const genderOptions = [
    { value: "boy", label: "生理男" },
    { value: "girl", label: "生理女" },
  ];
  const gangOptions = [
    { value: "upDormitory", label: "山上宿舍" },
    { value: "downDormitory", label: "山下宿舍" },
    { value: "majorOffice", label: "係辦" },
  ];
  const habitOptions = [
    { value: "sports", label: "運動" },
    { value: "indieband", label: "獨立樂團" },
    { value: "smoking", label: "煙庭" },
    { value: "toxic", label: "講話酸言酸語><" },
    { value: "apple", label: "apple" },
    { value: "weiweisneeze", label: "陳威" },
    { value: "cheating", label: "考試去廁所作弊" },
    { value: "kpop", label: "kpop" },
    { value: "jpop", label: "jpop" },
    { value: "tea", label: "喝茶局" },
    { value: "computer", label: "打電動" },
    { value: "avideo", label: "美劇" },
    { value: "jvideo", label: "日劇" },
    { value: "dish", label: "洗碗做家事" },
    { value: "ntr", label: "ntr" },
    { value: "bl", label: "BL" },
    { value: "weeb", label: "溫情阿宅" },
    { value: "love", label: "暈船" },
    { value: "tinder", label: "交友軟體" },
    { value: "lazypasta", label: "lazy pasta" },
    { value: "shonpin", label: "小尚品" },
    { value: "apex", label: "跳傘小隊" },
    { value: "smoking2", label: "給老師吸二手菸" },
    { value: "makio", label: "打蚊子" },
  ];
  const hateOptions = [
    { value: "self", label: "我自己" },
    { value: "indieband", label: "獨立樂團" },
    { value: "smoking", label: "煙庭" },
    { value: "dish", label: "洗碗做家事" },
    { value: "bl", label: "BL" },
    { value: "weeb", label: "溫情阿宅" },
    { value: "love", label: "暈船" },
    { value: "lazypasta", label: "lazy pasta" },
    { value: "shonpin", label: "小尚品" },
    { value: "toxic", label: "講話酸言酸語><" },
    { value: "android", label: "android" },
    { value: "others", label: "聖母" },
    { value: "Rla", label: "阿語系" },
    { value: "bitch", label: "管家婆" },
  ];
  const positiveOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const selectChange = (newValue, actionMeta) => {
    console.log(actionMeta);
    if (newValue.value) {
      setValues({ ...values, [actionMeta]: newValue.value });
    } else {
      const newValuesArr = newValue ? newValue.map((item) => item.value) : [];
      setValues({ ...values, [actionMeta]: newValuesArr });
    }
  };

  const validateForm = () => {
    const { age, home, gender, major, habit, gang, hate, positive } = values;
    console.log(values);
    if (age.length < 1) {
      toast.error("Age is required.", toastOptions);
      return false;
    } else if (home.length < 2) {
      toast.error("Home is required.", toastOptions);
      return false;
    } else if (gender === "") {
      toast.error("Gender is required.", toastOptions);
      return false;
    } else if (major === "") {
      toast.error("Major is required.", toastOptions);
      return false;
    } else if (!gang[0]) {
      toast.error("Gang is required.", toastOptions);
      return false;
    } else if (!habit[0]) {
      toast.error("Habit is required.", toastOptions);
      return false;
    } else if (!hate[0]) {
      toast.error("Hate is required.", toastOptions);
      return false;
    } else if (positive === "") {
      toast.error("是否確診需填寫", toastOptions);
      return false;
    }
    console.log(hate[0]);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { age, home, gender, major, habit, gang, hate, positive } = values;
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const { data } = await axios.post(`${setIntroRoute}/${user._id}`, {
        age,
        home,
        gender,
        major,
        habit,
        gang,
        hate,
        positive,
      });
      if (data.isSet) {
        user.isIntroSet = true;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/setAvatar");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>NCCUpid Introduction</h1>
          </div>
          <input
            type="text"
            placeholder="Age"
            name="age"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Home"
            name="home"
            onChange={(e) => handleChange(e)}
            min="2"
          />
          <input
            type="text"
            placeholder="Major"
            name="major"
            onChange={(e) => handleChange(e)}
          />
          <Select
            className="select"
            options={genderOptions}
            placeholder="Gender"
            name="gender"
            onChange={(e) => selectChange(e, "gender")}
          />

          <Select
            className="select"
            isMulti="true"
            options={gangOptions}
            placeholder="常出沒地區"
            name="gang"
            onChange={(e) => selectChange(e, "gang")}
          />
          <Select
            className="select"
            isMulti="true"
            options={habitOptions}
            placeholder="Habit"
            name="habit"
            onChange={(e) => selectChange(e, "habit")}
          />
          <Select
            className="select"
            isMulti="true"
            options={hateOptions}
            placeholder="Hate"
            name="hate"
            onChange={(e) => selectChange(e, "hate")}
          />
          <Select
            className="select"
            options={positiveOptions}
            placeholder="Positive"
            name="positive"
            onChange={(e) => selectChange(e, "positive")}
          />
          <button type="submit">Send</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ff6f47;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 0.7rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #ff6f47;
      outline: none;
    }
  }
  .select {
    gap: 1rem;
    background-color: transparent;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
  }
  button {
    background-color: #ff6f47;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #ff6f47;
    }
  }
`;
