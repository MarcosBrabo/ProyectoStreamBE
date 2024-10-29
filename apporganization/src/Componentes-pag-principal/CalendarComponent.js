import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function CalendarComponent({ notes }) {
  const getTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const notesForDate = notes.filter(note => note.dueDate === formattedDate);

    if (notesForDate.length > 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          {notesForDate.map((note, index) => (
            <span key={index} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: note.color }}></span>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <Calendar tileContent={getTileContent} />
    </div>
  );
}

export default CalendarComponent;

