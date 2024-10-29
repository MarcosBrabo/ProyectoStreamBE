import React, { useEffect, useState } from 'react'
import { Resend } from 'resend';
import 'bootstrap/dist/css/bootstrap.min.css';
import Linken from './imagenes/linken.png';
import Git from './imagenes/git-hub.png';
import Instagram from './imagenes/ig.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/about.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-container">
      <h2>Sobre Nosotros</h2>
      <p>
        Somos un grupo de 5 estudiantes con la idea de desarollar aplicaciones web que ayuden al crecimiento y cuidado personal de los individuos que decidan utilizarlas.
      </p>
      <p>
      </p>
      <div className="button-back">
        <button onclick="goBack()">Ir a la página anterior</button>
      </div>
    </div>
  );
}

function goBack() {
    window.history.back();
}

export default About;

