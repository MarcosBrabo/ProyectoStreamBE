import React, { useEffect, useState } from 'react'
import { Resend } from 'resend';
import 'bootstrap/dist/css/bootstrap.min.css';
import Linken from './imagenes/linken.png';
import Git from './imagenes/git-hub.png';
import Instagram from './imagenes/ig.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/about.css';

function About() {
  return (
    <div className="about-container">
      <h2>Sobre Nosotros</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed vestibulum nunc, 
        eget aliquam felis. Sed nunc purus, accumsan sit amet dictum in, ornare in dui. 
        Ut imperdiet ante eros, sed porta ex eleifend ac. Donec non porttitor leo. 
        Nulla luctus ex lacus, ut scelerisque odio semper nec. Vestibulum posuere eros 
        quis felis viverra mattis. Ut turpis nunc, imperdiet a lorem nec, feugiat vulputate lectus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed vestibulum nunc, 
        eget aliquam felis. Sed nunc purus, accumsan sit amet dictum in, ornare in dui. 
        Ut imperdiet ante eros, sed porta ex eleifend ac. Donec non porttitor leo. 
        Nulla luctus ex lacus, ut scelerisque odio semper nec. Vestibulum posuere eros 
        quis felis viverra mattis. Ut turpis nunc, imperdiet a lorem nec, feugiat vulputate lectus.
      </p>
    </div>
  );
}

export default About;

