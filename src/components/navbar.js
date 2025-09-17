import { handleLogout } from '../utils/auth.js';

/**
 * Crea e inserta una barra de navegación estándar en el cuerpo del documento.
 * @param {string} currentPage - El título de la página actual para marcar el enlace como activo.
 */
export function createNavbar(currentPage = '') {
    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="/public/index.html">
                <img src="https://diba-fbc.vercel.app/images/ESCUDO.png" alt="Logo DIBA FBC" height="40" class="me-2" />
                <span class="fw-bold">Gestor DIBA FBC</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main-navbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link ${currentPage === 'Dashboard' ? 'active' : ''}" href="/public/index.html">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${currentPage === 'Gestor de Datos' ? 'active' : ''}" href="gestor-datos.html">Gestor de Datos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${currentPage === 'Gestor Documental' ? 'active' : ''}" href="gestorDocumental.html">Gestor Documental</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <button id="logout-btn" class="btn btn-outline-danger d-flex align-items-center gap-2">
                        <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    </nav>
    `;

    // Inserta la navbar al principio del body y añade el padding necesario
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.style.paddingTop = '70px';

    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}
