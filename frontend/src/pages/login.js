import React from "react";
import "../assets/registerlogin.css";
import NoteBookBg from "../pictures/notebook-bg.jpg";
import { useNavigate } from "react-router-dom";
import { SelectListHook } from "../hooks/selectListHook";
import NavBar from "../components/navbar/nav";
export default function RegisterLogin({ forSetToken, forSetUserid }) {
  const navigate = useNavigate();
  const { setRegister, registerdata, logindata, setLogin } = SelectListHook();
  // register****************************************************
  const inputChangeOne = async (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setRegister({
        ...registerdata,
        [name]: value,
      });
    } catch (error) {
      console.log("register submit error", error);
    }
  };

  const handleSubmitOne = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerdata),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.token);
        localStorage.setItem("useridls", responseData.userId);
        setRegister({
          fullname: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
      } else {
        console.log("there is an error in register page");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // login**********************************************************
  const inputChangeTwo = async (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setLogin({
        ...logindata,
        [name]: value,
      });
    } catch (error) {
      console.log("login submit error", error);
    }
  };

  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Additional headers if needed
        },
        body: JSON.stringify(logindata),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.token);
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("useridls", responseData.userId);
        // setUserid(responseData.userId);
        forSetToken(localStorage.getItem("token"));
        forSetUserid(responseData.userId);
        console.log(`userid= ${responseData.userId}`);
        setLogin({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        console.log("there is an error in register page");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <div className="register-login d-flex flex-row justify-content-around align-items-center">
        <div className="note-bg position-absolute">
          <img className="notebook-bg-img w-100%" src={NoteBookBg} alt="" />
        </div>
        <div className="register w-25 border border-3 border-opacity-50 border-primary p-5">
          <p className="text-center fw-bolder fw-2">Registration</p>
          <form onSubmit={handleSubmitOne}>
            <label htmlFor="register-label">FullName</label>
            <input
              type="text"
              onChange={inputChangeOne}
              value={registerdata.fullname}
              className="w-100 mb-2"
              name="fullname"
              placeholder="Arnab Kundu"
            />
            <label htmlFor="register-label">Email</label>
            <input
              type="text"
              className="w-100 mb-2"
              name="email"
              onChange={inputChangeOne}
              value={registerdata.email}
              placeholder="arnab@gmail.com"
            />
            <label htmlFor="register-label">Password</label>
            <input
              type="password"
              className="w-100 mb-2"
              onChange={inputChangeOne}
              value={registerdata.password}
              name="password"
            />
            <label htmlFor="register-label">ConfirmPassword</label>
            <input
              type="password"
              className="w-100 mb-3"
              onChange={inputChangeOne}
              value={registerdata.confirmpassword}
              name="confirmpassword"
            />
            <div className="text-center">
              <button className="btn btn-primary" type="submit">
                submit
              </button>
            </div>
          </form>
        </div>
        {/* *********************************************************log in */}
        <div className="register w-25 border border-3 border-opacity-50 border-primary p-5">
          <p className="text-center fw-bolder fw-2">Log In</p>
          <form onSubmit={handleSubmitTwo}>
            <label htmlFor="register-label">Email</label>
            <input
              type="text"
              className="w-100 mb-2"
              onChange={inputChangeTwo}
              value={logindata.email}
              name="email"
              placeholder="arnab@gmail.com"
            />
            <label htmlFor="register-label">Password</label>
            <input
              type="password"
              className="w-100 mb-3"
              onChange={inputChangeTwo}
              value={logindata.password}
              name="password"
            />
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
