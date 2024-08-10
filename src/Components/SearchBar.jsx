import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { IoSearch, IoClose, IoPersonAddSharp } from "react-icons/io5";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { MoonLoader } from "react-spinners";
import { PageContext, StudentContext } from "./Variables"

const data = [
        { studentID: 1, firstName: 'John', lastName: 'Taylor', address: '101 Maple St' },
        { studentID: 2, firstName: 'Sarah', lastName: 'Brown', address: '505 Walnut St' },
        { studentID: 3, firstName: 'Alice', lastName: 'Smith', address: '789 Pine St' },
        { studentID: 4, firstName: 'Jim', lastName: 'Jones', address: '404 Elm St' },
        { studentID: 5, firstName: 'Kevin', lastName: 'Williams', address: '606 Cherry St' },
        { studentID: 6, firstName: 'Laura', lastName: 'Wilson', address: '202 Birch St' },
        { studentID: 7, firstName: 'Mary', lastName: 'Harris', address: '123 Main St' },
        { studentID: 8, firstName: 'Steve', lastName: 'Davis', address: '707 Ash St' },
        { studentID: 9, firstName: 'Jane', lastName: 'Moore', address: '303 Cedar St' },
        { studentID: 10, firstName: 'Bob', lastName: 'Jackson', address: '456 Oak St' },
        { studentID: 11, firstName: 'Sarah', lastName: 'Williams', address: '789 Pine St' },
        { studentID: 12, firstName: 'John', lastName: 'Smith', address: '505 Walnut St' },
        { studentID: 13, firstName: 'Alice', lastName: 'Taylor', address: '123 Main St' },
        { studentID: 14, firstName: 'Steve', lastName: 'Brown', address: '404 Elm St' },
        { studentID: 15, firstName: 'Laura', lastName: 'Moore', address: '202 Birch St' },
        { studentID: 16, firstName: 'Kevin', lastName: 'Jones', address: '606 Cherry St' },
        { studentID: 17, firstName: 'Bob', lastName: 'Wilson', address: '101 Maple St' },
        { studentID: 18, firstName: 'Jim', lastName: 'Harris', address: '303 Cedar St' },
        { studentID: 19, firstName: 'Jane', lastName: 'Jackson', address: '707 Ash St' },
        { studentID: 20, firstName: 'Mary', lastName: 'Davis', address: '456 Oak St' },
        { studentID: 21, firstName: 'Laura', lastName: 'Smith', address: '789 Pine St' },
        { studentID: 22, firstName: 'Alice', lastName: 'Jones', address: '505 Walnut St' },
        { studentID: 23, firstName: 'Kevin', lastName: 'Taylor', address: '101 Maple St' },
        { studentID: 24, firstName: 'Sarah', lastName: 'Wilson', address: '123 Main St' },
        { studentID: 25, firstName: 'Steve', lastName: 'Moore', address: '202 Birch St' },
        { studentID: 26, firstName: 'Bob', lastName: 'Davis', address: '404 Elm St' },
        { studentID: 27, firstName: 'Jim', lastName: 'Brown', address: '707 Ash St' },
        { studentID: 28, firstName: 'John', lastName: 'Jackson', address: '606 Cherry St' },
        { studentID: 29, firstName: 'Mary', lastName: 'Harris', address: '456 Oak St' },
        { studentID: 30, firstName: 'Jane', lastName: 'Williams', address: '303 Cedar St' },
        { studentID: 31, firstName: 'Alice', lastName: 'Smith', address: '123 Main St' },
        { studentID: 32, firstName: 'Kevin', lastName: 'Jones', address: '101 Maple St' },
        { studentID: 33, firstName: 'Laura', lastName: 'Taylor', address: '404 Elm St' },
        { studentID: 34, firstName: 'Sarah', lastName: 'Wilson', address: '202 Birch St' },
        { studentID: 35, firstName: 'Steve', lastName: 'Brown', address: '789 Pine St' },
        { studentID: 36, firstName: 'Jim', lastName: 'Davis', address: '505 Walnut St' },
        { studentID: 37, firstName: 'Bob', lastName: 'Moore', address: '606 Cherry St' },
        { studentID: 38, firstName: 'Mary', lastName: 'Jackson', address: '303 Cedar St' },
        { studentID: 39, firstName: 'Jane', lastName: 'Harris', address: '101 Maple St' },
        { studentID: 40, firstName: 'Alice', lastName: 'Williams', address: '707 Ash St' },
        { studentID: 41, firstName: 'Kevin', lastName: 'Smith', address: '456 Oak St' },
        { studentID: 42, firstName: 'Sarah', lastName: 'Taylor', address: '404 Elm St' },
        { studentID: 43, firstName: 'Laura', lastName: 'Jones', address: '123 Main St' },
        { studentID: 44, firstName: 'Steve', lastName: 'Wilson', address: '202 Birch St' },
        { studentID: 45, firstName: 'Jim', lastName: 'Moore', address: '505 Walnut St' },
        { studentID: 46, firstName: 'Bob', lastName: 'Davis', address: '606 Cherry St' },
        { studentID: 47, firstName: 'John', lastName: 'Brown', address: '707 Ash St' },
        { studentID: 48, firstName: 'Alice', lastName: 'Jackson', address: '303 Cedar St' },
        { studentID: 49, firstName: 'Jane', lastName: 'Harris', address: '789 Pine St' },
        { studentID: 50, firstName: 'Mary', lastName: 'Williams', address: '456 Oak St' }
];

