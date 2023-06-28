import React from "react";
import styled from "styled-components";

const Banner = styled.div` 
    flex-grow: 1;
    box-sizing: border-box;
    background-color: #2B2F33;
    padding: 1em;
    color: white;
`;

const ToDoListComponent = () =>{
    return(
        <Banner>
            <h3>TO DO LIST</h3>    
        </Banner>
    );
};

export default ToDoListComponent;