import React from "react";
import EditPop1 from "./edit-pop";

export default function ToDo({
  dataItem,
  index,
  userid,
  setGoalData,
  setEditDisplay,
  editdisplay,
}) {
  const incompleteBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/incomplete", {
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
        alert("Your task will be added in complete list! Check there");
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
  // const [editdisplay, setEditDisplay] = useState({ display: "none" });
  return (
    <>
      <EditPop1
        index={index}
        userid={userid}
        setGoalData={setGoalData}
        dataItem={dataItem}
        editdisplay={editdisplay}
        setEditDisplay={setEditDisplay}
      />
      <div className="d-flex flex-column mt-4 me-0">
        <div className="d-flex flex-row">
          <div className="goal-todo-title rounded p-2 text-white fw-bolder fs-2">
            {dataItem.title}
          </div>
          <div className="todo-buttons d-flex justify-content-end align-items-end">
            <button
              className="btn todo-button btn-primary"
              onClick={() => setEditDisplay(index)}
            >
              Edit
            </button>
            <button className="btn todo-button btn-danger" onClick={deleteBtn}>
              Delete
            </button>
            <button
              className="btn todo-button btn-success"
              onClick={incompleteBtn}
            >
              Task Completed
            </button>
          </div>
        </div>
        <div className="goal-todo-description p-1 text-black w-100">
          {dataItem.description}
        </div>
      </div>
    </>
  );
}
