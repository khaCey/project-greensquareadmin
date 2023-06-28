import { useState, useContext, useEffect } from 'react';

import { useSession } from './hooks/useSession'; // import the hook
import { EmployeeDataContext } from './contexts/EmployeeDataContext'; // import the context

import { AppContainer as Container } from './Components/StyledComponents';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Loader from './Components/Loader';

import './style.css';

const loadingTime = 1500;

const App = () => {
  const [employeeData, setEmployeeData] = useContext(EmployeeDataContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { startSession, endSession } = useSession(30 * 60 * 1000, setIsAuthenticated, setEmployeeData, employeeData, isAuthenticated);

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
  }, [setEmployeeData]);

  const handleLogout = () => {
    setLoading(true);
    endSession();
    setTimeout(() => {
      setIsAuthenticated(false);
      setLoading(false);
    }, loadingTime);
  };

  return (
    <Container>
      {loading && <Loader />}
      {!isAuthenticated ? (
        <Login
          setIsAuthenticated={setIsAuthenticated}
          setEmployeeData={setEmployeeData}
          setLoading={setLoading}
          loading={loading}
          startSession={startSession}
        />
      ) : (
        <LandingPage 
          logoutHandler={handleLogout} 
          employeeData={employeeData}  
        />
      )} 
    </Container>
  );
};

export default App;
