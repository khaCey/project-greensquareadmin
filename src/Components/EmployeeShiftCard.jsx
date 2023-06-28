import React from 'react';
import { ShiftCard as ShiftCardStyled, ShiftClock, ShiftDate, ShiftCardContainer, ShiftBreak } from './StyledComponents';

export const ShiftCard = ({ shifts }) => (
    <ShiftCardContainer>
        <ShiftCardStyled className='label'>
            <ShiftDate>Date</ShiftDate>
            <ShiftClock>Clock In</ShiftClock>
            <ShiftClock>Clock Out</ShiftClock>
            <ShiftBreak>Break</ShiftBreak>
        </ShiftCardStyled>
        {shifts.map((shift, index) => {
            // Calculate total break time for this shift
            let totalBreakTime = 0;
            let clockInTime = '';
            let clockOutTime = '';
            for (let i = 0; i < shift.length; i++) {
                if (shift[i].type === 'clock-in') {
                    clockInTime = (new Date(shift[i].time)).toLocaleTimeString();
                } else if (shift[i].type === 'clock-out') {
                    clockOutTime = (new Date(shift[i].time)).toLocaleTimeString();
                }
            }

            for (let i = 2; i < shift.length; i += 2) {
                const breakStart = new Date(shift[i - 1].time);
                const breakEnd = new Date(shift[i].time);
                totalBreakTime += breakEnd - breakStart;
            }
            totalBreakTime = (totalBreakTime / (1000 * 60 * 60)).toFixed(2); // Convert to hours

            return (
                <ShiftCardStyled key={index}>
                    <ShiftDate>{(new Date(shift[0].time)).toDateString()}</ShiftDate>
                    <ShiftClock>{clockInTime}</ShiftClock>
                    <ShiftClock>{clockOutTime}</ShiftClock>
                    <ShiftBreak>
                        {totalBreakTime} hrs
                    </ShiftBreak>
                </ShiftCardStyled>
            );
        })}
    </ShiftCardContainer>
);

