import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStateMachine } from "little-state-machine";

import Select from "react-select";

import { getMuTypes } from "../services/api";
import { updateState } from "../Actions";

import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

export const SideBar = (props) => {
  const { isLoading, error, data } = useQuery("mutypes", getMuTypes);
  const { actions, state } = useStateMachine({ updateState });

  const yrs = Array(2019 - 1970 + 1)
    .fill()
    .map((_, idx) => 1970 + idx);
  yrs.sort((a, b) => b - a);
  const year_options = yrs.map((y) => ({ value: y, label: y }));

  const handleChange = (selected_year) => {
    actions.updateState({ year: selected_year.value });
  };

  if (isLoading) return <Spinner />;

  if (error) return <Alert message={error.message} />;

  return (
    <>
      <div className="card mx-2 mb-2">
        <div className="card-header">Select a year:</div>
        <div className="card-body">
          <div className="mt-2 mb-3">
            <Select
              placeholder="Select year..."
              value={year_options.filter(
                (option) => option.value === state.year
              )}
              onChange={handleChange}
              options={year_options}
            />
          </div>
        </div>
      </div>

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
                  checked={mu.abbrev === state.mu_type}
                  onChange={() => actions.updateState({ mu_type: mu.abbrev })}
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
