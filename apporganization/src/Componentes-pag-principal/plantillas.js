import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './plantillas.css';
import Logo from './imagenes/logo.png'; // Añadido para corregir el error de Logo
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Checkbox,
  ListItemText, // Añadido para corregir el error
  IconButton,
  Modal,
  Box,
} from '@mui/material';
import { Link} from 'react-router-dom';
import CalendarComponent from './CalendarComponent'; // Añadido para corregir el error de CalendarComponent


function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlantillaName, setNewPlantillaName] = useState('');
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedPlantillas = JSON.parse(localStorage.getItem('plantillas')) || [];
    setPlantillas(storedPlantillas);
  }, []);

  useEffect(() => {
    localStorage.setItem('plantillas', JSON.stringify(plantillas));
  }, [plantillas]);

  const handleCreatePlantilla = () => {
    if (!newPlantillaName.trim()) return;
    const newPlantilla = { id: Date.now(), name: newPlantillaName };
    setPlantillas([...plantillas, newPlantilla]);
    setNewPlantillaName('');
    setShowCreateForm(false);
  };

  const handleDelete = (id) => {
    setPlantillas(plantillas.filter((plantilla) => plantilla.id !== id));
    localStorage.removeItem(`notes_${id}`); // Elimina las notas de la plantilla
  };

  const handlePlantillaClick = (plantillaId) => {
    navigate(`/plantillas/${plantillaId}`); // Redirige a la ruta correcta
  };

  return (
    
    <div className="plantilla-container">
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="d-flex align-items-center justify-content-start" style={{ gap: '10px' }}>
          <Button onClick={() => navigate('/')}>
            <img src={Logo} alt="Logo Notorium" width="100" style={{ cursor: 'pointer' }} />
            <h1 className="text-white mb-0" style={{ cursor: 'pointer', whiteSpace: 'nowrap', margin: 0 }}>Notorium</h1>
          </Button>
          <div className="ms-auto d-flex align-items-center" style={{ gap: '15px' }}>
          </div>
        </div>
      </nav>
      <h1>Plantillas</h1>
      {plantillas.map((plantilla) => (
        <div key={plantilla.id} onClick={() => handlePlantillaClick(plantilla.id)}>
          <span>{plantilla.name}</span>
          <button onClick={(e) => { e.stopPropagation(); handleDelete(plantilla.id); }}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={() => setShowCreateForm(!showCreateForm)}>Crear Nueva Plantilla</button>
      {showCreateForm && (
        <div>
          <input
            type="text"
            value={newPlantillaName}
            onChange={(e) => setNewPlantillaName(e.target.value)}
          />
          <button onClick={handleCreatePlantilla}>Guardar</button>
        </div>
      )}
      <CalendarComponent notes={notes} />
    </div>
  );
}

export default Plantillas;
