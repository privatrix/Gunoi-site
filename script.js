/* =========================================================
   gunoi.md — Interactions (light, TaskRabbit-style rebuild)
   ========================================================= */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- i18n ---------- */
const I18N = {
  ro: {
    'banner': 'Nou în Chișinău — primii 10 clienți primesc 20% reducere',
    'nav-services': 'Servicii',
    'nav-pricing': 'Prețuri',
    'nav-about': 'Despre',
    'nav-contact': 'Contact',
    'hero-eyebrow': 'Serviciu în Chișinău',
    'hero-h1': 'Scăpăm de gunoiul tău. Azi sau mâine.',
    'hero-sub': 'Mobilă veche, electrocasnice, deșeuri de construcție, evacuări complete. Noi venim, încărcăm, curățăm. Tu plătești doar la finalizare.',
    'hero-cta-call': 'Sună: +373 69 269 888',
    'hero-cta-quote': 'Cere ofertă',
    'trust-new': 'Nou',
    'trust-local': 'Echipă locală',
    'trust-receipt': 'Bon fiscal',
    'trust-fast': 'Răspuns <1h',
    'ts-receipt': 'Bon fiscal',
    'ts-legal': 'Activitate legală',
    'ts-disposal': 'Depunere legală',
    'ts-transport': 'Transport propriu',
    'cat-title': 'Ce ridicăm',
    'cat-sub': 'Alege ce ai de aruncat — te sunăm cu oferta.',
    'cat-1': 'Mobilă veche',
    'cat-2': 'Electrocasnice',
    'cat-3': 'Deșeuri construcție',
    'cat-4': 'Evacuare apartament',
    'cat-5': 'Oficiu',
    'cat-6': 'Post-eveniment',
    'cat-7': 'Fier vechi',
    'cat-8': 'Container mare',
    'how-title': 'Cum funcționează',
    'how-sub': 'Trei pași. Nimic complicat.',
    'step-1-h': 'Suni sau scrii',
    'step-1-p': 'Ne spui ce ai de aruncat, primești ofertă.',
    'step-2-h': 'Programăm rapid',
    'step-2-p': 'Azi, mâine, sau când îți convine.',
    'step-3-h': 'Ridicăm. Plătești.',
    'step-3-p': 'Încărcăm tot, plata la finalizare.',
    'price-title': 'Prețuri',
    'price-sub': 'Prețul final depinde de volum și acces. Oferta e gratuită.',
    'price-from': 'de la',
    'price-cta': 'Cere ofertă',
    'price-badge': '⭐ Cel mai cerut',
    'price-1-name': 'Mic',
    'price-1-desc': 'Pentru câteva piese sau saci',
    'price-1-f1': 'până la 1 m³',
    'price-1-f2': '2 muncitori incluși',
    'price-1-f3': 'posibil în aceeași zi',
    'price-1-f4': 'bon fiscal',
    'price-2-name': 'Mediu',
    'price-2-desc': 'Pentru o cameră sau renovare mică',
    'price-2-f1': 'până la 4 m³',
    'price-2-f2': '2–3 muncitori',
    'price-2-f3': 'demontare mobilă inclusă',
    'price-2-f4': 'bon fiscal',
    'price-3-name': 'Mare',
    'price-3-desc': 'Apartament, oficiu, șantier',
    'price-3-f1': 'volum peste 4 m³',
    'price-3-f2': '3+ muncitori',
    'price-3-f3': 'mai multe drumuri dacă e nevoie',
    'price-3-f4': 'bon fiscal',
    'callout-1-h': 'Evacuare completă apartament',
    'callout-1-p': 'Ofertă la fața locului, gratuit.',
    'callout-2-h': 'Obiecte mari individuale',
    'callout-2-p': 'De la 300 MDL / bucată.',
    'about-title': 'Cine suntem',
    'about-p': 'gunoi.md este un serviciu profesional de evacuare a gunoiului în Chișinău și suburbii. Lucrăm rapid, legal și curat — cu bon fiscal și depunere autorizată la fiecare ridicare.',
    'ab-1': 'Transport propriu',
    'ab-2': 'Echipă instruită',
    'ab-3': 'Activitate legală',
    'ab-4': 'Chișinău + suburbii',
    'ba-title': 'Înainte & după',
    'ba-sub': 'Trage cursorul pentru a vedea diferența.',
    'ba-before': 'Înainte',
    'ba-after': 'După',
    'rev-title': 'Recenzii',
    'rev-sub': 'Suntem noi — fii primul care scrie o recenzie după serviciu.',
    'rev-dash': 'Locul tău de recenzie',
    'rev-note': 'Primii 10 clienți: 20% reducere',
    'rev-be-first': 'Fii primul client — Sună acum',
    'faq-title': 'Întrebări frecvente',
    'faq-1-q': 'În cât timp veniți?',
    'faq-1-a': 'De obicei în aceeași zi sau a doua zi. Pentru urgențe, sună direct și aranjăm.',
    'faq-2-q': 'Unde lucrați?',
    'faq-2-a': 'Chișinău și toate suburbiile — Durlești, Stăuceni, Codru, Ciorescu, Cricova, Vadul lui Vodă etc.',
    'faq-3-q': 'Cum se calculează prețul?',
    'faq-3-a': 'După volum (m³), tipul de deșeuri și accesul la adresă (etaj, lift, distanță). Oferta e mereu gratuită.',
    'faq-4-q': 'Demontați mobila?',
    'faq-4-a': 'Da. Dulapuri, paturi, bucătării — demontăm și scoatem. Inclus în pachetele Mediu și Mare.',
    'faq-5-q': 'Dați bon fiscal?',
    'faq-5-a': 'Da, la fiecare serviciu. Lucrăm legal, activitate autorizată.',
    'faq-6-q': 'Unde duceți gunoiul?',
    'faq-6-a': 'La punctele de depunere autorizate. Fier vechi și materiale reciclabile — la centre de reciclare.',
    'faq-7-q': 'Lucrați în weekend?',
    'faq-7-a': 'Da, sâmbătă și duminică, cu programare.',
    'faq-8-q': 'Cum plătesc?',
    'faq-8-a': 'Cash sau transfer — la finalizarea serviciului. Fără avans.',
    'form-title': 'Cere ofertă gratuită',
    'form-sub': 'Completezi, te sunăm în mai puțin de 1 oră.',
    'form-name': 'Nume',
    'form-phone': 'Telefon',
    'form-addr': 'Adresă',
    'form-cat': 'Categorie',
    'form-cat-any': 'Oricare',
    'form-date': 'Data preferată',
    'form-msg': 'Ce ai de ridicat',
    'form-submit': 'Trimite',
    'form-ok': 'Mulțumim! Te sunăm în curând.',
    'cpc-or': 'Sau sună direct',
    'cpc-hours': 'Luni–duminică, 8:00–20:00',
    'cpc-call': 'Sună acum',
    'foot-desc': 'Evacuare gunoi în Chișinău. Rapid, legal, curat.',
    'foot-area': 'Zone deservite',
    'foot-links': 'Linkuri',
    'foot-legal': 'Toate drepturile rezervate.',
    'close': 'Închide',
  },
  ru: {
    'banner': 'Новинка в Кишинёве — первые 10 клиентов: -20%',
    'nav-services': 'Услуги',
    'nav-pricing': 'Цены',
    'nav-about': 'О нас',
    'nav-contact': 'Контакты',
    'hero-eyebrow': 'Сервис в Кишинёве',
    'hero-h1': 'Избавим от мусора. Сегодня или завтра.',
    'hero-sub': 'Старая мебель, бытовая техника, строительный мусор, полный вывоз. Мы приедем, погрузим и уберём. Оплата только после завершения.',
    'hero-cta-call': 'Звонок: +373 69 269 888',
    'hero-cta-quote': 'Запросить цену',
    'trust-new': 'Новые',
    'trust-local': 'Местная команда',
    'trust-receipt': 'Чек',
    'trust-fast': 'Ответ <1ч',
    'ts-receipt': 'Фискальный чек',
    'ts-legal': 'Юридически',
    'ts-disposal': 'Легальная утилизация',
    'ts-transport': 'Свой транспорт',
    'cat-title': 'Что вывозим',
    'cat-sub': 'Выберите категорию — перезвоним с ценой.',
    'cat-1': 'Старая мебель',
    'cat-2': 'Бытовая техника',
    'cat-3': 'Строит. мусор',
    'cat-4': 'Вывоз из квартиры',
    'cat-5': 'Офис',
    'cat-6': 'После мероприятий',
    'cat-7': 'Металлолом',
    'cat-8': 'Большой контейнер',
    'how-title': 'Как это работает',
    'how-sub': 'Три шага. Ничего сложного.',
    'step-1-h': 'Звоните или пишете',
    'step-1-p': 'Говорите, что вывозить — получаете цену.',
    'step-2-h': 'Быстро планируем',
    'step-2-p': 'Сегодня, завтра или когда удобно.',
    'step-3-h': 'Вывозим. Платите.',
    'step-3-p': 'Всё грузим, оплата после работы.',
    'price-title': 'Цены',
    'price-sub': 'Итоговая цена зависит от объёма и доступа. Оценка бесплатна.',
    'price-from': 'от',
    'price-cta': 'Запросить цену',
    'price-badge': '⭐ Самый популярный',
    'price-1-name': 'Малый',
    'price-1-desc': 'Несколько вещей или мешков',
    'price-1-f1': 'до 1 м³',
    'price-1-f2': '2 грузчика',
    'price-1-f3': 'возможно в тот же день',
    'price-1-f4': 'чек',
    'price-2-name': 'Средний',
    'price-2-desc': 'Комната или мелкий ремонт',
    'price-2-f1': 'до 4 м³',
    'price-2-f2': '2–3 грузчика',
    'price-2-f3': 'разборка мебели включена',
    'price-2-f4': 'чек',
    'price-3-name': 'Большой',
    'price-3-desc': 'Квартира, офис, стройка',
    'price-3-f1': 'более 4 м³',
    'price-3-f2': '3+ грузчика',
    'price-3-f3': 'несколько рейсов при необходимости',
    'price-3-f4': 'чек',
    'callout-1-h': 'Полный вывоз из квартиры',
    'callout-1-p': 'Оценка на месте, бесплатно.',
    'callout-2-h': 'Отдельные крупные предметы',
    'callout-2-p': 'От 300 MDL за штуку.',
    'about-title': 'Кто мы',
    'about-p': 'gunoi.md — профессиональный сервис вывоза мусора в Кишинёве и пригородах. Работаем быстро, легально и аккуратно — с фискальным чеком и официальной утилизацией после каждого вывоза.',
    'ab-1': 'Свой транспорт',
    'ab-2': 'Обученная команда',
    'ab-3': 'Юридически',
    'ab-4': 'Кишинёв + пригороды',
    'ba-title': 'До и после',
    'ba-sub': 'Перетащите курсор, чтобы увидеть разницу.',
    'ba-before': 'До',
    'ba-after': 'После',
    'rev-title': 'Отзывы',
    'rev-sub': 'Мы новые — станьте первым, кто оставит отзыв после услуги.',
    'rev-dash': 'Ваш отзыв здесь',
    'rev-note': 'Первые 10 клиентов: скидка 20%',
    'rev-be-first': 'Станьте первым клиентом — Звоните',
    'faq-title': 'Частые вопросы',
    'faq-1-q': 'Как быстро приезжаете?',
    'faq-1-a': 'Обычно в тот же или на следующий день. Для срочных — звоните, договоримся.',
    'faq-2-q': 'Где работаете?',
    'faq-2-a': 'Кишинёв и все пригороды — Дурлешты, Стэучены, Кодру, Чореску, Крикова, Вадул-луй-Водэ и др.',
    'faq-3-q': 'Как считается цена?',
    'faq-3-a': 'По объёму (м³), типу мусора и доступу (этаж, лифт, расстояние). Оценка всегда бесплатна.',
    'faq-4-q': 'Разбираете ли мебель?',
    'faq-4-a': 'Да. Шкафы, кровати, кухни — разбираем и выносим. Включено в Средний и Большой пакет.',
    'faq-5-q': 'Даёте ли чек?',
    'faq-5-a': 'Да, при каждой услуге. Работаем легально, с лицензией.',
    'faq-6-q': 'Куда вывозите мусор?',
    'faq-6-a': 'На лицензированные полигоны. Металлолом и вторсырьё — в центры переработки.',
    'faq-7-q': 'Работаете в выходные?',
    'faq-7-a': 'Да, суббота и воскресенье по записи.',
    'faq-8-q': 'Как платить?',
    'faq-8-a': 'Наличные или перевод — после завершения. Без предоплаты.',
    'form-title': 'Бесплатная оценка',
    'form-sub': 'Заполните — перезвоним в течение часа.',
    'form-name': 'Имя',
    'form-phone': 'Телефон',
    'form-addr': 'Адрес',
    'form-cat': 'Категория',
    'form-cat-any': 'Любая',
    'form-date': 'Желаемая дата',
    'form-msg': 'Что вывезти',
    'form-submit': 'Отправить',
    'form-ok': 'Спасибо! Скоро перезвоним.',
    'cpc-or': 'Или звоните напрямую',
    'cpc-hours': 'Пн–вс, 8:00–20:00',
    'cpc-call': 'Позвонить',
    'foot-desc': 'Вывоз мусора в Кишинёве. Быстро, легально, чисто.',
    'foot-area': 'Зоны обслуживания',
    'foot-links': 'Ссылки',
    'foot-legal': 'Все права защищены.',
    'close': 'Закрыть',
  }
};

