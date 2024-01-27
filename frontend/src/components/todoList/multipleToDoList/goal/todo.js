import React from "react";

export default function ToDo({ dataItem }) {
  return (
    <div className="d-flex flex-column mt-2 me-0">
      <div className="goal-title rounded p-2 text-white fw-bolder fs-2">
        {dataItem.title}
      </div>
      <div className="goal-description p-1 text-black w-100">
        {dataItem.description}
      </div>
    </div>
  );
}
