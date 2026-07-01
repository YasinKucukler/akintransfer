const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../');

/**
 * Minimal HTML — testlerin ihtiyaç duyduğu tüm elementleri içerir.
 */
const MINIMAL_HTML = `
<html lang="tr" dir="ltr">
<head></head>
<body>
  <nav id="navbar">
    <a class="nav-logo" href="#home"></a>
    <ul id="navLinks">
      <li><a href="#home"     data-i18n="nav_home">Ana Sayfa</a></li>
      <li><a href="#contact"  data-i18n="nav_contact">İletişim</a></li>
    </ul>
    <div>
      <div class="lang-switcher">
        <button class="lang-btn active" data-lang="tr">TR</button>
        <div class="lang-dropdown">
          <button class="lang-btn" data-lang="tr">TR</button>
          <button class="lang-btn" data-lang="en">EN</button>
          <button class="lang-btn" data-lang="de">DE</button>
          <button class="lang-btn" data-lang="ar">AR</button>
        </div>
      </div>
      <div class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-badge" data-i18n="hero_badge">7 Kişilik Konfor</div>
      <p data-i18n="hero_subtitle">Mercedes Vito ile...</p>
    </div>
    <div class="scroll-arrow scroll-down" id="scrollDown"></div>
    <div class="scroll-arrow scroll-up"   id="scrollUp"></div>
  </section>

  <section id="services"></section>
  <section id="contact">
    <div class="contact-grid">
      <div class="contact-card">
        <p id="phone-number"></p>
        <a href="tel:+90">Ara</a>
      </div>
      <div class="contact-card">
        <p id="wa-number"></p>
        <a href="https://wa.me/90" target="_blank">WA</a>
      </div>
      <div class="contact-card">
        <p id="email-addr"></p>
        <a href="mailto:info@akintransfer.com">Mail</a>
      </div>
    </div>
  </section>

  <div class="gallery-grid">
    <div class="gallery-item" onclick="openLightbox(0)"></div>
    <div class="gallery-item gallery-peek" onclick="expandGallery(event,1)">
      <div class="gallery-more-overlay">+4</div>
    </div>
    <div class="gallery-item gallery-hidden-mobile" onclick="openLightbox(2)"></div>
    <div class="gallery-item gallery-hidden-mobile" onclick="openLightbox(3)"></div>
    <div class="gallery-item gallery-hidden-mobile" onclick="openLightbox(4)"></div>
    <div class="gallery-item gallery-hidden-mobile" onclick="openLightbox(5)"></div>
  </div>

  <div class="lightbox" id="lightbox">
    <span class="lightbox-close"></span>
    <button class="lightbox-prev"></button>
    <img id="lightbox-img" src="" alt="">
    <button class="lightbox-next"></button>
    <div class="lightbox-counter" id="lightbox-counter"></div>
  </div>

  <a href="https://wa.me/90"  id="wa-float"></a>
  <a href="tel:+90"           id="phone-float"></a>
</body>
</html>
`;

function loadScripts() {
  document.documentElement.innerHTML = MINIMAL_HTML
    .replace('<html lang="tr" dir="ltr">', '')
    .replace('</html>', '');

  const i18nCode = fs.readFileSync(path.join(ROOT, 'assets/js/i18n.js'), 'utf8');
  const mainCode = fs.readFileSync(path.join(ROOT, 'assets/js/main.js'), 'utf8');

  // Fonksiyonları global'e aç — eval scope'u dışarıya sızmıyor
  const expose = `
    global.openLightbox       = openLightbox;
    global.closeLightbox      = closeLightbox;
    global.lightboxPrev       = lightboxPrev;
    global.lightboxNext       = lightboxNext;
    global.expandGallery      = expandGallery;
    global.setLang            = setLang;
    global.scrollStep         = scrollStep;
    global.updateScrollArrows = updateScrollArrows;
  `;

  // eslint-disable-next-line no-eval
  eval(i18nCode + '\n' + mainCode + '\n' + expose);
}

module.exports = { loadScripts, MINIMAL_HTML };
