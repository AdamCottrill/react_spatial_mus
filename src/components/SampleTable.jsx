import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useStateMachine } from "little-state-machine";
import { getSamples } from "../services/api";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";
import { MyTable } from "./MyTable";

export const SampleTable = () => {
  const { state } = useStateMachine();
  const { mu_type, year } = state;

  const { isLoading, error, data } = useQuery(["samples", mu_type, year], () =>
    getSamples(mu_type, year)
  );

  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  if (error) return <Alert message={error.message} />;

  return <>{tableData ? <MyTable data={tableData} /> : <Spinner />}</>;
};
