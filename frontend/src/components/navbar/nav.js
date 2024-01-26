import React from "react";
import "../../assets/navBar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar({ token, setToken }) {
  const navigate = useNavigate();
  console.log(token);
  const logoutEvent = async (e) => {
    try {
      setToken("");
      localStorage.removeItem("token");
      localStorage.removeItem("useridls");
      navigate("/");
      e.target.style.display = "none";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="customNav w-100 position-fixed text-center">
        <div className=" container d-flex pt-1 pb-2">
          <p className="flex-grow-1 text-center text-white fw-bolder fs-1 mb-0">
            DreamBook
          </p>
          <p className=" align-self-center fs-5 mb-0">
            {!token ? (
              <span></span>
            ) : (
              <button
                onClick={logoutEvent}
                className="register-box bg-transparent border-0 border-right"
              >
                Logout
              </button>
            )}
          </p>
        </div>
      </nav>
    </>
  );
}
