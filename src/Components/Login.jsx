import axios from 'axios';
import styled from 'styled-components';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const loadingTime = 1500;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #212529;
  color: #8B8E90;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #BDCDD6;
  width: 300px;
  background-color: #2B2F33;
  color: white;
  &:focus {
    outline: 2px solid #BDCDD6;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
`;

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

  return (
    <LoginWrapper>
      <ToastContainer />
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Input
          name="employeeID"
          type="text"
          placeholder="Employee Name / Number"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
      </Form>
    </LoginWrapper>
  );
  
};

export default Login;