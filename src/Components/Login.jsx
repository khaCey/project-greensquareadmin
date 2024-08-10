import { useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import PropTypes from 'prop-types';
import { LoginWrapper, Form, Input, Button } from './LoginStyledComponents'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from "./Banner";

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

    // Check for dev credentials
    if (employeeID === 'dev' && password === 'dev') {
      handleDevLogin().catch(error => {
        console.error('Error during dev login:', error);
        toast.error('Error during dev login. Please try again.');
      });
    } else {
      try {
        await handleLogin(employeeID, password);
      } catch (error) {
        console.log(error);
        toast.error('Login unsuccessful. Please check your credentials and try again.');
      }
    }
  };

  const handleDevLogin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, loadingTime));
    const devData = [{ name: 'Developer', role: 'Admin', employeeID: 'dev' }];
    setEmployeeData(devData);
    localStorage.setItem('employeeData', JSON.stringify(devData));
    setIsAuthenticated(true);
    setLoading(false);
    startSession();
    toast.success('Logged in as Developer');
  };

  const handleLogin = (employeeID, password) => {
    console.log('Starting login process...'); // Debug log
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
        console.log('Login response:', response); // Debug log
        
        if (response.data.success) {  // check if the login was successful
          console.log('Login successful, fetching employee data...'); // Debug log
          // Fetch employee data after successful login
          axios
            .get(`${import.meta.env.VITE_APP_API_URL}employee/${employeeID}`, {
              headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY },
            })
            .then((response) => {
              console.log('Employee data response:', response); // Debug log
              const employeeData = [response.data]; // Ensure employeeData is an array
              setEmployeeData(employeeData); // Save the employee data
              localStorage.setItem('employeeData', JSON.stringify(employeeData)); // Store employee data in localStorage
              setTimeout(() => {
                setIsAuthenticated(true);
                setLoading(false);
                startSession(); // start the session when logging in
                console.log('Session started and user authenticated.'); // Debug log
              }, loadingTime);
            })
            .catch((error) => {
              console.error('Error fetching employee data: ', error);
              setLoading(false);
              toast.error('Error fetching employee data. Please try again later.');
            });
        } else {
          console.log('Login failed:', response.data.message); // Debug log
          throw new Error('Login unsuccessful. Please check your credentials and try again.'); 
        }
      })
      .catch((error) => {
        console.log('Error during login request:', error); // Debug log
        setLoading(false);
        toast.error('Login unsuccessful. Please check your credentials and try again.');
      });
  };

  useEffect(() => {
    document.title = "Green Square - Login";
    console.log('Login component mounted.'); // Debug log
  }, []);

  return (
    <LoginWrapper>
      
      <Banner> The Username is : dev and Password is : dev </Banner>
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
