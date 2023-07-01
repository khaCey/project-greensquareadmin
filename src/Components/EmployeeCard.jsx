import PropTypes from 'prop-types';
import { EmployeeHeader, EmployeeName, EmployeeNumber, EmployeeDays, EmployeeHours, EmployeeCard as EmployeeCardContainer } from './StyledComponents'; // import the relevant styled components

export const EmployeeCard = ({ employee, records, handleSelect, calculateDaysWorked, calculateHoursWorked }) => {
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

EmployeeCard.propTypes = {
    employee: PropTypes.object.isRequired,
    records: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
    calculateDaysWorked: PropTypes.func.isRequired,
    calculateHoursWorked: PropTypes.func.isRequired,
};