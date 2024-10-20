import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ChromePicker } from 'react-color'; // Importing the color picker

function Trellolist() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [noteColor, setNoteColor] = useState('#ffffff'); // Default color
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingColor, setEditingColor] = useState('#ffffff'); // Color for editing

  const navigate = useNavigate();

  // Add a new note
  const addNote = () => {
    if (newNote.trim() === '') return;
    setNotes([
      ...notes,
      { title: newNote, items: [], category: newCategory, dueDate: newDueDate, color: noteColor },
    ]);
    resetNewNoteFields();
  };

  // Reset fields for new note
  const resetNewNoteFields = () => {
    setNewNote('');
    setNewCategory('');
    setNewDueDate('');
    setNoteColor('#ffffff');
  };

  // Delete a note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Edit a note
  const editNote = (index) => {
    setEditingIndex(index);
    setEditingText(notes[index].title);
    setEditingColor(notes[index].color); // Set color for editing
  };

  // Save the edited note
  const saveEdit = () => {
    const updatedNotes = notes.map((note, i) =>
      i === editingIndex ? { ...note, title: editingText, color: editingColor } : note
    );
    setNotes(updatedNotes);
    setEditingIndex(null);
    setEditingText('');
    setEditingColor('#ffffff');
  };

  // Add an item to a note
  const addItemToNote = (index) => {
    if (newItem.trim() === '') return;
    const updatedNotes = [...notes];
    updatedNotes[index].items.push({ text: newItem, completed: false });
    setNotes(updatedNotes);
    setNewItem('');
  };

  // Toggle item completion
  const toggleItemCompletion = (noteIndex, itemIndex) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].items[itemIndex].completed = !updatedNotes[noteIndex].items[itemIndex].completed;
    setNotes(updatedNotes);
  };

  return (
    <div className="trellolist-container" style={{ padding: '20px' }}>
      <Typography variant="h3" style={{ fontWeight: 'bold', color: 'white' }} gutterBottom>
        Lista de Notas
      </Typography>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
          Agregar nueva nota
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
          Categoría
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
          Fecha de Vencimiento
        </Typography>
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          style={{ marginBottom: '10px' }}
        />

        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
          Color de la Nota
        </Typography>
        <ChromePicker
          color={noteColor}
          onChangeComplete={(color) => setNoteColor(color.hex)}
          style={{ marginBottom: '10px' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={addNote}
          fullWidth
        >
          Agregar Nota
        </Button>
      </div>

      <Grid container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ backgroundColor: note.color || '#fff' }}>
              <CardContent>
                {editingIndex === index ? (
                  <>
                    <TextField
                      fullWidth
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <ChromePicker
                      color={editingColor}
                      onChangeComplete={(color) => setEditingColor(color.hex)}
                      style={{ marginBottom: '10px' }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={saveEdit}
                      style={{ marginTop: '10px' }}
                      fullWidth
                    >
                      Guardar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>{note.title}</Typography>
                    <Typography variant="subtitle2">Categoría: {note.category}</Typography>
                    <Typography variant="subtitle2">Vence: {note.dueDate}</Typography>

                    <List>
                      {note.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <Checkbox
                            checked={item.completed}
                            onChange={() => toggleItemCompletion(index, itemIndex)}
                          />
                          <ListItemText
                            primary={item.text}
                            style={{
                              textDecoration: item.completed ? 'line-through' : 'none',
                              color: item.completed ? 'green' : 'inherit',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <TextField
                      label="Agregar ítem"
                      variant="outlined"
                      fullWidth
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      style={{ marginTop: '10px' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addItemToNote(index)}
                      fullWidth
                      style={{ marginTop: '10px' }}
                    >
                      Agregar Ítem
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => editNote(index)}
                      style={{ marginTop: '10px', marginRight: '10px' }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteNote(index)}
                      style={{ marginTop: '10px' }}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/')}
        style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Volver al inicio
      </Button>
    </div>
  );
}

export default Trellolist;
