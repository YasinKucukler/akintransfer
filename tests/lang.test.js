/**
 * Dil seçici testleri
 * setLang, localStorage, DOM güncelleme, RTL, dropdown
 */

const { loadScripts } = require('./helpers/loadScripts');

beforeEach(() => {
  localStorage.clear();
  loadScripts();
});

describe('setLang — DOM güncellemeleri', () => {
  test('TR seçilince data-i18n elementleri Türkçe olur', () => {
    setLang('tr');
    const el = document.querySelector('[data-i18n="nav_home"]');
    expect(el.textContent).toBe('Ana Sayfa');
  });

  test('EN seçilince data-i18n elementleri İngilizce olur', () => {
    setLang('en');
    const el = document.querySelector('[data-i18n="nav_home"]');
    expect(el.textContent).toBe('Home');
  });

  test('DE seçilince data-i18n elementleri Almanca olur', () => {
    setLang('de');
    const el = document.querySelector('[data-i18n="nav_home"]');
    expect(el.textContent).toBe('Startseite');
  });

  test('AR seçilince data-i18n elementleri Arapça olur', () => {
    setLang('ar');
    const el = document.querySelector('[data-i18n="nav_home"]');
    expect(el.textContent).toBeTruthy();
  });
});

describe('setLang — html dir/lang attribute', () => {
  test('AR seçilince dir="rtl" olur', () => {
    setLang('ar');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  test('TR seçilince dir="ltr" olur', () => {
    setLang('ar');
    setLang('tr');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  test('lang attribute doğru set edilir', () => {
    setLang('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });
});

describe('setLang — localStorage', () => {
  test('seçilen dil localStorage\'a kaydedilir', () => {
    setLang('en');
    expect(localStorage.getItem('akin_lang')).toBe('en');
  });

  test('sayfa yenilenince kaydedilen dil yüklenir', () => {
    localStorage.setItem('akin_lang', 'de');
    loadScripts(); // yeniden yükle
    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });
});

describe('setLang — aktif buton', () => {
  test('tetikleyici buton etiketi güncellenir', () => {
    setLang('en');
    const activeBtn = document.querySelector('.lang-switcher > .lang-btn');
    expect(activeBtn.textContent).toBe('EN');
  });

  test('dropdown\'daki doğru buton active class alır', () => {
    setLang('de');
    const deBtn = document.querySelector('.lang-dropdown .lang-btn[data-lang="de"]');
    expect(deBtn.classList.contains('active')).toBe(true);
  });

  test('dropdown\'da sadece bir buton active olur', () => {
    setLang('en');
    const activeBtns = document.querySelectorAll('.lang-dropdown .lang-btn.active');
    expect(activeBtns.length).toBe(1);
  });
});

describe('dropdown davranışı', () => {
  test('setLang sonrası dropdown kapanır', () => {
    document.querySelector('.lang-switcher').classList.add('open');
    setLang('en');
    expect(document.querySelector('.lang-switcher').classList.contains('open')).toBe(false);
  });
});
