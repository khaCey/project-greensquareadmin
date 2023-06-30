import React, { useEffect } from 'react';
import ClockInOut from "./ClockInOut";
import { DashboardContainer, DashboardUpperContainer as UpperContainer, DashboardBottomContainer as BottomContainer, PageName, DashboardInnerContainer as Container, } from './StyledComponents';
import ProfileBanner from "./Profile";
import Alerts from "./Alerts";
import ToDoListComponent from "./ToDoListComponent";

const DashboardPage = ({ employeeID, employeeData }) => {
    
    useEffect(() => {
        document.title = "Green Square - Dashboard";
    }, []);
    return (
        <DashboardContainer>
            <UpperContainer>
                <PageName>
                    <h1>Dashboard</h1>
                </PageName>
                <ClockInOut employeeID={employeeData[0].employeeID}/>
            </UpperContainer>
            <BottomContainer>
                <Container>    
                    <Alerts/>
                    <Revenue/>
                    <ToDoListComponent/>
                </Container>
                <ProfileBanner employeeData={employeeData}/>
            </BottomContainer>
        </DashboardContainer>
    );
};

export default DashboardPage;
