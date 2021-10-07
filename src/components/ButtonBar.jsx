import React from "react";

import { FaPlus } from "react-icons/fa";

export const ButtonBar = ({ append_values, button_label, reset, append }) => {
  return (
    <div className="row justify-content-between">
      <div className="col-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>

      <div className="col-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            append(append_values);
          }}
        >
          <span className="mx-1">
            <FaPlus />
          </span>
          {button_label}
        </button>
      </div>
      <div className="col-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};
