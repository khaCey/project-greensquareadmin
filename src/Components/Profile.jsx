import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { EmployeeDataContext } from '../contexts/EmployeeDataContext'; // import the context

const ProfileBanner = styled.div`
  background-color: #2B2F33;
  height: 93vh;
  color: #BDCDD6;
  box-sizing: border-box;
  padding: 1em;
  margin-right: 1em;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  outline: 1px solid white;
  width: 18vw;
  padding-top: 1em;
`;

const Profile = () => {
    const [employeeData] = useContext(EmployeeDataContext); // use the context
    const [hoursWorkedThisMonth, setHoursWorkedThisMonth] = useState(0);
    const [daysWorkedThisMonth, setDaysWorkedThisMonth] = useState(0);
  
    useEffect(() => {
      const fetchRecordsForMonth = async () => {
        try {
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

          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}records/${employeeData[0].employeeID}/${startDate.toISOString()}/${endDate.toISOString()}`,
            {
              headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY }
            }
          );
    
          let records = response.data;
          // If the first record's time is before the start date, remove it
          if (records.length > 0 && new Date(records[0].time) < startDate) {
            records = records.slice(1);
          }
    
          let totalHours = 0;
          let daysWorked = new Set(); // Use a Set to avoid counting the same day multiple times
    
          // Exclude the last record if its type is 'clockin'
          const loopLimit = records[records.length - 1].type === 'clockin' ? records.length - 1 : records.length;
    
          for (let i = 0; i < loopLimit; i += 2) {
            const clockInTime = new Date(records[i].time);
            if (i + 1 < loopLimit) { // Ensure that the record exists before accessing its time
              const clockOutTime = new Date(records[i + 1].time);
              if (clockInTime && clockOutTime) {
                const hoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60);
                totalHours += hoursWorked;
                daysWorked.add(clockInTime.toDateString());
              }
            }
          }
    
          setHoursWorkedThisMonth(totalHours);
          setDaysWorkedThisMonth(daysWorked.size);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchRecordsForMonth();
    }, [employeeData]);
  
    return (
      <ProfileBanner>
        <Content>
          NAME: 
          <br/>
          {employeeData[0].firstName}
          <br/>
          <br/>
          EMPLOYEE NUMBER: 
          <br/>
          {employeeData[0].employeeID}
          <br/>
          <br/>
          HOURS WORKED THIS MONTH: 
          <br/>
          {hoursWorkedThisMonth}
          <br/>
          <br/>
          DAYS WORKED THIS MONTH:
          <br/>
          {daysWorkedThisMonth}
        </Content>
      </ProfileBanner>
    );
  };
  
  export default Profile;