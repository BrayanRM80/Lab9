/**
 * UcrPoster.js — <ucr-poster>
 * Sin Shadow DOM. CSS encapsulado con @scope dentro del componente.
 * Usa setHTMLUnsafe para inyectar el HTML + <style @scope> internamente.
 *
 * Atributos:
 *   image-src  (default: GokuYVegetaUCR.png)
 *   qr-src     (default: Multimedios.png)
 *   logo-src   (default: firma-ucr-ico-removebg-preview.png)
 */

export class UcrPoster extends HTMLElement {

  /* ── Ciclo de vida ── */

  constructor () {
    super();
  }

  connectedCallback () {
    this.render();
  }

  static get observedAttributes () {
    return ['image-src', 'qr-src', 'logo-src'];
  }

  attributeChangedCallback () {
    if (this.innerHTML) this.render();
  }

  /* ── Config ── */

  get config () {
    return {
      imageSrc : this.getAttribute('image-src') ?? 'GokuYVegetaUCR.png',
      qrSrc    : this.getAttribute('qr-src')    ?? 'Multimedios.png',
      logoSrc  : this.getAttribute('logo-src')  ?? 'firma-ucr-ico-removebg-preview.png',
    };
  }

  /* ── Render ── */

  render () {
    const { imageSrc, qrSrc, logoSrc } = this.config;

    this.setHTMLUnsafe(/* html */`

      <style>
        /*
          @scope limita estos estilos SOLO a este <ucr-poster>
          sin necesidad de Shadow DOM ni prefijos de clase.
        */
        @scope (ucr-poster) {
          :scope {
            --bg:     #C8991A;
            --purple: #6B3FA0;
            --teal:   #1ABCB0;
            --pink:   #E84393;
            --text:   #2b1a00;
            --white:  #ffffff;

            display: block;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.35);
            background: var(--bg);
            aspect-ratio: 2 / 3;
            font-family: 'Barlow', sans-serif;
          }

          /* ── Layout Grid ── */
          .inner {
            display: grid;
            grid-template-rows: auto auto 1fr auto;
            height: 100%;
            padding: 1.5rem 1.5rem 0;
          }

          /* ── Header ── */
          header {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }

          .titulo-wrap {
            display: flex;
            align-items: flex-start;
            gap: 0.3rem;
          }

          .excl {
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            font-size: clamp(2rem, 4vw, 3rem);
            color: var(--pink);
            line-height: 1;
            margin-top: 0.1rem;
          }

          .titulo {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }

          .linea1 {
            display: inline-block;
            background: var(--teal);
            color: var(--white);
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            font-size: clamp(1.4rem, 3.5vw, 2.2rem);
            letter-spacing: 0.03em;
            padding: 0.1rem 0.6rem;
            text-transform: uppercase;
            clip-path: polygon(0 0, 100% 0, 96% 100%, 0 100%);
          }

          .linea2 {
            display: inline-block;
            background: var(--purple);
            color: var(--white);
            font-family: 'Barlow Condensed', sans-serif;
            font-weight: 900;
            font-size: clamp(1.8rem, 4vw, 2.8rem);
            letter-spacing: 0.03em;
            padding: 0.1rem 0.6rem;
            text-transform: uppercase;
            clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
          }

          /* ── Body ── */
          .body {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
            text-align: center;
            margin-bottom: 0.8rem;
          }

          .slogan    { font-weight: 700; font-size: clamp(1rem, 2.2vw, 1.4rem);   color: var(--text); }
          .subslogan { font-weight: 700; font-size: clamp(1.1rem, 2.5vw, 1.6rem); color: var(--text); }

          .qr-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.3rem;
          }

          .qr-text { font-size: 0.65rem; color: var(--text); opacity: 0.8; }
          .qr-img  { width: 70px; height: 70px; object-fit: contain; }

          /* ── Imagen personajes ── */
          .imagen-wrap {
            overflow: hidden;
            height: 260px;
          }

          .imagen-wrap::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-image: var(--image-url);
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center 30%;
          }

          /* ── Footer ── */
          footer {
            background: rgba(0,0,0,0.15);
            padding: 0.6rem 1rem;
            margin: 0 -1.5rem;
          }

          .logos {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
          }

          .logo-img    { height: 36px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
          .divider     { width: 1px; height: 30px; background: rgba(255,255,255,0.5); }

          .logo-acoso  { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
          .logo-ucr-small { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 0.85rem; color: var(--white); }
          .logo-acoso-text { font-size: 0.45rem; color: var(--white); text-align: center; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.04em; }

          .logo-sede   { display: flex; align-items: center; gap: 0.3rem; }
          .logo-sg     { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 1.1rem; color: var(--white); }
          .logo-sede-text { font-size: 0.45rem; color: var(--white); line-height: 1.3; text-transform: uppercase; letter-spacing: 0.04em; }
        }
      </style>

      <div class="inner">

        <header>
          <div class="titulo-wrap">
            <span class="excl">¡</span>
            <div class="titulo">
              <span class="linea1">LA SEDE</span>
              <span class="linea2">TE ACOMPAÑA</span>
            </div>
            <span class="excl">!</span>
          </div>
        </header>

        <section class="body">
          <p class="slogan">El respeto no se negocia</p>
          <p class="subslogan">¡Pará ya de acosar!</p>
          <div class="qr-wrap">
            <p class="qr-text">Si necesitás ayuda, escaneá este QR</p>
            <img src="${qrSrc}" alt="Código QR" class="qr-img" />
          </div>
        </section>

        <div class="imagen-wrap" style="--image-url: url('${imageSrc}')"></div>

        <footer>
          <div class="logos">
            <img src="${logoSrc}" alt="UCR Logo" class="logo-img" />
            <div class="divider"></div>
            <div class="logo-acoso">
              <span class="logo-ucr-small">UCR</span>
              <span class="logo-acoso-text">LIBRE DE<br/>ACOSO<br/>SEXUAL</span>
            </div>
            <div class="divider"></div>
            <div class="logo-sede">
              <span class="logo-sg">SG</span>
              <span class="logo-sede-text">Sede de<br/>Guanacaste</span>
            </div>
          </div>
        </footer>

      </div>
    `);
  }
}

customElements.define('ucr-poster', UcrPoster);