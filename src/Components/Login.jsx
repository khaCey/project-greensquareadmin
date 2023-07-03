import { useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import PropTypes from 'prop-types';
import { LoginWrapper, Form, Input, Button } from './LoginStyledComponents'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loadingTime = 1500;

const Login = ({ setIsAuthenticated, setEmployeeData, setLoading, loading, startSession }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeID = e.target.elements.employeeID.value;
    const password = e.target.elements.password.value;
    
    if (!employeeID || !password) {
      toast.error('Employee number and password are required.');
      return;
    }
  
    try {
      await handleLogin(employeeID, password);
    } catch (error) {
      console.log(error);
      toast.error('Login unsuccessful. Please check your credentials and try again.');
    }
  };

  const handleLogin = (employeeID, password) => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_APP_API_URL}employee/login`,
        {
          id: employeeID,
          password: password,
        },
        {
          headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY },
        }
      )
      .then((response) => {
    
        if (response.data.success) {  // check if the login was successful
          // Fetch employee data after successful login
          axios
            .get(`${import.meta.env.VITE_APP_API_URL}employee/${employeeID}`, {
              headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY },
            })
            .then((response) => {
              const employeeData = response.data;
              setEmployeeData(employeeData); // Save the employee data
              localStorage.setItem('employeeData', JSON.stringify(employeeData)); // Store employee data in localStorage
              setTimeout(() => {
                setIsAuthenticated(true);
                setLoading(false);
                startSession(); // start the session when logging in
              }, loadingTime);
            })
            .catch((error) => {
              console.error('Error fetching employee data: ', error);
              setLoading(false);
              toast.error('Error fetching employee data. Please try again later.');
            });
        } else {
          throw new Error('Login unsuccessful. Please check your credentials and try again.'); 
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error('Login unsuccessful. Please check your credentials and try again.');
      });
  };

  useEffect(() => {
    document.title = "Green Square - Login";
}, []);

  return (
    <LoginWrapper>
      <ToastContainer />
      {loading && <Loader />}
      <Form onSubmit={handleSubmit} >
        <Input
          name="employeeID"
          type="text"
          placeholder="Employee Name / Number"
          autoComplete="off"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
        <Button type="submit">Login</Button>
      </Form>
    </LoginWrapper>
  );
  
};

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
    setEmployeeData: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    startSession: PropTypes.func.isRequired,
};

export default Login;