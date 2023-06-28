import React, { createContext, useState, useEffect } from 'react';

export const EmployeeDataContext = createContext();

export const EmployeeDataProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    return storedEmployeeData ? JSON.parse(storedEmployeeData) : null;
  });

  useEffect(() => {
    if (employeeData) {
      localStorage.setItem('employeeData', JSON.stringify(employeeData));
    } else {
      localStorage.removeItem('employeeData');
    }
  }, [employeeData]);

  return (
    <EmployeeDataContext.Provider value={[employeeData, setEmployeeData]}>
      {children}
    </EmployeeDataContext.Provider>
  );
};
