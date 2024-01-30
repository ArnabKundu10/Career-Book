import "../App.css";
import React, { useState } from "react";
import SideBar from "../components/sidebar/sidebar";
import AllLists from "../components/todoList/allLists";
import RegisterLogin from "./login";
import { SelectListHook } from "../hooks/selectListHook";
import NavBar from "../components/navbar/nav";
function MainBody() {
  const { setListNum, listnum } = SelectListHook();
  const [userid, setUserid] = useState(localStorage.getItem("useridls"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const forSetToken = (token) => {
    setToken(token);
  };
  const forSetUserid = (id) => {
    console.log(id);
    setUserid(id);
  };
  return (
    <>
      <NavBar token={token} setToken={setToken} />
      {!token || token === undefined ? (
        <RegisterLogin forSetToken={forSetToken} forSetUserid={forSetUserid} />
      ) : (
        <div>
          <SideBar setListNum={setListNum} />
          <AllLists listnum={listnum} userid={userid} />
        </div>
      )}
    </>
  );
}
export default MainBody;
