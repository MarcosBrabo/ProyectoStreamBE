import React, { useState } from 'react';

function Plantillas() {
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);

  const handlePlantillaClick = (plantilla) => {
    setSelectedPlantilla(plantilla);
  };

  return (
    <div className="plantillas-container">
      <h2>Plantillas</h2>
      <div className="plantillas">
        <div
          className={`plantilla ${selectedPlantilla === 'plantilla1' ? 'selected' : ''}`}
          onClick={() => handlePlantillaClick('plantilla1')}
        >
          <h3>Plantilla 1</h3>
          {/* Mostrar detalles de la plantilla 1 */}
        </div>
        <div
          className={`plantilla ${selectedPlantilla === 'plantilla2' ? 'selected' : ''}`}
          onClick={() => handlePlantillaClick('plantilla2')}
        >
          <h3>Plantilla 2</h3>
          {/* Mostrar detalles de la plantilla 2 */}
        </div>
        <div
          className={`plantilla ${selectedPlantilla === 'plantilla3' ? 'selected' : ''}`}
          onClick={() => handlePlantillaClick('plantilla3')}
        >
          <h3>Plantilla 3</h3>
          {/* Mostrar detalles de la plantilla 3 */}
        </div>
      </div>
      {selectedPlantilla && (
        <div className="plantilla-details">
          {/* Mostrar detalles de la plantilla seleccionada */}
        </div>
      )}
    </div>
  );
}

export default Plantillas;