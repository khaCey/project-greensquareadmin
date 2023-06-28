import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { EmployeeContent } from './EmployeeContent';
import { ToastContainer, toast } from 'react-toastify';
import { PencilFill, XCircleFill, CheckCircleFill, TrashFill, PersonAdd} from 'react-bootstrap-icons';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const EmployeeCard = styled.div`
  &:not(.label){
    border-top: 1px solid #3d3f51;
    position: relative;
    cursor: pointer;
  }
  &:not(.label):hover {
    background-color: #3d434b;
  }
`;

const EmployeeHeader = styled.div`
  position: sticky; 
  top: 0;
  padding: 5px 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EmployeeName = styled.h3`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
  margin-left: 0.5em;
`;

const EmployeeNumber = styled.div`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
`;

const EmployeeDays = styled.h3`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
`;

const EmployeeHours = styled.h3`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
  margin-right: 0.5em;
`;

const UpperContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const PageName = styled.div`
  margin-left: 1em;
`;

const BottomContainer = styled.div`
  flex-grow: 1;
  height: 93vh;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
`;

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const AddEmployee = styled.div`
  background-color: rgba(60, 253, 79, 0.5);
  border-radius: 10px;
  padding: 0.25em;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  &:hover{
    background-color: rgba(60, 253, 79, 0.25);
  }
`;

const AddButton = styled.div`
  cursor: pointer;
  width: 10em;
  margin-right: 1em;
  margin-top: 1em;
`;

const InnerBottomContainer = styled.div`
  margin-right: 1em;
  margin-left: 1em;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2B2F33;
  position: relative;
`;

const EmployeeList = styled.div`
  border-radius: 5px;
  padding: 1em;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

const Modal = styled.div`
  position: fixed;
  width: 75%;
  height: 75%;
  outline: 1px solid white;
  background: grey;
  z-index: 3;
`;

const RecordCard = styled.div`
  width: 100%;
  padding: 1em;
  border-top: 1px solid #3d3f51;
  position: relative;
  cursor: pointer;
`;

const EmployeePage = ({ employeeData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeRecords, setEmployeeRecords] = useState(null);
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const isAdmin = employeeData[0].privileges === 'admin';

  const calculateDaysWorked = (records) => {
    if (!records) {
      return 0;  // return a default value when no records
    }
    const daysWorked = new Set(records.map(record => (new Date(record.time)).toDateString()));
    return daysWorked.size;
  };

  const calculateHoursWorked = (records) => {
    if (!records) {
      return 0;  // return a default value when no records
    }
    let totalHoursWorked = 0;
    for (let i = 0; i < records.length; i += 2) {
      const clockInTime = new Date(records[i].time);
      const clockOutTime = new Date(records[i + 1]?.time);
      if (clockOutTime) {
        const hoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60);
        totalHoursWorked += hoursWorked;
      }
    }
    return totalHoursWorked.toFixed(2);
  };
  
  const handleSelect = (employee) => {
    setSelectedEmployee(employee.employeeID);
    setEmployeeRecords(records[employee.employeeID]);
    setShowModal(true);
  };

  useEffect(() => {
    if (isAdmin) {
      setIsLoading(true);
      let currentDate = new Date();
      let startYear = currentDate.getUTCFullYear();
      let startMonth = currentDate.getUTCMonth();
      let endYear = currentDate.getUTCFullYear();
      let endMonth = currentDate.getUTCMonth() + 1; // JavaScript months are 0-indexed
      
      if (currentDate.getUTCDate() < 21) {
        if (startMonth === 0) {
          startMonth = 11;
          startYear -= 1;
        } else {
          startMonth -= 1;
        }
        endMonth -= 1;
      }

      let startDate = new Date(Date.UTC(startYear, startMonth, 21));
      let endDate = new Date(Date.UTC(endYear, endMonth, 20, 23, 59, 59, 999));

      axios.get(
        `${import.meta.env.VITE_APP_API_URL}employee/`,
        { headers: { 'x-api-key': '34be70f8-aef9-47bd-8f8a-674503d24e73' }}
      ).then((res) => {
        setEmployees(res.data);
        Promise.all(res.data.map(employee =>
          axios.get(
            `${import.meta.env.VITE_APP_API_URL}records/${employee.employeeID}/${startDate.toISOString()}/${endDate.toISOString()}`,
            { 
              headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY }
            }
          ).then(response => {
            let records = response.data.filter(record => !record.isDeleted);

            // If the first record's time is before the start date, remove it
            if (records.length > 0 && new Date(records[0].time) < startDate) {
              records = records.slice(1);
            }

            // Exclude the last record if its type is 'clockin'
            if (records.length > 0 && records[records.length - 1].type === 'clockin') {
              records.pop();
            }

            return records;
          })
        )).then(recordsResponses => {
          // Map the records with the corresponding employee
          const employeeRecords = res.data.reduce((obj, employee, index) => {
            obj[employee.employeeID] = recordsResponses[index];
            return obj;
          }, {});
          setRecords(employeeRecords);
          setIsLoading(false);
        });
      });
    }
  }, [isAdmin, employeeData]);

  if (!isAdmin) {
    toast.error('You do not have the necessary permissions to view this page.');
    return <ToastContainer />;
  }
  
  return (
    <EmployeePageContainer>
      
      <UpperContainer>
        <PageName>
          <h1>Employees</h1>
        </PageName>
      </UpperContainer>

      <BottomContainer>
        <InnerBottomContainer>
          {isLoading &&
            <LoaderWrapper>
              <Spinner />
            </LoaderWrapper>
          }
          <AddContainer>
            {isAdmin && 
              <AddButton variant="primary" onClick={() => setShowModal(true)}>
                <AddEmployee><PersonAdd style={{ fontSize: '1.5rem' }} /> Add Employee</AddEmployee>
              </AddButton>
            }
          </AddContainer>
          <EmployeeList>
            <EmployeeCard className='label'>
              <EmployeeHeader>
                <EmployeeName>
                  Name
                </EmployeeName>
                <EmployeeNumber>
                  Employee Number
                </EmployeeNumber>
                <EmployeeDays>
                  Days
                </EmployeeDays>
                <EmployeeHours>
                  Hours
                </EmployeeHours>
              </EmployeeHeader>
            </EmployeeCard>
            {employees.map((employee, index) => (
              <EmployeeCard key={employee.employeeID} onClick={() => handleSelect(employee)}>
                <EmployeeHeader>
                  <EmployeeName>
                    {employee.firstName} {employee.lastName}
                  </EmployeeName>
                  <EmployeeNumber>
                    {employee.employeeID}
                  </EmployeeNumber>
                   <EmployeeDays>
                    {calculateDaysWorked(records[employee.employeeID])}
                  </EmployeeDays>
                  <EmployeeHours>
                    {calculateHoursWorked(records[employee.employeeID])}
                  </EmployeeHours>
                </EmployeeHeader>              
              </EmployeeCard>
            ))}
          </EmployeeList>
        </InnerBottomContainer>
      </BottomContainer>
      {showModal && employeeRecords &&
        <Modal>
          {employeeRecords.map((record, index) => (
            <RecordCard>
              <p key={index}>
                {new Date(record.time).toLocaleString()}: {record.type}
              </p>
            </RecordCard>
          ))}
        </Modal>
      }
    </EmployeePageContainer>
  );  
};

export default EmployeePage;
