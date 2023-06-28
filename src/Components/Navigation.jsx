import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
    Speedometer2,
    CardChecklist,
    Calendar2DayFill,
    BoxArrowLeft,
    ListUl,
    ThreeDotsVertical,
    PeopleFill,
    PersonBadgeFill
  } from 'react-bootstrap-icons';
import { Nav, NavContainer, NavList, NavListItem, NavHideButton, NavLabel, NavName } from './StyledComponents';

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
            <NavList>
            <NavContainer>
                <NavListItem>
                    <NavHideButton onClick={handleHide}>
                        {hide ? <ListUl size={20} /> : <ThreeDotsVertical size={20} />}
                    </NavHideButton>
                </NavListItem>
                <NavListItem
                className="default"
                selected={selected === 'dashboard'}
                onClick={() => handleSelect('dashboard')}
                >
                    <Speedometer2 size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <NavLabel
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NavName>DASHBOARD</NavName>
                            </NavLabel>
                        )}
                    </AnimatePresence>
                </NavListItem>
                <NavListItem
                className="default"
                selected={selected === 'tasks'}
                onClick={() => handleSelect('tasks')}
                >
                    <CardChecklist size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <NavLabel
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NavName>TASKS</NavName>
                            </NavLabel>
                        )}
                    </AnimatePresence>
                </NavListItem>
                <NavListItem
                className="default"
                selected={selected === 'calendar'}
                onClick={() => handleSelect('calendar')}
                >
                    <Calendar2DayFill size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <NavLabel
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NavName>CALENDAR</NavName>
                            </NavLabel>
                        )}
                    </AnimatePresence>
                </NavListItem>
                <NavListItem
                className="default"
                selected={selected === 'students'}
                onClick={() => handleSelect('students')}
                >
                    <PersonBadgeFill size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <NavLabel
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NavName>STUDENTS</NavName>
                            </NavLabel>
                        )}
                    </AnimatePresence>
                </NavListItem>
                {employeeData[0].privileges === 'admin' && (
                <>
                    <NavListItem
                    className="default"
                    selected={selected === 'employees'}
                    onClick={() => handleSelect('employees')}
                    >
                    <PeopleFill size={25} />
                    <AnimatePresence>
                        {!hide && (
                            <NavLabel
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <NavName>EMPLOYEES</NavName>
                            </NavLabel>
                        )}
                    </AnimatePresence>
                    </NavListItem>
                </>
                
                )}
            </NavContainer>
            <NavListItem className="logout" onClick={handleLogout}>
                <BoxArrowLeft size={25} />
                <AnimatePresence>
                    {!hide && (
                        <NavLabel
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        >
                        <NavName>LOGOUT</NavName>
                        </NavLabel>
                    )}
                </AnimatePresence>
            </NavListItem>
            {/* Similar code for other list items */}
            </NavList>
        </Nav>
    )
}

export default Navigation;