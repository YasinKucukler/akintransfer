/**
 * Galeri testleri
 * expandGallery — mobil/masaüstü davranışı
 */

const { loadScripts } = require('./helpers/loadScripts');

beforeEach(() => {
  localStorage.clear();
  loadScripts();
});

const fakeEvent = { stopPropagation: jest.fn() };

describe('expandGallery — mobil (<=768px)', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true, configurable: true });
  });

  test('ilk tıklamada gallery-grid "expanded" class alır', () => {
    expandGallery(fakeEvent, 1);
    expect(document.querySelector('.gallery-grid').classList.contains('expanded')).toBe(true);
  });

  test('genişletilmeden önce event propagation durdurulur', () => {
    expandGallery(fakeEvent, 1);
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });

  test('zaten genişletilmişse lightbox açılır', () => {
    const grid = document.querySelector('.gallery-grid');
    grid.classList.add('expanded');

    expandGallery(fakeEvent, 1);
    // openLightbox'ın side effect'i: lightbox elementine 'open' class eklenir
    expect(document.getElementById('lightbox').classList.contains('open')).toBe(true);
  });
});

describe('expandGallery — masaüstü (>768px)', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true, configurable: true });
  });

  test('masaüstünde direkt lightbox açılır', () => {
    expandGallery(fakeEvent, 1);
    expect(document.getElementById('lightbox').classList.contains('open')).toBe(true);
  });

  test('masaüstünde gallery-grid "expanded" class almaz', () => {
    expandGallery(fakeEvent, 1);
    expect(document.querySelector('.gallery-grid').classList.contains('expanded')).toBe(false);
  });
});
