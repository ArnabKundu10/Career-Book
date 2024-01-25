import React from "react";
import "../../../assets/goal.css";
export default function Goal() {
  return (
    <>
      <div className="goal-input text-start position-fixed">
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
    </>
  );
}
