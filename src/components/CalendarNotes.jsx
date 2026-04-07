import React from 'react';
import { Trash2 } from 'lucide-react';

export default function CalendarNotes({ monthKey, theme, monthNotes, setMonthNotes, handleDeleteNote }) {
  const handleNoteChange = (e) => {
    setMonthNotes({
      ...monthNotes,
      [monthKey]: e.target.value
    });
  };

  const hasNote = monthNotes.hasOwnProperty(monthKey) && monthNotes[monthKey].trim().length > 0;

  return (
    <div className="notes-section">
      <div className="notes-header">
        <span style={{ color: theme.color }}>Notes</span>
        {hasNote && (
          <button 
            className="delete-note-btn"
            onClick={() => handleDeleteNote(monthKey)}
            title="Delete this month's notes"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <textarea
        className="notes-textarea"
        placeholder="Write your notes here..."
        value={monthNotes[monthKey] || ''}
        onChange={handleNoteChange}
        style={{ '--primary-color': theme.color }}
      />
    </div>
  );
}
