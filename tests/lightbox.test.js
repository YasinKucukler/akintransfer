/**
 * Lightbox testleri
 * openLightbox, closeLightbox, prev/next navigasyon, klavye kısayolları
 */

const { loadScripts } = require('./helpers/loadScripts');

beforeEach(() => {
  localStorage.clear();
  loadScripts();
});

describe('openLightbox', () => {
  test('lightbox açılınca "open" class eklenir', () => {
    openLightbox(0);
    expect(document.getElementById('lightbox').classList.contains('open')).toBe(true);
  });

  test('lightbox açılınca body scroll engellenir', () => {
    openLightbox(0);
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('doğru resim index ile sayaç güncellenir', () => {
    openLightbox(2);
    expect(document.getElementById('lightbox-counter').textContent).toBe('3 / 6');
  });

  test('ilk görselde sayaç "1 / 6" gösterir', () => {
    openLightbox(0);
    expect(document.getElementById('lightbox-counter').textContent).toBe('1 / 6');
  });

  test('son görselde sayaç "6 / 6" gösterir', () => {
    openLightbox(5);
    expect(document.getElementById('lightbox-counter').textContent).toBe('6 / 6');
  });
});

describe('closeLightbox', () => {
  test('"open" class kaldırılır', () => {
    openLightbox(0);
    closeLightbox();
    expect(document.getElementById('lightbox').classList.contains('open')).toBe(false);
  });

  test('body scroll geri açılır', () => {
    openLightbox(0);
    closeLightbox();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('lightboxNext', () => {
  test('sonraki görsele geçer', () => {
    openLightbox(0);
    lightboxNext({ stopPropagation: () => {} });
    expect(document.getElementById('lightbox-counter').textContent).toBe('2 / 6');
  });

  test('son görselden ilk görsele döner (sonsuz döngü)', () => {
    openLightbox(5);
    lightboxNext({ stopPropagation: () => {} });
    expect(document.getElementById('lightbox-counter').textContent).toBe('1 / 6');
  });
});

describe('lightboxPrev', () => {
  test('önceki görsele geçer', () => {
    openLightbox(3);
    lightboxPrev({ stopPropagation: () => {} });
    expect(document.getElementById('lightbox-counter').textContent).toBe('3 / 6');
  });

  test('ilk görselden son görsele döner (sonsuz döngü)', () => {
    openLightbox(0);
    lightboxPrev({ stopPropagation: () => {} });
    expect(document.getElementById('lightbox-counter').textContent).toBe('6 / 6');
  });
});

describe('klavye kısayolları', () => {
  test('Escape tuşu lightbox\'ı kapatır', () => {
    openLightbox(0);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.getElementById('lightbox').classList.contains('open')).toBe(false);
  });

  test('ArrowRight sonraki görsele geçer', () => {
    openLightbox(1);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(document.getElementById('lightbox-counter').textContent).toBe('3 / 6');
  });

  test('ArrowLeft önceki görsele geçer', () => {
    openLightbox(2);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(document.getElementById('lightbox-counter').textContent).toBe('2 / 6');
  });

  test('lightbox kapalıyken klavye navigasyonu çalışmaz', () => {
    openLightbox(2);
    closeLightbox();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    // counter değişmemiş olmalı (lightbox kapalı)
    expect(document.getElementById('lightbox-counter').textContent).toBe('3 / 6');
  });
});
