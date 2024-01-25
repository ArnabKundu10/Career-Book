import "../App.css";
import React from "react";
import SideBar from "../components/sidebar/sidebar";
import AllLists from "../components/todoList/allLists";
import RegisterLogin from "./login";
import { SelectListHook } from "../hooks/selectListHook";
import NavBar from "../components/navbar/nav";
function MainBody() {
  const { setListNum, listnum, token, setToken } = SelectListHook();

  // const [datas, SetData] = useState(null);

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      {!token ? (
        <RegisterLogin setToken={setToken} />
      ) : (
        <div>
          <SideBar setListNum={setListNum} />
          <AllLists listnum={listnum} />
        </div>
      )}
    </>
  );
}
export default MainBody;
