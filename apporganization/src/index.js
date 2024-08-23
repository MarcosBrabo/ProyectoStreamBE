import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Contact from './Componentes-pag-principal/Contact'; // Asegúrate de que Contact.js está en el directorio correcto y con el nombre correcto
import About from './Componentes-pag-principal/About'; // Asegúrate de que About.js está en el directorio correcto y con el nombre correcto

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
