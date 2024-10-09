import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Trellolist() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Agregar una nueva nota
  const addNote = () => {
    if (newNote.trim() === '') return; // Evitar notas vacías
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  // Eliminar una nota
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Editar una nota
  const editNote = (index) => {
    setEditingIndex(index);
    setEditingText(notes[index]);
  };

  // Guardar la nota editada
  const saveEdit = () => {
    const updatedNotes = notes.map((note, i) =>
      i === editingIndex ? editingText : note
    );
    setNotes(updatedNotes);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="trellolist-container">
      <h1>Lista de Notas</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Agregar nueva nota"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNote}>Agregar Nota</button>
      </div>

      <div className="notes-section">
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveEdit}>Guardar</button>
              </>
            ) : (
              <>
                <p>{note}</p>
                <button onClick={() => editNote(index)}>Editar</button>
                <button onClick={() => deleteNote(index)}>Eliminar</button>
              </>
            )}
          </div>
        ))}
      </div>

      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default Trellolist;
