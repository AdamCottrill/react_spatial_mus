import React, { useState } from "react";
import { useQuery } from "react-query";

import { getMuTypes } from "../services/api";

import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

export const SideBar = (props) => {
  const { isLoading, error, data } = useQuery("mutypes", getMuTypes);

  const [selected, setSelected] = useState("mu");

  if (isLoading) return <Spinner />;

  if (error) return <Alert message={error.message} />;

  return (
    <>
      <p>{selected}</p>

      <div className="card mx-2">
        <div className="card-header">Label Samples with:</div>
        <div className="card-body">
          {data &&
            data.results.map((mu, i) => (
              <div className="form-check form-check-sm" key={i}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="mu-type"
                  id="{mu.abbrev}"
                  checked={mu.abbrev === selected}
                  onChange={() => setSelected(mu.abbrev)}
                />
                <label className="form-check-label" htmlFor="{mu.abbrev}">
                  {mu.label}
                </label>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
