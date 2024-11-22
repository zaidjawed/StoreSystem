import { Button, ButtonGroup, TableCell } from "@mui/material";

import {
  Employee as EmployeeType,
  SelectedEmployeeType,
} from "../../../utils/types";

const EmployeeRow = ({
  employee,
  selectEmployee,
}: {
  employee: EmployeeType;
  selectEmployee: (e: SelectedEmployeeType) => void;
}) => {
  return (
    <>
      <TableCell>{employee.id}</TableCell>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.phone}</TableCell>
      <TableCell>{employee.address}</TableCell>
      <TableCell>{employee.salary}</TableCell>
      <TableCell>
        {new Date(employee.started_on).toLocaleDateString("en-EG")}
      </TableCell>
      <TableCell className="employeeTerminationDate">
        {employee.stopped_on
          ? new Date(employee.stopped_on).toLocaleDateString("en-EG")
          : "Currently employed"}
      </TableCell>
      <TableCell colSpan={2}>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => selectEmployee({ ...employee, purpose: "pay" })}
          >
            Pay Salary
          </Button>
          <Button
            variant="contained"
            className="employeeEditBtn"
            onClick={() => selectEmployee({ ...employee, purpose: "edit" })}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="contained"
            className="employeeDelBtn"
            onClick={() => selectEmployee({ ...employee, purpose: "del" })}
          >
            Terminate Employment
          </Button>
        </ButtonGroup>
      </TableCell>
    </>
  );
};

export default EmployeeRow;
