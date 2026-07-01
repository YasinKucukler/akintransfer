// Global mock'lar — her test dosyasından önce çalışır

// IntersectionObserver jsdom'da yok
global.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe()   {}
  unobserve() {}
  disconnect(){}
};

// localStorage mock
const localStorageMock = (() => {
  let store = {};
  return {
    getItem:    (k)      => store[k] ?? null,
    setItem:    (k, v)   => { store[k] = String(v); },
    removeItem: (k)      => { delete store[k]; },
    clear:      ()       => { store = {}; },
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// fetch mock — varsayılan olarak boş contact.json döner
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      phone:    '+90544 517 52 05',
      whatsapp: '+90544 517 52 05',
      email:    'test@example.com',
    }),
  })
);
