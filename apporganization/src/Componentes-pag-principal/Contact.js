import React, { useEffect, useState } from 'react'
import { Resend } from 'resend';
import 'bootstrap/dist/css/bootstrap.min.css';
import Linken from './imagenes/linken.png';
import Git from './imagenes/git-hub.png';
import Instagram from './imagenes/ig.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/style-contact.css';


function Contact() {
  
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });

  // Estado para manejar los errores y el mensaje de éxito
  const [feedback, setFeedback] = useState('');

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.email || !formData.name || !formData.message) {
      setFeedback('Por favor, completa todos los campos.');
      return;
    }


    const resend = new Resend('re_47bTs4Ka_EFMSt554AnwwAcWcSPKwPCVj');

    (async function () {
      const { data, error } = await resend.emails.send({
        from: 'Acme <${formData.email}>',
        to: ['chuiuwu22@gmail.com'],
        subject:  formData.message,
        html: `<h1>${formData.name}</h1>`,
      });
      
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
    })();
  };
  return (
    <div>
      <div className="container mt-3" style={{ minHeight: '90vh' }}>
        <div className="card p-4">
          <h1 className="text-center mb-4">CONTÁCTANOS</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 bg-dar">
              <label htmlFor="email" className="form-label color-black">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control input-text1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control input-text2"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Descripción-Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control input-text3"
                rows="4"
              ></textarea>
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
          </form>

          {feedback && <p className="mt-3 text-center">{feedback}</p>}
        </div>
      </div>

      <footer className="bg-dark text-light py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0">&copy; 1990-2025 Todos los derechos reservados</p>
          </div>

          <div>
            <p className="mb-0">
              <a href="mailto:correo@correo.com" className="text-light text-decoration-none">
                correo@correo.com
              </a>{' '}
              |{' '}
              <a href="tel:+543624000000" className="text-light text-decoration-none">
                +54-3624-000000
              </a>
            </p>
          </div>

          <div className="d-flex">
            <a href="https://linkedin.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
            </a>
            <a href="https://instagram.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
            </a>
            <a href="https://github.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github" style={{ fontSize: '1.5rem' }}></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
