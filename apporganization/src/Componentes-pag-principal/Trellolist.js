import React, { useState, useEffect } from 'react';
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
  Modal,
  Box
} from '@mui/material';
import { ChromePicker } from 'react-color';
import Logo from './imagenes/logo.png';
import { useNavigate } from 'react-router-dom';

function Trellolist() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [noteColor, setNoteColor] = useState('#ffffff');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const addNote = () => {
    if (newNote.trim() === '') return;
    setNotes([
      ...notes,
      { title: newNote, items: [], category: newCategory, dueDate: newDueDate, color: noteColor },
    ]);
    resetNewNoteFields();
    setIsModalOpen(false);
  };

  // Reset fields for new note
  const resetNewNoteFields = () => {
    setNewNote('');
    setNewCategory('');
    setNewDueDate('');
    setNoteColor('#ffffff');
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

  // Determine if a color is dark or light
  const isColorDark = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Use the luminance formula to determine if the color is dark
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5; // Returns true if the color is dark
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-black">
          <div className="d-flex align-items-center justify-content-start" style={{ gap: '10px' }}>
            <Button onClick={() => navigate('/')}>
              <img src={Logo} alt="Logo Notorium" width="100" style={{ cursor: 'pointer' }} />
              <h1 className="text-white mb-0" style={{ cursor: 'pointer', whiteSpace: 'nowrap', margin: 0 }}>Notorium</h1>
            </Button>
            <div className="ms-auto d-flex align-items-center" style={{ gap: '15px' }}>
              <button className="btn btn-outline-light">+ Nuevo</button>
              <button className="btn btn-outline-light">Explorar</button>
              <button className="btn btn-outline-light">Calendario</button>
            </div>
          </div>
        </nav>
      </div>

      <br />
      <br />

      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Agregar Nota
      </Button>

      {/* Modal for adding a new note */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Typography variant="h6" className='text-dark text-center' style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Agregar nueva nota
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            label="Título de la nota"
            style={{ marginBottom: '10px' }}
          />
          <TextField
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            label="Categoría"
            style={{ marginBottom: '10px' }}
          />
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Color de la Nota
          </Typography>
          <ChromePicker
            color={noteColor}
            onChangeComplete={(color) => setNoteColor(color.hex)}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={addNote} fullWidth>
            Agregar Nota
          </Button>
        </Box>
      </Modal>

      {/* Display notes */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {notes.map((note, index) => {
          const textColor = isColorDark(note.color) ? '#ffffff' : '#000000';

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ backgroundColor: note.color || '#fff' }}>
                <CardContent style={{ color: textColor }}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>{note.title}</Typography>
                  <Typography variant="subtitle2">Categoría: {note.category}</Typography>
                  <Typography variant="subtitle2">Vence: {note.dueDate}</Typography>
                  <List>
                    {note.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex}>
                        <Checkbox
                          checked={item.completed}
                          onChange={() => toggleItemCompletion(index, itemIndex)}
                          style={{ color: textColor }}
                        />
                        <ListItemText
                          primary={item.text}
                          style={{
                            textDecoration: item.completed ? 'line-through' : 'none',
                            color: textColor,
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
                    style={{ marginTop: '10px', color:textColor }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItemToNote(index)}
                    fullWidth
                    style={{ marginTop: '10px', color: textColor }}
                  >
                    Agregar Ítem
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Trellolist;
