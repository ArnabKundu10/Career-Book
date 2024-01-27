import React, { useState } from "react";
import "../../assets/sidebar.css";
export default function SideBar({ setListNum }) {
  const [selectitem, setSelectItem] = useState(0);
  const setBGcolor = (id) => {
    setSelectItem(id);
  };
  const getBgColor = (id) => {
    const defaultStyles = {};
    if (selectitem === id) {
      return {
        ...defaultStyles,
        backgroundColor: "rgb(31, 182, 242)",
      };
    }
    return {
      ...defaultStyles,
      backgroundColor: "transparent",
    };
  };
  return (
    <div className="dream-list pt-4 pb-5 ms-3">
      <div
        className="list-item"
        style={getBgColor(0)}
        onClick={() => {
          setListNum(0);
          setBGcolor(0);
        }}
      >
        Goal Oriented Tasks
      </div>
      <div
        className="list-item"
        style={getBgColor(1)}
        onClick={() => {
          setListNum(1);
          setBGcolor(1);
        }}
      >
        Skills
      </div>
      <div
        className="list-item"
        style={getBgColor(2)}
        onClick={() => {
          setListNum(2);
          setBGcolor(2);
        }}
      >
        Dream Projects
      </div>
      <div
        className="list-item"
        style={getBgColor(3)}
        onClick={() => {
          setListNum(3);
          setBGcolor(3);
        }}
      >
        Other
      </div>
    </div>
  );
}
