/**
 * NavMenu.js — <ucr-nav-menu>
 * Sin Shadow DOM. CSS encapsulado con @scope dentro del componente.
 *
 * Atributos:
 *   logo-src  (default: firma-ucr-ico-removebg-preview.png)
 *
 * Los ítems del menú son una propiedad estática de la clase.
 */

export class NavMenu extends HTMLElement {

  /* ── Datos del menú (propiedad estática de la clase) ── */

  static menuItems = [
    { label: 'Aulas 5, 6, 7' },
    { label: 'Apoyo Informático' },
    { label: 'Servidores' },
    { label: 'Laboratorio 1 y 2' },
    { label: 'Coordinación\nInformática Empresarial' },
  ];

  /* ── Ciclo de vida ── */

  constructor () {
    super();
  }

  connectedCallback () {
    this.render();
  }

  static get observedAttributes () { return ['logo-src']; }

  attributeChangedCallback () {
    if (this.innerHTML) this.render();
  }

  /* ── Helpers ── */

  get logoSrc () {
    return this.getAttribute('logo-src') ?? 'firma-ucr-ico-removebg-preview.png';
  }

  #renderItem ({ label }) {
    return `
      <li class="item">
        <span class="texto">${label.replace(/\n/g, '<br>')}</span>
        <span class="flecha" aria-hidden="true">→</span>
      </li>
    `;
  }

  /* ── Render ── */

  render () {
    const items = NavMenu.menuItems.map(i => this.#renderItem(i)).join('');

    this.setHTMLUnsafe(/* html */`

      <style>
        @scope (ucr-nav-menu) {
          :scope {
            --bg:        #1B3A6B;
            --line:      rgba(255,255,255,0.25);
            --footer-bg: #8A9BB5;
            --text:      #ffffff;
            --arrow:     #ffffff;

            display: block;
            background: var(--bg);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.35);
            font-family: 'Barlow', sans-serif;
          }

          .inner {
            display: grid;
            grid-template-rows: 1fr auto;
            height: 100%;
          }

          .lista {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
          }

          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.4rem;
            border-bottom: 1px solid var(--line);
            transition: background 0.2s;
            cursor: default;
          }

          .item:hover { background: rgba(255,255,255,0.05); }

          .texto {
            font-weight: 600;
            font-size: clamp(0.95rem, 1.8vw, 1.15rem);
            color: var(--text);
            line-height: 1.3;
          }

          .flecha {
            font-size: 1.4rem;
            color: var(--arrow);
            background: rgba(255,255,255,0.15);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            flex-shrink: 0;
            margin-left: 1rem;
          }

          footer {
            background: var(--footer-bg);
            padding: 0.7rem 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .logo-img {
            height: 40px;
            width: auto;
            object-fit: contain;
            filter: brightness(0) saturate(100%) invert(30%) sepia(80%) saturate(400%) hue-rotate(180deg);
          }
        }
      </style>

      <div class="inner">
        <ul class="lista">${items}</ul>
        <footer>
          <img src="${this.logoSrc}" alt="UCR Logo" class="logo-img" />
        </footer>
      </div>
    `);
  }
}

customElements.define('ucr-nav-menu', NavMenu);