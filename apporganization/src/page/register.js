import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      console.log('Token:', res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Contenedor principal */}
      <div className="login-container container my-auto"> {/* Container centrado verticalmente */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg" style={{ width: '800px' }}>
              <div className="card-header text-center bg-primary text-white">
                Registrarse
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      aria-describedby="usernameHelp"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div id="usernameHelp" className="form-text">Ingrese su nombre de usuario.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div id="usernameHelp" className="form-text">Ingrese su Contraseña</div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-light py-4 mt-auto"> {/* Footer siempre al fondo */}
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
};

export default Register;