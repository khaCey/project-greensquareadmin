import React, { useState } from 'react';
import styled from 'styled-components';
import { PencilFill, TrashFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { AnimatePresence } from 'framer-motion';
import Modal from './Modal';

const TimeCard = styled.ul`
  padding: 0.5em;
  margin: 0.5em;
  background-color: #333840 ;
  &:hover{
    background-color: #3d434b;
  }
`;

const ListItem = styled.li`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const DateEntry = styled.p`
`;

const TimeEntry = styled.p`
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
`;

export const EmployeeContent = ({ selectedEmployee, records, setEditRecord, editRecord }) => {

    return (
      <Content>
        {selectedEmployee && records[selectedEmployee] && records[selectedEmployee].map((record) => {
          const date = new Date(record.time);
          const formattedDate = `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + date.getDate()).slice(-2)}`;
          const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });
  
          return (
            <TimeCard key={record.id}>
              <ListItem>
                <DateEntry>{formattedDate}</DateEntry>
                <TimeEntry>{formattedTime}</TimeEntry>
                <PencilFill style={{ cursor: 'pointer' }} onClick={() => open(record)} />
                <TrashFill 
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => {
                    record.isDeleted = true;
                  }}
                />
              </ListItem>
            </TimeCard>
          );
        })}
      </Content>
    );
  };