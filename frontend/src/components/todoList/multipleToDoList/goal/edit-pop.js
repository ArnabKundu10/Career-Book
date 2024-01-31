import React, { useState } from "react";

export default function EditPop1({
  dataItem,
  index,
  userid,
  setGoalData,
  setEditDisplay,
  editdisplay,
}) {
  const [editgoaldata, setEditData] = useState({
    title: dataItem.title,
    description: dataItem.description,
    i: index,
    id: userid,
    status: dataItem.status,
  });
  const editChange = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name;
      const value = e.target.value;
      setEditData({
        ...editgoaldata,
        [name]: value,
      });
    } catch (error) {
      console.log("editting error", error);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/todoedit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editgoaldata),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        setGoalData(responseData.goaltasks);
        alert("Your task is successfully edited");
      } else {
        alert("Title should not be empty");
        console.log("there is an error in response");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const popBtn = (i) => {
    if (editdisplay !== index) {
      return { display: "none" };
    }
    return { display: "block" };
  };

  return (
    <>
      <div className="edit-pop1 text-center rounded" style={popBtn(index)}>
        <p
          className="text-end fs-3 pt-1 pe-3 mb-0 mt-0"
          onClick={() => setEditDisplay(-1)}
        >
          <i className="fa-solid fa-xmark text-white"></i>
        </p>
        <form onSubmit={handleEdit}>
          <p className=" m-0 p-0 mb-1">
            <label htmlFor="" className="fs-4 fw-bold text-white me-1">
              Title:-
            </label>
            <input
              type="text"
              name="title"
              className="w-50"
              placeholder="Title"
              onChange={editChange}
              value={editgoaldata.title}
            />
          </p>

          <p
            className="position-relative m-0 text-center w-75 p-0 "
            style={{ left: "13%" }}
          >
            <label className="fs-4 fw-bold text-white me-1">
              Description:-
            </label>
            <textarea
              rows={2}
              type="text"
              name="description"
              placeholder="description"
              onChange={editChange}
              className="w-100"
              value={editgoaldata.description}
            />
          </p>
          <button
            type="submit"
            className="btn btn-primary mb-2 ms-1 fw-bold fs-5 border-1 border-end border-bottom"
            style={{ boxShadow: "1px 1px 1px" }}
            onClick={() => setEditDisplay(-1)}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
