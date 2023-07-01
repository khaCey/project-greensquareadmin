import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DashboardPage from './DashboardPage';
import EmployeePage from './EmployeePage';
import Navigation from './Navigation';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const PageContainer = styled.div`
  height: 100vh;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212529;
  z-index: 0;
`;

const LandingPage = ({ logoutHandler, employeeData }) => {
    const [selected, setSelected] = useState('dashboard');
    return (
        <Container>
            <Navigation selected={selected} setSelected={setSelected} employeeData={employeeData} logoutHandler={logoutHandler} />
            <PageContainer>
                {selected === 'dashboard' && <DashboardPage employeeData={employeeData} />}
                {selected === 'employees' && <EmployeePage employeeData={employeeData} />}
            </PageContainer>
        </Container>
    );
};

LandingPage.propTypes = {
    logoutHandler: PropTypes.func.isRequired,
    employeeData: PropTypes.array.isRequired,
};

export default LandingPage;
