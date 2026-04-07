import React from 'react';
import CalendarHeader from './CalendarHeader.jsx';
import CalendarNotes from './CalendarNotes.jsx';
import CalendarGrid from './CalendarGrid.jsx';

export default function CalendarPage({
  date,
  theme,
  startDate,
  endDate,
  hoverDate,
  setHoverDate,
  onDateClick,
  monthNotes,
  setMonthNotes,
  handleDeleteNote
}) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthKey = `${year}-${month}`;

  return (
    <div className="calendar-page">
      <CalendarHeader date={date} theme={theme} />

      <div className="bottom-content">
        <CalendarNotes 
          monthKey={monthKey}
          theme={theme}
          monthNotes={monthNotes}
          setMonthNotes={setMonthNotes}
          handleDeleteNote={handleDeleteNote}
        />
        <CalendarGrid 
          date={date}
          theme={theme}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          setHoverDate={setHoverDate}
          onDateClick={onDateClick}
        />
      </div>
    </div>
  );
}
