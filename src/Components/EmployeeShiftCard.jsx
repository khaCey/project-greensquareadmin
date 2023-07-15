import PropTypes from 'prop-types';
import { ShiftCard as ShiftCardStyled, ShiftClock, ShiftDate, ShiftCardContainer, ShiftTotal, ShiftBreak } from './EmployeePageStyledComponents';

function decimalToHrsMins(time) {
    const hrs = Math.floor(time);
    const mins = Math.round((time - hrs) * 60);
    return `${hrs} hrs ${mins} mins`;
}

export const ShiftCard = ({ shifts }) => (
    <ShiftCardContainer>
        <ShiftCardStyled className='label'>
            <ShiftDate>Date</ShiftDate>
            <ShiftClock>Clock In</ShiftClock>
            <ShiftClock>Clock Out</ShiftClock>
            <ShiftTotal>Total</ShiftTotal>
            <ShiftBreak>Break</ShiftBreak>
        </ShiftCardStyled>
        {shifts.map((shift, index) => {
            // Calculate total break time for this shift
            let totalBreakTime = 0;
            let clockInTime = '';
            let clockOutTime = '';

            // Get first clock in and last clock out
            shift.forEach((s) => {
                if (s.type === 'clock-in' && !clockInTime) {
                    clockInTime = new Date(s.time);
                    if (isNaN(clockInTime)) {
                        // handle invalid date here
                        console.error('Invalid clock-in time:', s.time);
                        clockInTime = null;
                    }
                } else if (s.type === 'clock-out') {
                    clockOutTime = new Date(s.time);
                    if (isNaN(clockOutTime)) {
                        // handle invalid date here
                        console.error('Invalid clock-out time:', s.time);
                        clockOutTime = null;
                    }
                }
            });


            for (let i = 2; i < shift.length; i += 2) {
                const breakStart = new Date(shift[i - 1].time);
                const breakEnd = new Date(shift[i].time);
                totalBreakTime += breakEnd - breakStart;
            }
            totalBreakTime = totalBreakTime / (1000 * 60 * 60); // Convert to hours

            const totalHoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60); // Convert to hours
            const workedHours = totalHoursWorked - totalBreakTime;

            return (
                <ShiftCardStyled key={index}>
                    <ShiftDate>{clockInTime.toDateString()}</ShiftDate>
                    <ShiftClock>{clockInTime.toLocaleTimeString()}</ShiftClock>
                    <ShiftClock>{clockOutTime.toLocaleTimeString()}</ShiftClock>
                    <ShiftTotal>
                        {decimalToHrsMins(workedHours)}
                    </ShiftTotal>
                    <ShiftBreak>
                        {decimalToHrsMins(totalBreakTime)}
                    </ShiftBreak>
                </ShiftCardStyled>
            );
        })}
    </ShiftCardContainer>
);

ShiftCard.propTypes = {
    shifts: PropTypes.array.isRequired,
};
