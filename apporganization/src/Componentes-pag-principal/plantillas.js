import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './plantillas.css';
import Logo from './imagenes/logo.png';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarComponent from './CalendarComponent';

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
    localStorage.removeItem(`notes_${id}`);
  };

  const handlePlantillaClick = (plantillaId) => {
    navigate(`/plantillas/${plantillaId}`);
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="d-flex align-items-center justify-content-start" style={{ gap: '10px' }}>
          <Button onClick={() => navigate('/')}>
            <img src={Logo} alt="Logo Notorium" width="100" />
            <h1 className="text-white mb-0">Notorium</h1>
          </Button>
        </div>
      </nav>

      <h1>Plantillas</h1>

      <div className="plantillas-container">
        {plantillas.map((plantilla) => (
          <div
            key={plantilla.id}
            className="plantilla"
            onClick={() => handlePlantillaClick(plantilla.id)}
          >
            <span>{plantilla.name}</span>
            <IconButton
              className="delete-button"
              onClick={(e) => { e.stopPropagation(); handleDelete(plantilla.id); }}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
        ))}
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          Crear Nueva Plantilla
        </button>

        {showCreateForm && (
          <div className="create-form">
            <input
              type="text"
              value={newPlantillaName}
              onChange={(e) => setNewPlantillaName(e.target.value)}
              placeholder="Nombre de la plantilla"
            />
            <button onClick={handleCreatePlantilla}>Guardar</button>
          </div>
        )}

        <div className="calendar-container">
          <CalendarComponent notes={notes} />
        </div>
      </div>
    </div>
  );
}

export default Plantillas;
