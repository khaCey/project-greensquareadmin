import React from 'react';
import { EmployeeHeader, EmployeeName, EmployeeNumber, EmployeeDays, EmployeeHours, EmployeeCard as EmployeeCardContainer } from './StyledComponents'; // import the relevant styled components

export const EmployeeCard = ({ employee, handleSelect, calculateDaysWorked, calculateHoursWorked, records }) => {
  return (
    <EmployeeCardContainer onClick={() => handleSelect(employee)}>
      <EmployeeHeader>
        <EmployeeName>
          {employee.firstName} {employee.lastName}
        </EmployeeName>
        <EmployeeNumber>
          {employee.employeeID}
        </EmployeeNumber>
        <EmployeeDays>
            {calculateDaysWorked(records)}
        </EmployeeDays> 
        <EmployeeHours>
        {calculateHoursWorked(records)}
        </EmployeeHours>
      </EmployeeHeader>              
    </EmployeeCardContainer>
  );
};
