import styled from 'styled-components';

export const EmployeePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const EmployeeCard = styled.div`
  &:not(.label){
    border-top: 1px solid #3d3f51;
    position: relative;
    cursor: pointer;
  }
  &:not(.label):hover {
    background-color: #3d434b;
  }
`;

export const EmployeeHeader = styled.div`
  position: sticky; 
  top: 0;
  padding: 5px 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EmployeeName = styled.h3`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
  margin-left: 0.5em;
`;

export const EmployeeNumber = styled.div`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
`;

export const EmployeeDays = styled.h3`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
`;

export const EmployeeHours = styled.h3`
  color: white;
  font-size: 1em;
  font-weight: 300;
  width: 25%;
  margin-right: 0.5em;
`;

export const UpperContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const PageName = styled.div`
  margin-left: 1em;
`;

export const BottomContainer = styled.div`
  flex-grow: 1;
  height: 93vh;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
`;

export const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const AddEmployee = styled.div`
  background-color: rgba(60, 253, 79, 0.5);
  border-radius: 10px;
  padding: 0.25em;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  &:hover{
    background-color: rgba(60, 253, 79, 0.25);
  }
`;

export const AddButton = styled.div`
  cursor: pointer;
  width: 10em;
  margin-right: 1em;
  margin-top: 1em;
`;

export const InnerBottomContainer = styled.div`
  margin-right: 1em;
  margin-left: 1em;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2B2F33;
  position: relative;
`;


export const EmployeeList = styled.div`
  border-radius: 5px;
  padding: 1em;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

export const Modal = styled.div`
  position: fixed;
  width: 75%;
  height: 75%;
  outline: 1px solid white;
  background: grey;
  z-index: 3;
`;

export const RecordCard = styled.div`
  width: 100%;
  padding: 1em;
  border-top: 1px solid #3d3f51;
  position: relative;
  cursor: pointer;
`;