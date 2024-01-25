import React from "react";
import "../../assets/sidebar.css";
export default function SideBar({ setListNum }) {
  return (
    <div className="dream-list pt-4 pb-5 ms-3">
      <div className="list-item" onClick={() => setListNum(0)}>
        Goal Oriented Tasks
      </div>
      <div className="list-item" onClick={() => setListNum(1)}>
        Skills
      </div>
      <div className="list-item" onClick={() => setListNum(2)}>
        Dream Projects
      </div>
      <div className="list-item" onClick={() => setListNum(3)}>
        Other
      </div>
    </div>
  );
}
