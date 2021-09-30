import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { getSamples } from "../services/api";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";
import { MyTable } from "./MyTable";

export const SampleTable = (props) => {
  const mu_type = "ltrz";

  const { isLoading, error, data } = useQuery(["samples", mu_type], () =>
    getSamples(mu_type)
  );

  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  if (error) return <Alert message={error.message} />;

  return <>{tableData ? <MyTable data={tableData} /> : <Spinner />}</>;
};
