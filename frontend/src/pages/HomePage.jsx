import React, { useState } from 'react';
import Logout from '../components/Logout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles

const HomePage = () => {
  const [date, setDate] = useState(new Date()); // To track selected date
  const [leaveDays, setLeaveDays] = useState([]); // To store leave days

  // Function to handle date selection
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to mark a leave day
  const markLeaveDay = () => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    if (!leaveDays.includes(formattedDate)) {
      setLeaveDays([...leaveDays, formattedDate]);
      alert(`Leave marked for ${formattedDate}`);
    } else {
      alert(`Leave already marked for ${formattedDate}`);
    }
  };

  // Function to check if the day is a leave day
  const tileClassName = ({ date, view }) => {
    // Only apply custom styles to day view
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      return leaveDays.includes(formattedDate) ? 'leave-day' : null; // Highlight leave days
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      <Logout />
      <a href='/user_registration'>User Registration</a><br />
      <a href='/users'>Users</a>

      {/* Calendar Component */}
      <div className="calendar-container">
        <h3>Mark Leave Day</h3>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={tileClassName}
        />
        <button className="btn btn-primary mt-3" onClick={markLeaveDay}>
          Mark Leave
        </button>
      </div>

      {/* Optional: You can display the leave days */}
      <div className="leave-days">
        <h4>Leave Days</h4>
        <ul>
          {leaveDays.length > 0 ? (
            leaveDays.map((day, index) => <li key={index}>{day}</li>)
          ) : (
            <li>No leave days marked.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
