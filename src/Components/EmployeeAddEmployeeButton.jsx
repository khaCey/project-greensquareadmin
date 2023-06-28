import React from 'react';
import { PersonAdd } from 'react-bootstrap-icons';
import { AddContainer, AddButton, AddEmployee } from './StyledComponents'; // import the relevant styled components

export const AddEmployeeButton = ({ showModal }) => {
  return (
    <AddContainer>
        <AddButton variant="primary" onClick={() => showModal(true)}>
            <AddEmployee><PersonAdd style={{ fontSize: '1.5rem' }} /> Add Employee</AddEmployee>
        </AddButton>
    </AddContainer>
    
  );
};
