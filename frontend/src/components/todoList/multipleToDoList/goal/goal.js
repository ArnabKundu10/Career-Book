import React, { useEffect, useState } from "react";
import "../../../../assets/goal.css";
import ToDo from "./todo";
import Completed from "./completed";
export default function Goal({ userid }) {
  const [statusBg, setStatusBg] = useState(0);
  const [goaldata, setGoalData] = useState([]);
  const [status, setStatus] = useState(true);
  const [taskdata, setTaskData] = useState({
    title: "",
    description: "",
    id: userid,
  });
  const hoverStatus = (id) => {
    if (statusBg === id) {
      return { backgroundColor: "rgb(31, 182, 242,1)" };
    }
    return { backgroundColor: "rgba(136, 133, 133, 1)" };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/goaldata/${userid}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setGoalData(data.goaltasks);
        // console.log(data.goaltasks);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [userid, taskdata]);
  // add task*************************************************

  const inputChange = async (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setTaskData({
        ...taskdata,
        [name]: value,
      });
    } catch (error) {
      console.log("register submit error", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskdata),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        setGoalData(responseData.goaltasks);
        setTaskData({ title: "", description: "", id: userid });
      } else {
        console.log("there is an error in response");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="goal-input text-start position-fixed ">
        <form className="goal-form rounded" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label ">
              Task Title:
            </label>
            <input
              type="text"
              name="title"
              onChange={inputChange}
              value={setTaskData.title}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="description"
              value={setTaskData.description}
              onChange={inputChange}
              placeholder="Describe Task"
              rows={3}
              defaultValue={""}
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn goal-btn fw-bold" type="submit">
              Add Task
            </button>
          </div>
        </form>
        <div className="d-flex flex-row mb-1">
          <div
            className="todo-status text-center fw-bolder p-2 w-50"
            style={hoverStatus(0)}
            onClick={() => {
              setStatus(true);
              setStatusBg(0);
            }}
          >
            TO DO
          </div>
          <div
            className=" complete-status text-center fw-bolder p-2 w-50"
            style={hoverStatus(1)}
            onClick={() => {
              setStatus(false);
              setStatusBg(1);
            }}
          >
            COMPLETED
          </div>
        </div>
      </div>
      {status ? (
        <div className="todo-tasks mt-0 me-0">
          {goaldata?.map((dataItem, index) => {
            if (dataItem.status === "incomplete") {
              return <ToDo key={index} dataItem={dataItem} />;
            }
            return <li key={index}>{dataItem.status}</li>;
          })}
        </div>
      ) : (
        <div className="complete-tasks mt-0 me-0">
          {goaldata?.map((dataItem, index) => {
            if (dataItem.status === "complete") {
              return <Completed key={index} dataItem={dataItem} />;
            }
            return (
              <li key={index} style={{ height: "0px" }}>
                {dataItem.status}
              </li>
            );
          })}
        </div>
      )}
    </>
  );
}
