/**
 * UcrApp.js — <ucr-app>
 * Contenedor principal sin Shadow DOM.
 * CSS global para el layout Grid (es correcto que sea global aquí,
 * ya que organiza el espacio entre componentes).
 */

import './UcrPoster.js';
import './NavMenu.js';

export class UcrApp extends HTMLElement {

  constructor () {
    super();
  }

  connectedCallback () {
    this.render();
  }

  render () {
    this.setHTMLUnsafe(/* html */`

      <style>
        /*
          El CSS de <ucr-app> es global intencionalmente:
          controla el layout entre componentes (CSS opción 2 del profe).
        */
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;600;700&display=swap');

        ucr-app {
          display: block;
          min-height: 100vh;
          background: #e8e4df;
          padding: 2rem;
          box-sizing: border-box;
        }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
          align-items: start;
        }

        ucr-nav-menu {
          max-width: 380px;
          width: 100%;
        }

        @media (max-width: 640px) {
          ucr-app    { padding: 1rem; }
          .app-grid  { grid-template-columns: 1fr; gap: 2rem; }
          ucr-nav-menu { max-width: 100%; }
        }
      </style>

      <main class="app-grid">
        <ucr-poster
          image-src="GokuYVegetaUCR.png"
          qr-src="Multimedios.png"
          logo-src="firma-ucr-ico-removebg-preview.png"
        ></ucr-poster>

        <ucr-nav-menu
          logo-src="firma-ucr-ico-removebg-preview.png"
        ></ucr-nav-menu>
      </main>
    `);
  }
}

customElements.define('ucr-app', UcrApp);