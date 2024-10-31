import React from 'react';
import HeaderCom from './Componentes-pag-principal/headercom'; // Asegúrate de que HeaderCom.js está en el directorio correcto y con el nombre correcto
import { Outlet } from 'react-router-dom';




function App() {
  return (
    <div>
      <HeaderCom />
      <Outlet />
    
      
    </div>
  );
}

export default App;
