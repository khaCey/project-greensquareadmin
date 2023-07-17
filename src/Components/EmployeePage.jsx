import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BottomContainer, InnerBottomContainer, EmployeeList, EmployeeCard as EmployeeCardLabel, EmployeeHeader, EmployeeName, EmployeeNumber, EmployeeDays, EmployeeHours, Modal, Overlay } from './StyledComponents'; // import the relevant styled components
import { PageContainer, UpperContainer, Name } from './PageStyledComponents'
import { EmployeeCard } from './EmployeeCard';
import { AddEmployeeButton } from './EmployeeAddEmployeeButton';
import { ShiftCard } from './EmployeeShiftCard';
import { RegisterCard } from './EmployeeRegisterCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeePage = ({ employeeData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employeeRecords, setEmployeeRecords] = useState(null);
    const [records, setRecords] = useState([]);
    const [maxEmployeeNumber, setMaxEmployeeNumber] = useState(0);
    const [shifts, setShifts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const hasPrivileges = (employeeData[0].privileges === 'admin' || employeeData[0].privileges === 'manager');
    const isAdmin = employeeData[0].privileges === 'admin';
    const modalRef = useRef();

    const calculateDaysWorked = (records) => {
        if (!records) {
            return 0;  // return a default value when no records
        }
        const daysWorked = new Set(records.map(record => (new Date(record.time)).toDateString()));
        return daysWorked.size;
    };

    const calculateHoursWorked = (records) => {
        if (!records) {
          return '0h 0m';  // return a default value when no records
        }
  
        let totalHoursWorked = 0;
  
        for (let i = 0; i < records.length - 1; i += 2) {  // Process pairs of records
          const clockInTime = new Date(records[i].time);
          const clockOutTime = new Date(records[i + 1].time);
  
          // Check if clockInTime and clockOutTime are valid Date objects
          if (
            isNaN(clockInTime.getTime()) ||
            isNaN(clockOutTime.getTime())
          ) {
            continue; // Skip invalid records
          }
  
          const hoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60);
          totalHoursWorked += hoursWorked;
        }
  
        // If the last record is a 'clockIn', the employee is still working, so add the time until now
        if (records.length % 2 !== 0) {
          const lastClockInTime = new Date(records[records.length - 1].time);
  
          // Check if lastClockInTime is a valid Date object
          if (!isNaN(lastClockInTime.getTime())) {
            const hoursWorked = (new Date() - lastClockInTime) / (1000 * 60 * 60);
            totalHoursWorked += hoursWorked;
          }
        }
  
        // Convert decimal hours to hours and minutes
        const hours = Math.floor(totalHoursWorked);
        const minutes = Math.round((totalHoursWorked - hours) * 60);
  
        return `${hours}h ${minutes}m`;
      };

    const handleSelect = (employee) => {
        setEmployeeRecords(records[employee.employeeID]);
        setShifts
        setShowModal(true);
    };

    useEffect(() => {
        document.title = "Green Square - Employees";
    }, []);

    useEffect(() => {
        if (employeeRecords) {
            const groupedRecords = employeeRecords.reduce((acc, record) => {
                const date = (new Date(record.time)).toDateString();
                if (!acc[date]) acc[date] = [];
                acc[date].push(record);
                return acc;
            }, {});

            const sortedShifts = Object.values(groupedRecords).sort((a, b) => new Date(a[0].time) - new Date(b[0].time));
            setShifts(sortedShifts);
        }
    }, [employeeRecords]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
                setShowRegister(false);
                setShifts([])
                setEmployeeRecords();
            }
        }

        // Attach the listeners to the document
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let link = "";
        if (isAdmin){
            link = `employee/all`
        }
        else{link = `employee/`}

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
                `${import.meta.env.VITE_APP_API_URL}`+link,
                { headers: { 'x-api-key': '34be70f8-aef9-47bd-8f8a-674503d24e73' } }
            ).then((res) => {
                setEmployees(res.data);
                setMaxEmployeeNumber(Math.max(...res.data.map(employee => employee.employeeID)));
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
        
    }, [isAdmin, employeeData]);

    if (!hasPrivileges) {
        toast.error('You do not have the necessary permissions to view this page.');
        return <ToastContainer />;
    }

    return (
        <PageContainer>
            <UpperContainer>
                <Name>
                    <h1>Employees</h1>
                </Name>
            </UpperContainer>

            <BottomContainer>
                <InnerBottomContainer>
                    {isLoading && <LoadingSpinner />}
                    {isAdmin && <AddEmployeeButton showModal={setShowModal} showRegister={setShowRegister} />}
                    <EmployeeList>
                        <EmployeeCardLabel className='label'>
                            <EmployeeHeader>
                                <EmployeeName> Name </EmployeeName>
                                <EmployeeNumber> Employee Number </EmployeeNumber>
                                <EmployeeDays> Days </EmployeeDays>
                                <EmployeeHours> Hours </EmployeeHours>
                            </EmployeeHeader>
                        </EmployeeCardLabel>
                        {employees.map((employee) => (
                            <EmployeeCard
                                key={employee.employeeID}
                                employee={employee}
                                handleSelect={handleSelect}
                                calculateDaysWorked={calculateDaysWorked}
                                calculateHoursWorked={calculateHoursWorked}
                                records={records[employee.employeeID]}
                            />
                        ))}
                    </EmployeeList>
                </InnerBottomContainer>
            </BottomContainer>
            {showModal &&
                <>
                    <Overlay />
                    <Modal ref={modalRef}>
                        {showRegister ?
                            <RegisterCard maxEmployeeNumber={maxEmployeeNumber}/>
                            :
                            <ShiftCard shifts={shifts} />
                        }
                    </Modal>
                </>
            }
        </PageContainer>
    );
};

EmployeePage.propTypes = {
    employeeData: PropTypes.array.isRequired,
};

export default EmployeePage;