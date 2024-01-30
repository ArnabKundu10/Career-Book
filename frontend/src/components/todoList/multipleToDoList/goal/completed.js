import React from "react";

export default function Completed({ dataItem, index, userid, setGoalData }) {
  const complete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ i: index, mainid: userid }),
      });
      console.log("incomplete button response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        setGoalData(responseData.goaltasks);
        alert("your task will store back into To-Do list");
      } else {
        console.log("there is an error in response");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/deletetask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ i: index, mainid: userid }),
      });
      console.log("incomplete button response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        setGoalData(responseData.goaltasks);
      } else {
        alert("there is an error in response");
        console.log("there is an error in response");
      }
    } catch (error) {
      console.error(error);
    }
    alert("Your task is deleted from all lists");
  };
  return (
    <div className="d-flex flex-column mt-2 me-0">
      <div className="d-flex flex-row">
        <div className="goal-complete-title rounded p-2 text-white fw-bolder fs-2">
          {dataItem.title}
        </div>
        <div className="todo-buttons d-flex justify-content-end align-items-end">
          <button className="btn todo-button btn-primary">Edit</button>
          <button className="btn todo-button btn-danger" onClick={deleteBtn}>
            Delete
          </button>
          <button className="btn todo-button btn-success" onClick={complete}>
            Yet to Complete
          </button>
        </div>
      </div>
      <div className="goal-complete-description p-1 text-black w-100">
        {dataItem.description}
      </div>
    </div>
  );
}