function applyLang(lang) {
  if (!I18N[lang]) lang = 'ro';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = I18N[lang][key];
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const val = I18N[lang][key];
    if (val !== undefined) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  try { localStorage.setItem('gunoi.lang', lang); } catch (_) {}
}

(function initLang() {
  let lang = 'ro';
  try {
    const saved = localStorage.getItem('gunoi.lang');
    if (saved && I18N[saved]) lang = saved;
    else if ((navigator.language || '').toLowerCase().startsWith('ru')) lang = 'ru';
  } catch (_) {}
  applyLang(lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
})();

/* ---------- NAV scroll shadow ---------- */
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* ---------- LAUNCH BANNER (dismissible) ---------- */
(function banner() {
  const el = document.getElementById('launchBanner');
  const close = document.getElementById('bannerClose');
  if (!el || !close) return;
  let dismissed = false;
  try { dismissed = localStorage.getItem('gunoi.banner.dismissed') === '1'; } catch (_) {}
  if (!dismissed) el.hidden = false;
  close.addEventListener('click', () => {
    el.hidden = true;
    try { localStorage.setItem('gunoi.banner.dismissed', '1'); } catch (_) {}
  });
})();

/* ---------- CATEGORY CARDS — prefill form & scroll ---------- */
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.cat;
    const sel = document.getElementById('f-cat');
    if (sel && cat) sel.value = cat;
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => {
      const first = document.getElementById('f-name');
      if (first) first.focus();
    }, 600);
  });
});

