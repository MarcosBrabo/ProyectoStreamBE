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
  IconButton,
  Modal,
  Box,
} from '@mui/material';
import { ChromePicker } from 'react-color';
import Logo from './imagenes/logo.png';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarComponent from './CalendarComponent'; // Importa el componente de calendario
import { Link } from 'react-router-dom';


function Trellolist() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [noteColor, setNoteColor] = useState('#ffffff');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === '') return;
    setNotes([
      ...notes,
      { title: newNote, items: [], category: newCategory, dueDate: newDueDate, color: noteColor },
    ]);
    resetNewNoteFields();
    setIsModalOpen(false);
  };

  const resetNewNoteFields = () => {
    setNewNote('');
    setNewCategory('');
    setNewDueDate('');
    setNoteColor('#ffffff');
  };

  const addItemToNote = (index) => {
    if (newItem.trim() === '') return;
    const updatedNotes = [...notes];
    updatedNotes[index].items.push({ text: newItem, completed: false });
    setNotes(updatedNotes);
    setNewItem('');
  };

  const deleteItemFromNote = (noteIndex, itemIndex) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].items.splice(itemIndex, 1);
    setNotes(updatedNotes);
  };

  const toggleItemCompletion = (noteIndex, itemIndex) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].items[itemIndex].completed = !updatedNotes[noteIndex].items[itemIndex].completed;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, noteIndex) => noteIndex !== index);
    setNotes(updatedNotes);
  };

  const isColorDark = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  return (
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
            <Link to="/" className="btn btn-outline-light">Volver a la Pantalla Principal</Link>
          </div>
        </div>
      </nav>
      <br></br><br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ display: 'block', margin: '0 auto' }}
      >
        Agregar Nota
      </Button>
      <br></br>
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
          <Typography variant="h6" className="text-dark text-center" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
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
          <br></br>
          <Button variant="contained" color="primary" onClick={addNote} fullWidth>
            Agregar Nota
          </Button>
        </Box>
      </Modal>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {notes.map((note, index) => {
          const textColor = isColorDark(note.color) ? '#ffffff' : '#000000';
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ backgroundColor: note.color || '#fff' }}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 'bold', color: textColor }}>{note.title}</Typography>
                  <Typography variant="subtitle2" style={{ color: textColor }}>Categoría: {note.category}</Typography>
                  <Typography variant="subtitle2" style={{ color: textColor }}>Vence: {note.dueDate}</Typography>
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
                            color: item.completed ? 'green' : textColor,
                          }}
                        />
                        <IconButton onClick={() => deleteItemFromNote(index, itemIndex)} edge="end" size="small">
                          <DeleteIcon fontSize="small" style={{ color: textColor }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    label="Agregar ítem"
                    variant="outlined"
                    fullWidth
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    style={{ marginTop: '10px', color: textColor }}
                    inputProps={{ style: { color: textColor } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItemToNote(index)}
                    fullWidth
                    style={{
                      marginTop: '10px',
                      backgroundColor: textColor === '#000000' ? '#ffffff' : '#000000',
                      color: textColor,
                    }}
                  >
                    Agregar Ítem
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteNote(index)}
                    fullWidth
                    style={{ marginTop: '10px', backgroundColor: '#d32f2f', color: '#ffffff' }}
                  >
                    Eliminar Nota
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Añadimos el componente de calendario */}
      <CalendarComponent notes={notes} />
    </div>
  );
}

export default Trellolist;