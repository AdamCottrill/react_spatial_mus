import React from "react";
import { useQuery } from "react-query";
import { useStateMachine } from "little-state-machine";
import { getMuTypes } from "../services/api";

import { updateMuType } from "../Actions";

import { Spinner } from "./Spinner";
import { Alert } from "./Alert";

export const SideBar = (props) => {
  const { isLoading, error, data } = useQuery("mutypes", getMuTypes);

  const { actions, state } = useStateMachine({ updateMuType });

  if (isLoading) return <Spinner />;

  if (error) return <Alert message={error.message} />;

  return (
    <>
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
                  onChange={() => actions.updateMuType({ mu_type: mu.abbrev })}
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
