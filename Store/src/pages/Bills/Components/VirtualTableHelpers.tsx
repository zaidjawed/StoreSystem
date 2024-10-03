import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { TableComponents } from "react-virtuoso";
import { Bill as BillType } from "../../../utils/types";
import Bill from "./Bill";

export const fixedHeaderContent = () => {
  return (
    <TableRow
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <TableCell>Invoice Number</TableCell>
      <TableCell>Invoice Type</TableCell>
      <TableCell>Time</TableCell>
      <TableCell>Discount</TableCell>
      <TableCell>Total</TableCell>
      <TableCell>Preview or Print</TableCell>
      <TableCell>Second Party</TableCell>
    </TableRow>
  );
};

export const VirtuosoTableComponents: TableComponents<BillType> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableRow: Bill,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
