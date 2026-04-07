import React, { useState, useEffect } from 'react';
import CalendarPage from './components/CalendarPage.jsx';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const MONTH_THEMES = [
  { img: 'https://images.unsplash.com/photo-1483321415276-805125fa0a79?auto=format&fit=crop&q=80&w=1000', color: '#0ea5e9' }, // Jan
  { img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1000', color: '#6366f1' }, // Feb
  { img: 'https://images.unsplash.com/photo-1490750967868-88cb4aca4401?auto=format&fit=crop&q=80&w=1000', color: '#10b981' }, // Mar
  { img: 'https://images.unsplash.com/photo-1521124673852-6ab58f8b3fc7?auto=format&fit=crop&q=80&w=1000', color: '#059669' }, // Apr
  { img: 'https://images.unsplash.com/photo-1558459654-c4302661c925?auto=format&fit=crop&q=80&w=1000', color: '#ec4899' }, // May
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000', color: '#eab308' }, // Jun
  { img: 'https://images.unsplash.com/photo-1473496169904-658ba37448eb?auto=format&fit=crop&q=80&w=1000', color: '#f59e0b' }, // Jul
  { img: 'https://images.unsplash.com/photo-1469142104523-cc4c688d052a?auto=format&fit=crop&q=80&w=1000', color: '#d97706' }, // Aug
  { img: 'https://images.unsplash.com/photo-1473229649514-41147aaebeae?auto=format&fit=crop&q=80&w=1000', color: '#ea580c' }, // Sep
  { img: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=1000', color: '#b91c1c' }, // Oct
  { img: 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?auto=format&fit=crop&q=80&w=1000', color: '#64748b' }, // Nov
  { img: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=1000', color: '#dc2626' }  // Dec
];

const getMonthTheme = (monthIndex) => {
  return MONTH_THEMES[monthIndex];
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pages, setPages] = useState([new Date(currentDate)]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('calendar-notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [monthNotes, setMonthNotes] = useState(() => {
    const saved = localStorage.getItem('calendar-month-notes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('calendar-month-notes', JSON.stringify(monthNotes));
  }, [monthNotes]);

  // Preload all 12 images to ensure instantaneous transition (fast picture reload)
  useEffect(() => {
    MONTH_THEMES.forEach((theme) => {
      const img = new Image();
      img.src = theme.img;
    });
  }, []);

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
    setPages(prev => [...prev, nextMonth]);
    setActiveIndex(prev => prev + 1);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
    setPages(prev => [...prev, prevMonth]);
    setActiveIndex(prev => prev + 1);
  };

  const visiblePages = pages.slice(Math.max(0, activeIndex - 2), activeIndex + 2);

  const handleDateClick = (clickedDate) => {
    if (!startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
    }
  };

  const handleDeleteNote = (monthKey) => {
    const updatedNotes = { ...monthNotes };
    delete updatedNotes[monthKey];
    setMonthNotes(updatedNotes);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-anchor"></div>
      
      {/* Realistic thread hanging down from anchor to the calendar corners */}
      <svg style={{ position: 'absolute', top: -50, width: '100%', height: 80, zIndex: 85, pointerEvents: 'none' }}>
        <line x1="50%" y1="18" x2="25%" y2="52" stroke="#e0d6c8" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(1px 3px 3px rgba(0,0,0,0.8))" />
        <line x1="50%" y1="18" x2="75%" y2="52" stroke="#e0d6c8" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(1px 3px 3px rgba(0,0,0,0.8))" />
      </svg>

      <div className="calendar-binding">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="spiral-ring"></div>
        ))}
      </div>
      
      <div className="book-container">
        {visiblePages.map((monthDate, idx) => {
          const actualIndex = Math.max(0, activeIndex - 2) + idx;
          const isFlipped = actualIndex < activeIndex;
          const isActive = actualIndex === activeIndex;
          const isNext = actualIndex > activeIndex;

          let className = 'calendar-page-container';
          if (isFlipped) className += ' page-flipped-up';
          if (isActive) className += ' page-active';
          if (isNext) className += ' page-next';
          
          if (!isActive && !isFlipped && idx > activeIndex + 1) {
            return null; 
          }

          const theme = getMonthTheme(monthDate.getMonth());

          return (
            <div key={`${monthDate.getTime()}-${actualIndex}`} className={className}>
              <CalendarPage 
                date={monthDate} 
                theme={theme}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                setHoverDate={setHoverDate}
                onDateClick={handleDateClick}
                monthNotes={monthNotes}
                setMonthNotes={setMonthNotes}
                handleDeleteNote={handleDeleteNote}
              />
              <div className="calendar-page-back"></div>
            </div>
          );
        })}
      </div>

      <div className="top-actions">
        {startDate && (
          <button 
            className="action-btn visible"
            onClick={() => { setStartDate(null); setEndDate(null); }}
          >
            Clear <X size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
          </button>
        )}
      </div>

      <div className="controls">
        <button className="control-btn" onClick={handlePrevMonth} title="Previous Month">
          <ChevronLeft size={24} />
        </button>
        <button className="control-btn" onClick={handleNextMonth} title="Next Month">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
