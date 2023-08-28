import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        calendarType="US" // Set the calendar type (US format)
      />
    </div>
  );
};

export default MyCalendar;
