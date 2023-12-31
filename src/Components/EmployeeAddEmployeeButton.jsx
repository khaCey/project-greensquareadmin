import { PersonAdd } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { AddContainer, AddButton, AddEmployee } from './StyledComponents'; // import the relevant styled components

export const AddEmployeeButton = ({ showModal, showRegister }) => {
  return (
    <AddContainer>
        <AddButton variant="primary" onClick={() => {showRegister(true),showModal(true)}}>
            <AddEmployee><PersonAdd style={{ fontSize: '1.5rem' }} /> Add Employee</AddEmployee>
        </AddButton>
    </AddContainer>
    
  );
};

AddEmployeeButton.propTypes = {
    showModal: PropTypes.func.isRequired,
    showRegister: PropTypes.func.isRequired,
};
