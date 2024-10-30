import React, { useState } from 'react';
import './plantillas.css'; // Link to the CSS file

function Plantillas() {
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);

  const handlePlantillaClick = (plantilla) => {
    setSelectedPlantilla(plantilla);
  };

  const handleDelete = (plantilla) => {
    console.log(`Deleted ${plantilla}`); // Replace with delete logic if needed
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <h1>EMPRESA</h1>
        <button className="new-button">+Nuevo</button>
        <button className="logout-button">CERRAR SESION</button>
      </header>

      {/* Plantillas List */}
      <div className="plantillas-container">
        <div className="plantilla" onClick={() => handlePlantillaClick('plantilla1')}>
          <span>13/08 ..........</span>
          <button className="delete-button" onClick={() => handleDelete('plantilla1')}>🗑️</button>
        </div>
        <div className="plantilla" onClick={() => handlePlantillaClick('plantilla2')}>
          <span>PLANTILLA 2</span>
          <button className="delete-button" onClick={() => handleDelete('plantilla2')}>🗑️</button>
        </div>
        <div className="plantilla" onClick={() => handlePlantillaClick('plantilla3')}>
          <span>PLANTILLA 3</span>
          <button className="delete-button" onClick={() => handleDelete('plantilla3')}>🗑️</button>
        </div>
      </div>

      {/* Calendar Image (for demonstration) */}
      <div className="calendar-container">
        {/* Replace this with an interactive calendar if necessary */}
        <img src="/path/to/calendar.png" alt="Calendar" className="calendar" />
      </div>

      {/* Time Display */}
      <div className="time-display">
        19:53 MARTES 20
      </div>
    </div>
  );
}

export default Plantillas;
