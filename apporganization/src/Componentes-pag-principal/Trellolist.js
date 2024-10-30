import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
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
import CalendarComponent from './CalendarComponent';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/trello.css';

function Trellolist() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
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
      {
        title: newNote,
        items: [],
        newItem: '',  // Agrega un campo newItem para cada nota
        category: newCategory,
        dueDate: newDueDate,
        color: noteColor,
      },
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

  const handleNewItemChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index].newItem = value;
    setNotes(updatedNotes);
  };

  const addItemToNote = (index) => {
    const updatedNotes = [...notes];
    const newItemText = updatedNotes[index].newItem.trim();

    if (newItemText === '') return;

    updatedNotes[index].items.push({ text: newItemText, completed: false });
    updatedNotes[index].newItem = '';  // Limpia el newItem de esta nota
    setNotes(updatedNotes);
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    setNotes(reorderedNotes);
  };

  return (
    <div>
      {/* Navbar */}
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
      <br />
      
      {/* Botón para abrir el modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ display: 'block', margin: '0 auto' }}
      >
        Agregar Nota
      </Button>
      <br />

      {/* Modal para agregar nueva nota */}
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

      {/* Notas con Drag and Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable direction="horizontal" droppableId="notes" type="NOTE">
          {(provided) => (
            <div
              className="notes-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex', overflowX: 'auto', padding: '20px', gap: '15px' }}
            >
              {notes.map((note, index) => (
                <Draggable key={index} draggableId={`note-${index}`} index={index}>
                  {(provided) => (
                    <Card className='note-card'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        minWidth: '300px',
                        backgroundColor: note.color || '#fff',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>{note.title}</Typography>
                        <Typography variant="subtitle2">Categoría: {note.category}</Typography>
                        <Typography variant="subtitle2">Vence: {note.dueDate}</Typography>
                        <List className='item-list'>
                          {note.items.map((item, itemIndex) => (
                            <ListItem key={itemIndex}>
                              <Checkbox
                                checked={item.completed}
                                onChange={() => toggleItemCompletion(index, itemIndex)}
                              />
                              <ListItemText primary={item.text} />
                              <IconButton onClick={() => deleteItemFromNote(index, itemIndex)} edge="end" size="small">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </ListItem>
                          ))}
                        </List>
                        <TextField
                          label="Agregar ítem"
                          variant="outlined"
                          fullWidth
                          value={note.newItem}
                          onChange={(e) => handleNewItemChange(index, e.target.value)}
                          style={{ marginTop: '10px' }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addItemToNote(index)}
                          fullWidth
                        >
                          Agregar Ítem
                        </Button>
                        <Button
                          variant="contained"
                          className="color2"
                          onClick={() => deleteNote(index)}
                          fullWidth
                        >
                          Eliminar Nota
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="Calendario">
        <CalendarComponent notes={notes} />
      </div>
    </div>
  );
}

export default Trellolist;
