import React from "react";
import Goal from "./multipleToDoList/goal.js";
import Other from "./multipleToDoList/other.js";
import Project from "./multipleToDoList/project.js";
import Skill from "./multipleToDoList/skill.js";
import "../../assets/main.css";
export default function AllLists({ listnum, userid }) {
  return (
    <div className="mainList">
      {listnum === 0 ? (
        <Goal userid={userid} />
      ) : listnum === 1 ? (
        <Skill />
      ) : listnum === 2 ? (
        <Project />
      ) : (
        <Other />
      )}
    </div>
  );
}
