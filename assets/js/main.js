// ===== LANGUAGE SWITCHER =====
let currentLang = 'tr';
const langSwitcher  = document.querySelector('.lang-switcher');
const activeBtn     = langSwitcher.querySelector('.lang-btn.active');   // üstteki tek buton
const dropdownBtns  = langSwitcher.querySelectorAll('.lang-dropdown .lang-btn');

function setLang(lang) {
  currentLang = lang;

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Üstteki aktif butonu güncelle
  activeBtn.textContent = lang.toUpperCase();
  activeBtn.dataset.lang = lang;

  // Dropdown içindeki aktif işareti güncelle
  dropdownBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('akin_lang', lang);

  // Dropdown'ı kapat
  langSwitcher.classList.remove('open');
}

// Üstteki aktif butona tıklayınca dropdown aç/kapat (sadece mobil)
activeBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  if (window.innerWidth <= 768) {
    langSwitcher.classList.toggle('open');
  }
});

// Dropdown seçenekleri
dropdownBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setLang(btn.dataset.lang);
  });
});

// Masaüstü: eski davranış (tüm butonlar görünür, direkt tıklama)
// activeBtn masaüstünde zaten hidden olmadığı için aktif buton da çalışır

// Dışarı tıklayınca kapat
document.addEventListener('click', function(e) {
  if (!e.target.closest('.lang-switcher')) {
    langSwitcher.classList.remove('open');
  }
});

// Load saved lang
const savedLang = localStorage.getItem('akin_lang') || 'tr';
setLang(savedLang);


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ===== HERO LOADED (zoom-out) =====
window.addEventListener('load', () => {
  document.querySelector('.hero').classList.add('loaded');
});


// ===== LIGHTBOX =====
const galleryImages = [
  'assets/arac-6-ic-yan.jpg',
  'assets/arac-7-arka.jpg',
  'assets/arac-8-on.jpg',
  'assets/arac-5-ic-mekan.jpg',
  'assets/arac-2-dugunu-yan.jpg',
  'assets/arac-3-dugun-on.jpg',
];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  showLightboxImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
  const img = document.getElementById('lightbox-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = galleryImages[currentIndex];
    img.style.opacity = '1';
  }, 150);
  document.getElementById('lightbox-counter').textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
}

function lightboxPrev(e) {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showLightboxImage();
}

function lightboxNext(e) {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showLightboxImage();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; showLightboxImage(); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % galleryImages.length; showLightboxImage(); }
});


// ===== CONTACT INFO (contact.json) =====
fetch('data/contact.json')
  .then(r => r.json())
  .then(c => {
    const phoneEl = document.getElementById('phone-number');
    const waEl    = document.getElementById('wa-number');
    const emailEl = document.getElementById('email-addr');
    const callBtn = document.querySelector('a[href^="tel:"]');
    const waBtn   = document.querySelector('a[href^="https://wa.me"]');
    const mailBtn = document.querySelector('a[href^="mailto:"]');

    if (phoneEl)  phoneEl.textContent  = c.phone;
    if (waEl)     waEl.textContent     = c.phone;
    if (emailEl)  emailEl.textContent  = c.email;
    if (callBtn)  callBtn.href = 'tel:' + c.phone.replace(/\s/g, '');
    if (waBtn)    waBtn.href   = 'https://wa.me/' + c.whatsapp;

    // Sabit WhatsApp butonu
    const waFloat = document.getElementById('wa-float');
    if (waFloat) waFloat.href = 'https://wa.me/' + c.whatsapp;

    // Sabit telefon butonu
    const phoneFloat = document.getElementById('phone-float');
    if (phoneFloat) phoneFloat.href = 'tel:' + c.phone.replace(/\s/g, '');
    if (mailBtn)  mailBtn.href = 'mailto:' + c.email;
  })
  .catch(() => {}); // JSON yoksa sessizce geç


// ===== SCROLL ARROWS =====
function scrollStep(dir) {
  window.scrollBy({ top: dir * window.innerHeight * 0.85, behavior: 'smooth' });
}

function updateScrollArrows() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  document.getElementById('scrollUp').classList.toggle('hidden', scrollTop < 60);
  document.getElementById('scrollDown').classList.toggle('hidden', scrollTop >= maxScroll - 40);
}

window.addEventListener('scroll', updateScrollArrows);
updateScrollArrows();


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