const ComponentContainer = styled.div`  
    margin-top: 1em;
    margin-bottom: 1em;
    display : flex;
    flex-direction: row;
`;

const SearchContainer = styled(motion.div)`
    background-color: white;
    border: 1px solid #bebebe;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
    z-index: 99;
`;

const SearchBarContainer = styled.div`
    display: flex;
    align-items: center;
    max-width:50vw;
`;

const SearchBarInput = styled.input`
    outline: none;
    border: none;
    width: 50vw;
    padding: 5px;
    padding-left: 1vw;
    padding-right: 1vw;

    &:focus{
        online: none;
    }
    &placeholder {
        color: #bebebe;
        transition: all 250ms ease-in-out;
    }
`;

const CloseIcon = styled(motion.span)`
    color: #bebebe;
    margin: 0.5em;
    transition: all 200ms ease-in-out; 
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover{
        color: #dfdfdf;
    }
`;

const SearchIcon = styled.span`
    color: #bebebe;
    margin: 0.5em;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover{
        color: #dfdfdf;
    }
`;

const LoadingWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const WarningMessage = styled.span`
    color: #a1a1a1;
    display: flex;
    align-self: center;
    justify-self: center;
`;

const SearchContent = styled.ul`
    width: auto;
    height: 12.8em;
    margin: 0;
    padding: 0;
    overflow-y: scroll;

    &::-webkit-scrollbar{
        width: 0.5vw;
    }
`;

const AddStudent = styled.div`
    height: 2.3em;
    width: 5vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #bebebe;
    border: 1px solid #bebebe;
    margin-left: 2.5vw;
    background-color: white;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
    &:hover{
        cursor:pointer;
        color: #dfdfdf;
    }
`;
const StudentContainer = styled.div`
`;
const containerVariants = {
    expanded: {
        height: "15em",
    },
    collapsed: {
        height: "2.3em",
    }
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150, ease: "easeInOut" };

const SearchBar = () => {
    const { setCurrentStudent } = useContext(StudentContext);
    const { setCurrentPage } = useContext(PageContext);

    const [parentRef, isClickedOutside] = useClickOutside();
    const searchRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const isEmpty = !result || result.length === 0;

    const focusSearch = () => {
        searchRef.current.focus();
        setExpanded(true);
    }

    useEffect(() => {
        if (isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    const handleStudent = (event, studentID) => {
        event.preventDefault();
        setCurrentPage('Students');
        setCurrentStudent(studentID);
        collapseContainer();
    }

    useEffect(() => {
        setLoading(true);
        setNoResults(false);
        const filteredData = data.filter(item =>
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResult(filteredData);
        setLoading(false);
        setNoResults(filteredData.length === 0);

    }, [searchQuery]);

    const handleAddStudent = (event) => {
        event.preventDefault();
        setCurrentPage("AddStudent");
    }

    const expandContainer = () => {
        setExpanded(true);
        const filteredData = data.filter(item =>  
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResult(filteredData);
    };

    const collapseContainer = () => {
        setExpanded(false);
        setSearchQuery("");
        setResult([]);
        if (searchRef.current) searchRef.current.value = "";
    };

    return (
        <ComponentContainer>
            <SearchContainer
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={containerVariants}
                transition={containerTransition}
                ref={parentRef}
            >
                <SearchBarContainer>
                    <SearchIcon>
                        <IoSearch
                            className="searchBarIcon"
                            onClick={focusSearch} />
                    </SearchIcon>
                    <SearchBarInput
                        type="text"
                        className="searchbar"
                        placeholder="Search"
                        ref={searchRef}
                        onFocus={expandContainer}
                        onChange={event => setSearchQuery(event.target.value)}
                    />
                    <AnimatePresence>
                        {isExpanded && (
                            <CloseIcon
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={collapseContainer}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <IoClose />
                            </CloseIcon>
                        )}
                    </AnimatePresence>
                </SearchBarContainer>
                {isExpanded && (
                    <SearchContent>
                        {isLoading && (
                            <LoadingWrapper>
                                <MoonLoader loading color="#000" size={20} />
                            </LoadingWrapper>
                        )}
                        {!isLoading && isEmpty && !noResults && (
                            <AnimatePresence>
                                <LoadingWrapper
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2, ease: "easeIn" }}
                                >
                                    <WarningMessage>Type to Search</WarningMessage>
                                </LoadingWrapper>
                            </AnimatePresence>

                        )}
                        {!isLoading && noResults && (
                            <LoadingWrapper>
                                <WarningMessage>No Student Found!</WarningMessage>
                            </LoadingWrapper>
                        )}

                        {result.map((val) => {
                            return (
                                <StudentContainer>
                                    <li key={val.studentID} className="searchResultRow">
                                        <span key={val.studentID} className="studentID">{val.studentID}</span>
                                        <span key={val.lastName}  className="lastName">{val.lastName}, </span>
                                        <span key={val.firstName} className="firstName">{val.firstName}</span>
                                        <span key={val.address}   className="address">{val.address}</span>
                                    </li>
                                </StudentContainer>
                            )
                        })}
                    </SearchContent>
                )}
            </SearchContainer >
            <AddStudent
                onClick={event => handleAddStudent(event)}
            >
                <IoPersonAddSharp className="addIcon" />
            </AddStudent>
        </ComponentContainer>
    )
}
export default SearchBar
