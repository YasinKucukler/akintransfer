/**
 * İletişim bilgileri testleri
 * contact.json'dan gelen verinin DOM'a yansıması
 */

const { loadScripts } = require('./helpers/loadScripts');

const MOCK_CONTACT = {
  phone:    '+90544 517 52 05',
  whatsapp: '+90544 517 52 05',
  email:    'anilakin4817@gmail.com',
};

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(MOCK_CONTACT) })
  );
  loadScripts();
});

describe('contact.json yükleme', () => {
  test('telefon numarası DOM\'a yazılır', async () => {
    await Promise.resolve(); // fetch microtask
    await Promise.resolve();
    expect(document.getElementById('phone-number').textContent).toBe(MOCK_CONTACT.phone);
  });

  test('WhatsApp numarası DOM\'a yazılır', async () => {
    await Promise.resolve();
    await Promise.resolve();
    expect(document.getElementById('wa-number').textContent).toBe(MOCK_CONTACT.phone);
  });

  test('e-posta adresi DOM\'a yazılır', async () => {
    await Promise.resolve();
    await Promise.resolve();
    expect(document.getElementById('email-addr').textContent).toBe(MOCK_CONTACT.email);
  });

  test('telefon butonu href güncellenir', async () => {
    await Promise.resolve();
    await Promise.resolve();
    const btn = document.querySelector('a[href^="tel:"]');
    expect(btn.href).toBe('tel:+905445175205');
  });

  test('WhatsApp butonu href güncellenir', async () => {
    await Promise.resolve();
    await Promise.resolve();
    const btn = document.querySelector('a[href^="https://wa.me"]');
    // jsdom href'i URL-encode eder, setAttribute ile ham değeri kontrol et
    expect(btn.getAttribute('href')).toContain(MOCK_CONTACT.whatsapp);
  });

  test('sabit WhatsApp butonu href güncellenir', async () => {
    await Promise.resolve();
    await Promise.resolve();
    expect(document.getElementById('wa-float').getAttribute('href')).toContain(MOCK_CONTACT.whatsapp);
  });

  test('sabit telefon butonu href güncellenir', async () => {
    await Promise.resolve();
    await Promise.resolve();
    expect(document.getElementById('phone-float').href).toBe('tel:+905445175205');
  });
});

describe('fetch hatası', () => {
  test('fetch başarısız olursa sayfa çökmez', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('network error')));
    expect(() => loadScripts()).not.toThrow();
    await Promise.resolve();
    await Promise.resolve();
    // DOM elementleri boş kalır ama hata fırlatılmaz
    expect(document.getElementById('phone-number').textContent).toBe('');
  });
});
