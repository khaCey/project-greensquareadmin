import { useState, useEffect, useCallback } from 'react';

export const useSession = (sessionLength, setIsAuthenticated, setEmployeeData, employeeData, isAuthenticated) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const startSession = useCallback(() => {
    localStorage.setItem('isAuthenticated', 'true');
    setLastActivity(Date.now());
  }, []);

  const endSession = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setEmployeeData(null); // clear the employeeData
  }, [setIsAuthenticated, setEmployeeData]);

  const maintainSession = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // useEffect for checking saved session, runs only once
  useEffect(() => {
    const savedSession = localStorage.getItem('isAuthenticated');
    if (savedSession) {
      setIsAuthenticated(true);
      startSession();
    }
  }, [setIsAuthenticated, startSession]);

  // Modified useEffect for checking session timeout and maintaining the session
  useEffect(() => {
    const intervalId = setInterval(() => {
      if ((Date.now() > lastActivity + sessionLength || !employeeData) && isAuthenticated) {
        alert("Session timed out.");
        endSession();
      }
    }, 1000);

    window.addEventListener('mousemove', maintainSession);
    window.addEventListener('mousedown', maintainSession);
    window.addEventListener('keypress', maintainSession);
    window.addEventListener('touchmove', maintainSession);
    window.addEventListener('scroll', maintainSession);

    return () => {
      clearInterval(intervalId);

      window.removeEventListener('mousemove', maintainSession);
      window.removeEventListener('mousedown', maintainSession);
      window.removeEventListener('keypress', maintainSession);
      window.removeEventListener('touchmove', maintainSession);
      window.removeEventListener('scroll', maintainSession);
    };
  }, [maintainSession, endSession, lastActivity, sessionLength, employeeData, isAuthenticated]);

  return { startSession, endSession };
};
