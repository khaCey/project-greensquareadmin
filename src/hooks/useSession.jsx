import { useState, useEffect, useCallback } from 'react';

export const useSession = (sessionLength, setIsAuthenticated, setEmployeeData, employeeData, isAuthenticated) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const alertString = "You have been logged out!Please Login Again! "
  const startSession = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  const endSession = useCallback(() => {
    setIsAuthenticated(false);
    setEmployeeData(null); // clear the employeeData
  }, [setIsAuthenticated, setEmployeeData]);

  const maintainSession = useCallback(() => {
    setLastActivity(Date.now());
  }, []);


  // Modified useEffect for checking session timeout and maintaining the session
  useEffect(() => {
    const intervalId = setInterval(() => {
      if ((Date.now() > lastActivity + sessionLength || !employeeData) && isAuthenticated) {
        alert(alertString);
        endSession();
      }
    }, 1000);

    window.addEventListener('mousemove', maintainSession);
    window.addEventListener('keypress', maintainSession);
    window.addEventListener('touchmove', maintainSession);

    return () => {
      clearInterval(intervalId);

      window.removeEventListener('mousemove', maintainSession);
      window.removeEventListener('keypress', maintainSession);
      window.removeEventListener('touchmove', maintainSession);
    };
  }, [maintainSession, endSession, lastActivity, sessionLength, employeeData, isAuthenticated]);

  return { startSession, endSession };
};
