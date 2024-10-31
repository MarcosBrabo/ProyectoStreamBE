import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Contact from './Componentes-pag-principal/Contact'; 
import About from './Componentes-pag-principal/About'; 
import Login from './page/login';
import Register from './page/register';
import Trellolist from './Componentes-pag-principal/Trellolist';
import Plantillas from'./Componentes-pag-principal/plantillas'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/page/login" element={<Login />} />
      <Route path="/page/register" element={<Register />} />
      <Route path="/plantillas" element={<Plantillas />} />
      <Route path="/plantillas/:plantillaId" element={<Trellolist />} />

      
    </Routes>
  </Router>,
  document.getElementById('root')
  
);
