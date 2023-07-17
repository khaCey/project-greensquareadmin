import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { Speedometer2, CardChecklist, Calendar2DayFill, BoxArrowLeft, ListUl, PeopleFill, PersonBadgeFill, LayoutSidebar, LayoutSplit } from 'react-bootstrap-icons';
import { Nav, Container, List, ListItem, HideButton, Label, Name } from './NavigationStyledComponents';

const Navigation = ({selected, setSelected, employeeData, logoutHandler}) => {
    const [hide, setHide] = useState(false);
    const handleHide = () => {
      setHide(!hide);
    };
  
    const handleSelect = (name) => {
      setSelected(name);
    };
  
    const handleLogout = () => {
      logoutHandler(false);
    };

    return (
        <Nav
        animate={{ width: hide ? '3em' : '15em' }}
        transition={{ duration: 1.2 }}
        >
            <List>
            <Container>
                <ListItem>
                    <HideButton onClick={handleHide}>
                        {hide ? <LayoutSidebar size={20} /> : <LayoutSplit size={20} />}
                    </HideButton>
                </ListItem>
                <ListItem
                    className="default"
                    selected={selected === 'dashboard'}
                    onClick={() => handleSelect('dashboard')}
                >
                    <Speedometer2 size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <Label
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Name>DASHBOARD</Name>
                            </Label>
                        )}
                    </AnimatePresence>
                </ListItem>
                <ListItem
                    className="default"
                    selected={selected === 'tasks'}
                    onClick={() => handleSelect('tasks')}
                >
                    <CardChecklist size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <Label
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Name>TASKS</Name>
                            </Label>
                        )}
                    </AnimatePresence>
                </ListItem>
                <ListItem
                    className="default"
                    selected={selected === 'calendar'}
                    onClick={() => handleSelect('calendar')}
                >
                    <Calendar2DayFill size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <Label
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Name>CALENDAR</Name>
                            </Label>
                        )}
                    </AnimatePresence>
                </ListItem>
                <ListItem
                    className="default"
                    selected={selected === 'students'}
                    onClick={() => handleSelect('students')}
                >
                    <PersonBadgeFill size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <Label
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Name>STUDENTS</Name>
                            </Label>
                        )}
                    </AnimatePresence>
                </ListItem>
                {(employeeData[0].privileges === 'admin' || employeeData[0].privileges === 'manager') && (
                      <>
                    <ListItem
                        className="default"
                        selected={selected === 'employees'}
                        onClick={() => handleSelect('employees')}
                    >
                    <PeopleFill size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <Label
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Name>EMPLOYEES</Name>
                            </Label>
                        )}
                    </AnimatePresence>
                    </ListItem>
                </>
                
                )}
            </Container>
            <ListItem className="logout" onClick={handleLogout}>
                <BoxArrowLeft size={25} />
                <AnimatePresence>
                    {!hide && (
                        <Label
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                        <Name>LOGOUT</Name>
                        </Label>
                    )}
                </AnimatePresence>
            </ListItem>
            {/* Similar code for other list items */}
            </List>
        </Nav>
    )
}

Navigation.propTypes = {
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    employeeData: PropTypes.array.isRequired,
    logoutHandler: PropTypes.func.isRequired,
};

export default Navigation;