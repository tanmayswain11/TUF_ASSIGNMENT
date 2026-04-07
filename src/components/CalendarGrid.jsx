import React, { useMemo } from 'react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const HOLIDAYS_2026 = {
  '2026-0-26': "Republic Day",
  '2026-2-4': "Holi",
  '2026-2-21': "Id-ul-Fitr",
  '2026-2-26': "Ram Navami",
  '2026-3-3': "Good Friday",
  '2026-4-1': "Buddha Purnima",
  '2026-4-27': "Id-ul-Zuha",
  '2026-5-26': "Muharram",
  '2026-7-15': "Independence Day",
  '2026-7-26': "Milad-Un-Nabi",
  '2026-8-4': "Janmashtami",
  '2026-9-2': "Gandhi Jayanti",
  '2026-9-20': "Dussehra",
  '2026-10-8': "Diwali",
  '2026-10-24': "Guru Nanak Jayanti",
  '2026-11-25': "Christmas"
};

export default function CalendarGrid({ 
  date, 
  theme, 
  startDate, 
  endDate, 
  hoverDate, 
  setHoverDate, 
  onDateClick 
}) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Convert 0 (Sun) - 6 (Sat) to 0 (Mon) - 6 (Sun)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const daysGrid = useMemo(() => {
    const grid = [];
    
    // Previous month days
    for (let i = 0; i < startOffset; i++) {
      grid.push({
        dayNumber: daysInPrevMonth - startOffset + i + 1,
        dateObj: new Date(year, month - 1, daysInPrevMonth - startOffset + i + 1),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({
        dayNumber: i,
        dateObj: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      grid.push({
        dayNumber: i,
        dateObj: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return grid;
  }, [year, month, daysInMonth, startOffset, daysInPrevMonth]);

  const isSameDate = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const todayDate = new Date();

  return (
    <div className="calendar-grid-container">
      <div className="weekdays">
        {WEEKDAYS.map((day, i) => (
          <div key={day} className={`weekday ${i >= 5 ? 'weekend' : ''}`} style={i >= 5 ? { color: theme.color } : {}}>
            {day}
          </div>
        ))}
      </div>
      
      <div className="days-grid">
        {daysGrid.map((dayInfo, i) => {
          const d = dayInfo.dateObj;
          const isStart = isSameDate(startDate, d);
          const isEnd = isSameDate(endDate, d);
          const isToday = isSameDate(todayDate, d);
          
          let inRange = false;
          if (startDate && endDate) {
            const minDate = startDate < endDate ? startDate : endDate;
            const maxDate = startDate > endDate ? startDate : endDate;
            if (d > minDate && d < maxDate) {
              inRange = true;
            }
          } else if (startDate && hoverDate && !endDate) {
            const minDate = startDate < hoverDate ? startDate : hoverDate;
            const maxDate = startDate > hoverDate ? startDate : hoverDate;
            if (d > minDate && d < maxDate) {
              inRange = true;
            }
          }

          const isWeekend = i % 7 >= 5;
          const faded = !dayInfo.isCurrentMonth;
          
          let classes = `day-cell`;
          if (faded) classes += ' faded';
          if (isWeekend) classes += ' weekend';
          if (isStart) classes += ' start-date';
          if (isEnd) classes += ' end-date';
          if (inRange) classes += ' in-range';
          if (isToday) classes += ' is-today';

          const customStyles = {};
          
          if (isStart || isEnd) {
            customStyles.backgroundColor = theme.color;
            customStyles.boxShadow = `0 4px 10px ${theme.color}66`;
          } else if (inRange) {
            customStyles.backgroundColor = `${theme.color}33`; 
          } else if (isWeekend && !faded) {
            customStyles.color = theme.color;
          } else if (isWeekend && faded) {
            customStyles.color = `${theme.color}80`; 
          }

          const dateKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          const holidayName = HOLIDAYS_2026[dateKey];

          return (
            <div 
              key={i} 
              className={classes}
              style={customStyles}
              onClick={() => onDateClick(d)}
              onMouseEnter={() => setHoverDate(d)}
              onMouseLeave={() => setHoverDate(null)}
            >
              <div className="day-num">{dayInfo.dayNumber}</div>
              {holidayName && !faded && (
                <div className="holiday-name" style={{ color: isStart || isEnd ? 'white' : theme.color }}>
                  {holidayName}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
