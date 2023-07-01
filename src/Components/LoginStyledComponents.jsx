import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #212529;
  color: #8B8E90;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #BDCDD6;
  width: 300px;
  background-color: #2B2F33;
  color: white;
  &:focus {
    outline: 2px solid #BDCDD6;
  }
`;

export const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
`;