/* ---------- CONTACT FORM — localStorage + mailto fallback ---------- */
(function contactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const okMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    data.ts = new Date().toISOString();

    // Save to localStorage (dev/debug)
    try {
      const arr = JSON.parse(localStorage.getItem('gunoi.submissions') || '[]');
      arr.push(data);
      localStorage.setItem('gunoi.submissions', JSON.stringify(arr));
    } catch (_) {}

    // TODO: replace with real backend POST (e.g. Formspree, API route)
    // Fallback: open mailto with prefilled content
    const subject = encodeURIComponent(`Cerere gunoi.md — ${data.name || ''}`);
    const body = encodeURIComponent(
      `Nume: ${data.name || ''}\n` +
      `Telefon: ${data.phone || ''}\n` +
      `Adresă: ${data.address || ''}\n` +
      `Categorie: ${data.category || ''}\n` +
      `Dată: ${data.date || ''}\n\n` +
      `Detalii:\n${data.message || ''}`
    );
    // Uncomment to enable mailto fallback:
    // window.location.href = `mailto:salut@gunoi.md?subject=${subject}&body=${body}`;

    if (okMsg) {
      okMsg.hidden = false;
      okMsg.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'center' });
    }
    form.reset();
  });
})();

/* ---------- BEFORE/AFTER drag slider ---------- */
(function baSlider() {
  const slider = document.getElementById('baSlider');
  const handle = document.getElementById('baHandle');
  if (!slider || !handle) return;
  let pos = 50;
  let dragging = false;

  function setPos(p) {
    pos = Math.max(0, Math.min(100, p));
    slider.style.setProperty('--ba-pos', pos + '%');
    handle.setAttribute('aria-valuenow', Math.round(pos));
  }
  setPos(50);

  function pctFromEvent(e) {
    const rect = slider.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    return ((clientX - rect.left) / rect.width) * 100;
  }

  slider.addEventListener('pointerdown', (e) => {
    dragging = true;
    slider.classList.add('dragging');
    if (slider.setPointerCapture) slider.setPointerCapture(e.pointerId);
    setPos(pctFromEvent(e));
    e.preventDefault();
  });
  slider.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    setPos(pctFromEvent(e));
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => {
    slider.addEventListener(ev, () => {
      dragging = false;
      slider.classList.remove('dragging');
    });
  });

  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { setPos(pos - 4); e.preventDefault(); }
    if (e.key === 'ArrowRight') { setPos(pos + 4); e.preventDefault(); }
    if (e.key === 'Home') { setPos(0); e.preventDefault(); }
    if (e.key === 'End') { setPos(100); e.preventDefault(); }
  });
})();

/* ---------- Default form date = tomorrow ---------- */
(function defaultDate() {
  const dateInput = document.getElementById('f-date');
  if (!dateInput) return;
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
})();
