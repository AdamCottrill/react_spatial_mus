import React, { useMemo } from "react";
import { useTable } from "react-table";

export const MyTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "MU",
        accessor: "area",
      },
      {
        Header: "PRJ_CD",
        accessor: "prj_cd",
      },
      {
        Header: "SAM",
        accessor: "sam",
      },
      {
        Header: "Set Date",
        accessor: "effdt0",
      },

      {
        Header: "Lift Date",
        accessor: "effdt1",
      },
      {
        Header: "Gear",
        accessor: "gr",
      },
      {
        Header: "Site Depth(m)",
        accessor: "sidep",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
