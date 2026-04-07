import React from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarHeader({ date, theme }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  return (
    <div className="hero-section">
      <img src={theme.img} alt={`${MONTH_NAMES[month]} seasonal view`} className="hero-image" />
      <div className="hero-overlay-shape" style={{ backgroundColor: theme.color }}></div>
      <div className="month-title">
        <div className="month-year">{year}</div>
        <div className="month-name">{MONTH_NAMES[month]}</div>
      </div>
    </div>
  );
}
