import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import Linken from './imagenes/linken.png';;

function HeaderCom() {  // Cambié el nombre de headercom a HeaderCom para seguir la convención de PascalCase para los componentes React
  return (
    <div>
   <nav class="navbar navbar-expand-lg bg-black">
   <div class="container-fluid">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">CONTACTOS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">SOBRE NOSOTROS</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#"><img src={Linken} alt="LinkedIn" width="30"></img></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><img src="link_to_instagram_icon" alt="Instagram" width="30"></img></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><img src="link_to_git_icon" alt="GitHub" width="30"></img></a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container main-content">
        <img src="link_to_book_icon" alt="Logo Notorium" width="100"></img>
        <h1>Notorium</h1>
        <p>Organízate hoy, y hazte más productivo que ayer</p>
        <div>
            <a href="#" class="btn btn-custom">INICIAR</a>
            <a href="#" class="btn btn-custom">REGISTRAR</a>
        </div>
    </div>
    </div>
  );
}

export default HeaderCom;
