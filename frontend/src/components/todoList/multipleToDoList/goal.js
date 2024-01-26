import React, { useEffect, useState } from "react";
import "../../../assets/goal.css";
export default function Goal({ userid }) {
  const [goaldata, setGoalData] = useState([]);
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
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userid]);
  return (
    <>
      <div className="goal-input text-start position-fixed rounded">
        <form action="" method="POST">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label ">
              Task Title:
            </label>
            <input
              type="text"
              name="title"
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
              placeholder="Describe Task"
              rows={3}
              defaultValue={""}
            />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn goal-btn fw-bold" type="button">
              Button
            </button>
          </div>
        </form>
      </div>
      <div style={{ clear: "both" }}>
        {goaldata?.map((dataItem, index) => (
          <div className="mt-5" key={index}>
            <div className="goal-title text-black bg-primary w-25">
              {dataItem.title}
            </div>
            <div className="goal-description text-black bg-danger w-100">
              {dataItem.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
