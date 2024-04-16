import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assests/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginRoute } from "../utils/ApiRoute";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    Confirmpassword: "",
  });

  const toastOpations = {
    position: "bottom-right",
    autoClose: "8000",
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("in validation");
      try {
        const { password, username } = values;
        const { data } = await axios.post(LoginRoute, {
          username,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOpations);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          console.error("Unexpected response from server:", data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("email & password is required", toastOpations);

      return false;
    } else if (username.length === "") {
      toast.error("email & password is required", toastOpations);
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //     if(localStorage.getItem("chat-app-user")){
  //       navigate('/')
  //     }
  //   },[])
  

  return (
    <>
      <FormContainer className="h-[100vh] w-[100%] flex justify-center items-center bg-[#131224]">
        <form
          className="flex h-[80vh]  w-[29rem]  p-1 rounded-2xl flex-col gap-2rem bg-[#0B0914]  p-[3rem 5rem]"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-[1rem] justify-center">
            <img className="h-[5rem]" src={logo} alt="" />
            <h1 className="text-[white] font-semibold text-[28px] ">
              FRIEND CHATING BOARD
            </h1>
          </div>
          <div className="p-[1.5rem] gap-[1rem] flex justify-around  flex-col">
            <input
              className="inp"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={values.username}
            />

            <input
              className="inp"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />

            <button className="enter" type="submit">
              login
            </button>
            <span>
              Dont have an Account ?
              <a className="ankr" href="">
                <Link to="/register">Register</Link>
              </a>
            </span>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #1313124;
`;

export default Login;
