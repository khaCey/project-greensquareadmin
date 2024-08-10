import { useEffect } from 'react';
import ClockInOut from "./ClockInOut";
import PropTypes from 'prop-types';
import { DashboardBottomContainer as BottomContainer, DashboardInnerContainer as Container } from './StyledComponents';
import { PageContainer, UpperContainer, Name } from './PageStyledComponents';
import SearchBar from './SearchBar';
import ProfileBanner from "./Profile";
import Alerts from "./Alerts";
import Revenue from "./Revenue";
import ToDoListComponent from "./ToDoListComponent";



const DashboardPage = ({ employeeData }) => {
    
    useEffect(() => {
        document.title = "Green Square - Dashboard";
    }, []);

    return (
        <PageContainer>
            <SearchBar />
        </PageContainer>
    );
};

DashboardPage.propTypes = {
    employeeData: PropTypes.array.isRequired,
};

export default DashboardPage;
