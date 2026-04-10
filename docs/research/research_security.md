# Исследование: Безопасность и технологии
**Дата:** 10.04.2026
**Группа:** Руслан (ИБ) + Коля (сисадмин)

---

## Ключевые находки

### Хостинг: сравнение
- GitHub Pages: бесплатно, но НЕТ кастомных HTTP-заголовков
- Cloudflare Pages: лучший вариант (CDN 300+ точек, заголовки, бесплатно)
- Решение: российский хостинг + Cloudflare CDN поверх

### CSP-политика (локальные шрифты + Яндекс.Метрика)
```
Content-Security-Policy:
  default-src 'none';
  script-src 'self' https://mc.yandex.ru https://yastatic.net 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' https://mc.yandex.ru data:;
  connect-src 'self' https://mc.yandex.ru;
  frame-src 'none';
  base-uri 'self';
  form-action 'none';
```

### 152-ФЗ для психолога
- Политика конфиденциальности обязательна (если ставим Метрику)
- Cookie-баннер обязателен (Метрика собирает cookies)
- Психолог не врач — лицензирование не требуется
- Формулировки на сайте корректны (процесс, не гарантия результата)

### Core Web Vitals — путь к 100/100
1. Шрифты локально + preload критичных
2. Критический CSS инлайнить в head
3. Hero-фото: fetchpriority="high", без lazy
4. Остальные фото: loading="lazy"
5. JS: defer + IntersectionObserver вместо scroll
6. Изображения: AVIF > WebP > JPEG через <picture>

### Оптимизация изображений
- Hero (360x360 retina): AVIF ~10KB, WebP ~18KB
- About (520x640 retina): AVIF ~20KB, WebP ~35KB
- Всегда три формата: AVIF + WebP + JPEG fallback
