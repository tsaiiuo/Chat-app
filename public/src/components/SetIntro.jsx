import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setIntroRoute } from "../utils/APIRoutes";
import Select from "react-select";
import introbackground from "../assets/bg-intro.jpg";
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
    { value: "山上宿舍", label: "山上宿舍" },
    { value: "山下宿舍", label: "山下宿舍" },
    { value: "係辦", label: "係辦" },
  ];
  const habitOptions = [
    { value: "周致遠", label: "周致遠" },
    { value: "貓空喝茶", label: "貓空喝茶" },
    { value: "獨立樂團", label: "獨立樂團" },
    { value: "煙庭", label: "煙庭" },
    { value: "講話酸言酸語><", label: "講話酸言酸語><" },
    { value: "操場曬太陽", label: "操場曬太陽" },
    { value: "雄鷹比賽", label: "雄鷹比賽" },
    { value: "望遠亭看夜景", label: "望遠亭看夜景" },
    { value: "小橘&胖虎", label: "小橘&胖虎" },
    { value: "達賢圖書館", label: "達賢圖書館" },
    { value: "半夜吃海底撈", label: "半夜吃海底撈" },
    { value: "酒吧喝酒", label: "酒吧喝酒" },
    { value: "在安九打麻將", label: "在安九打麻將" },
    { value: "恆光橋烤肉&喝酒", label: "恆光橋烤肉&喝酒" },
    { value: "期中交流版", label: "期中交流版" },
    { value: "看螢火蟲", label: "看螢火蟲" },
    { value: "總圖自習室24小時都開著", label: "總圖自習室24小時都開著" },
    { value: "金旋獎", label: "金旋獎" },
    { value: "暈船", label: "暈船" },
    { value: "小公寓摸貓咪", label: "小公寓摸貓咪" },
  ];
  const hateOptions = [
    { value: "我自己", label: "我自己" },
    { value: "單身", label: "單身" },
    { value: "暈船", label: "暈船" },
    { value: "五期六期體育課", label: "五期六期體育課" },
    { value: "期中末考", label: "期中末考" },
    { value: "回宿舍要爬山", label: "回宿舍要爬山" },
    { value: "校園公車司機太兇", label: "校園公車司機太兇" },
    { value: "沒有好吃的", label: "沒有好吃的" },
    { value: "沒中宿舍/宿舍很破", label: "沒中宿舍/宿舍很破" },
    { value: "政大很偏遠", label: "政大很偏遠" },
    { value: "覺青", label: "覺青" },
    { value: "聖母", label: "聖母" },
    { value: "狗后跟她的瘋狗", label: "狗后跟她的瘋狗" },
    { value: "課很難選", label: "課很難選" },
  ];
  const positiveOptions = [
    { value: "確診寶寶", label: "Yes" },
    { value: "沒確診超人", label: "No" },
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
      console.log(user);
      console.log(user._id);
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
      <FormContainer className="FormContainer">
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
  width: 100vh;
  height: 100vh;
  width: 100%;
  margin: 0;
  display: flex;
  overflow: -moz-scrollbars-vertical;
  overflow-y: auto;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: url(${introbackground});
  background-size: cover;
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
    max-width: 50%;
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
