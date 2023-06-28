import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ClockFill } from 'react-bootstrap-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ClockInWrapper = styled.div`
`;

const Clock = styled(ClockFill)`
  margin: 0.5em;
`;

const Button = styled(motion.button)`
  background-color: #4CAF50;
  margin-right: 1em;
  width: 9em;
  height: 100%;
  border: none;
  color: white;
  border-radius: 0.25em;
  text-decoration: none;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: stretch;
`;

const Text = styled.div`
`;

const ClockOutButton = styled(Button)`
  background-color: #FF4136;
`;

const ClockIn = ({ employeeID }) => {
  const [clockedIn, setClockedIn] = useState(null);

  const fetchLatestRecord = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}records/latest/${employeeID}`,
        {
          headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY },
        }
      );
      const latestRecord = response.data[0];
      setClockedIn(latestRecord && latestRecord.type === 'clock-in');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestRecord();
  }, []);

  const handleClockInOut = async () => {
    const actionType = clockedIn ? 'clock-out' : 'clock-in';

    // Optimistically update state
    setClockedIn(actionType === 'clock-in');

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}records`,
        {
          employeeID: employeeID,
          time: new Date().toString(),
          type: actionType,
        },
        {
          headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY },
        }
      );
    
      // Fetch latest record to ensure state is in sync with the server
      fetchLatestRecord();
    } catch (error) {
      console.log(error);
      // Revert state if there was an error
      setClockedIn(clockedIn);
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <ClockInWrapper>
      {clockedIn ? (
        <ClockOutButton onClick={handleClockInOut}>
          <Clock/>
          <Text>CLOCK OUT</Text>
        </ClockOutButton>
      ) : (
        <Button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          onClick={handleClockInOut}
        >
          <Clock/>
          <Text>CLOCK IN</Text>
        </Button>
      )}
    </ClockInWrapper>
  );
};

export default ClockIn;
