import React, { Suspense, useState } from 'react';
import styled from 'styled-components';

import Loader from './Loader';
const DashboardPage = React.lazy(() => import('./DashboardPage'));
const EmployeePage = React.lazy(() => import('./EmployeePage'));
const Navigation = React.lazy(() => import('./Navigation'));

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
      <Navigation selected={selected} setSelected={setSelected} employeeData={employeeData} logoutHandler={logoutHandler}/>
      <PageContainer>
        {selected === 'dashboard' && 
            <Suspense fallback={<Loader/>}>
                <DashboardPage employeeData={employeeData} />
            </Suspense>    
        }
        {selected === 'employees' && 
            <Suspense fallback={<Loader/>}>
                <EmployeePage employeeData={employeeData} />
            </Suspense>
        }
      </PageContainer>
    </Container>
  );
};

export default LandingPage;
