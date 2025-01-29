import React, { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { userColumns } from "./constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllUsers } from "../../redux/entities/formBuilderEntity";

const Users = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(
    (state) => state.entities.formBuilder.allUsers
  );

  useEffect(() => {
    dispatch(getAllUsers("GET ALL USERS"));
  }, []);

  return (
    <div className="p-3">
      <h2>Users</h2>

      <div>
        <h5 className="my-4">
          Total Users{" "}
          <span className="border border-secondary rounded-3 py-1 px-2 bg-info-subtle">
            {allUsers?.count || 0}
          </span>
        </h5>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "lightcyan" }}>
              <TableRow>
                {userColumns()?.map((col) => {
                  return <TableCell key={col.key}>{col.title}</TableCell>;
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {allUsers?.results?.map((row) => (
                <TableRow
                  key={row.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.group}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Users;
