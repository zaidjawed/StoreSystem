import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
  } from "@mui/material";
  import React from "react";
  import { TableComponents } from "react-virtuoso";
  import { Employee } from "../../../utils/types";
  
  export const fixedHeaderContent = () => {
    return (
      <TableRow
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <TableCell>#</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Phone Number</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Salary</TableCell>
        <TableCell>Joining Date</TableCell>
        <TableCell>Termination Date</TableCell>
        <TableCell colSpan={2}></TableCell>
      </TableRow>
    );
  };
  
  export const VirtuosoTableComponents: TableComponents<Employee> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };
  