/* ================================
   gunoi.md — interactivity
   Languages: RO (default) + RU
   ================================ */

const translations = {
  ro: {
    // Meta
    'meta.title': 'gunoi.md — Evacuare gunoi în Chișinău',
    'meta.desc': 'Ridicăm gunoiul tău rapid și ieftin în Chișinău. Mobilă veche, debris, evacuări complete. Sună pentru ofertă.',

    // Nav
    'nav.services': 'Servicii',
    'nav.pricing': 'Prețuri',
    'nav.about': 'Despre',
    'nav.contact': 'Contact',
    'nav.cta': 'Cere ofertă',

    // Launch banner
    'launch.text': 'Nou în Chișinău — primii 10 clienți primesc 20% reducere.',

    // Hero
    'hero.badge': 'Chișinău · Răspundem azi',
    'hero.title1': 'Tot asta.',
    'hero.title2': 'Dispare mâine.',
    'hero.sub': 'Mobilă veche, debris, electrocasnice, evacuări complete. Ofertă clară la telefon.',
    'hero.cta1': 'Sună: +373 69 269 888',
    'hero.cta2': 'Cere ofertă',
    'hero.badgeL': 'Comandă rezolvată',

    // Live ticker
    'tick.pickups': 'Ridicări azi:',
    'tick.resp': 'Răspuns mediu:',
    'tick.respVal': '47 min',
    'tick.area': 'Chișinău + suburbii',

    // Fake call
    'call.name': 'gunoi.md — Chișinău',
    'call.sub': 'apel primit…',

    // Service mini
    'svc.mini': '+ Cere ofertă',

    // Stats
    'stats.time': '24-48h',
    'stats.timeL': 'De la apel la evacuare',
    'stats.price': 'de la 500 MDL',
    'stats.priceL': 'Rută mică',
    'stats.area': 'Chișinău +',
    'stats.areaL': 'Suburbii incluse',

    // Services
    'services.eyebrow': 'Servicii',
    'services.title': 'Pentru cine lucrăm',
    's1.t': 'Gospodării',
    's1.d': 'Mobilă veche, debris, electrocasnice, saci. Venim și seara / weekend.',
    's1.p': 'de la 500 MDL',
    's2.t': 'Firme & oficii',
    's2.d': 'Birouri, șantier, mobilier, echipament. Facturi și contract pentru firme.',
    's2.p': 'ofertă personalizată',
    's3.t': 'Proprietari în chirie',
    's3.d': 'Apartament lăsat plin? Curățăm până la pereți. Predai a doua zi.',
    's3.p': 'ofertă la fața locului',
    's4.t': 'Urgențe & evenimente',
    's4.d': 'Azi, acum, urgent. Curățare după petreceri, mutări, demolări mici.',
    's4.p': 'de la 500 MDL',

    // How it works
    'how.eyebrow': 'Cum funcționează',
    'how.title': '3 pași.',
    'hw1.t': 'Suni',
    'hw1.dHTML': 'Sună la <a href="tel:+37369269888" class="inline-phone">+373 69 269 888</a>.',
    'hw2.t': 'Preț',
    'hw2.d': 'Ofertă clară la telefon. Stabilim ora.',
    'hw3.t': 'Dispare',
    'hw3.d': 'Ridicăm, plătești, gata.',

    // Pricing
    'price.eyebrow': 'Prețuri',
    'price.title': 'Tarife clare. Fără surprize.',
    'price.badge': 'Cel mai cerut',
    'price.cta.short': 'Cere ofertă',
    'p1.t': 'Mic · până la 1m³',
    'p1.d': 'Câteva obiecte, cutii, saci',
    'p1.p': '500 MDL',
    'p2.t': 'Mediu · ~3m³',
    'p2.d': 'O cameră întreagă, electrocasnice',
    'p2.p': '1200 MDL',
    'p3.t': 'Mare · camion ~7m³',
    'p3.d': 'Apartament întreg, șantier mic',
    'p3.p': '2500 MDL',
    'p4.t': 'Evacuare completă apartament / casă',
    'p4.p': 'ofertă la fața locului',
    'p5.t': 'Obiecte mari individuale',
    'p5.p': 'de la 300 MDL/bucată',
    'price.note': 'Prețul final depinde de volum, acces și tip de deșeu.',
    'price.cta': 'Sună: +373 69 269 888',

    // Scrap bonus
    'scrap.title': 'Ai fier vechi? Scădem din preț.',
    'scrap.text': 'Radiatoare, țevi, cabluri, electrocasnice cu metal — scădem valoarea lor din factură.',

    // Why us
    'why.eyebrow': 'De ce noi',
    'why.title': 'Serios, la timp, cu acte.',
    'why.p1': '✓ Firmă legală · bon fiscal & factură',
    'why.p2': '✓ Răspundem în ziua apelului',
    'why.p3': '✓ Echipă verificată, în uniformă',
    'why.p4': '✓ Deșeuri duse la depozit autorizat',
    'why.p5': '✓ Chișinău + Ialoveni, Strășeni, Codru, Durlești, Stăuceni',
    'why.p6': '✓ Cash sau transfer — tu alegi',

    // Before/after
    'ba.before': 'Înainte',
    'ba.after': 'După',

    // FAQ
    'faq.eyebrow': 'Întrebări frecvente',
    'faq.title': 'Ce întreabă lumea',
    'q1.t': 'Cât de repede veniți?',
    'q1.a': 'De obicei 24-48h. Urgent → în aceeași zi dacă suni până la 12:00.',
    'q2.t': 'Luați debris de renovare?',
    'q2.a': 'Da — cărămidă, beton, gipscarton, moloz. Peste 5m³ trimitem camion special. Nu luăm azbest.',
    'q3.t': 'Luați electrocasnice?',
    'q3.a': 'Da — frigidere, mașini de spălat, TV, calculatoare. Ducem la reciclare. Metal valoros = reducere.',
    'q4.t': 'Ce NU luați?',
    'q4.a': 'Azbest, chimice, vopsele deschise, baterii auto sparte, deșeuri medicale, animale moarte.',
    'q5.t': 'Ce zone acoperiți?',
    'q5.a': 'Chișinău integral + Ialoveni, Strășeni, Codru, Durlești, Stăuceni, Bubuieci, Sîngera.',
    'q6.t': 'Cum plătesc?',
    'q6.a': 'Cash la final sau transfer. Firme: contract, plata 7-14 zile. Fără avans sub 3000 MDL.',
    'q7.t': 'Urc eu mobila?',
    'q7.a': 'Nu — facem noi totul. Tu doar arăți ce pleacă. Etaj înalt fără lift = preț ușor mai mare.',
    'q8.t': 'Acte pentru firme?',
    'q8.a': 'Factură fiscală, contract, act de predare deșeuri. Lucrăm cu persoane juridice conform legii.',

    // Contact
    'ct.eyebrow': 'Cere ofertă',
    'ct.title': 'Spune-ne ce ai de evacuat.',
    'ct.sub': 'Sună direct sau lasă detaliile — te contactăm în max 2h.',
    'ct.hours': 'Luni–Sâmbătă · 08:00–20:00 · Duminica la cerere',
    'ct.or': 'sau lasă un mesaj',
    'ct.f.name': 'Nume',
    'ct.f.phone': 'Telefon',
    'ct.f.address': 'Adresa',
    'ct.f.details': 'Ce trebuie evacuat?',
    'ct.f.date': 'Data preferată (opțional)',
    'ct.f.submit': 'Trimite cerere',
    'trust.1': '✓ Răspuns în 2h',
    'trust.2': '✓ Fără avans',
    'trust.3': '✓ Acte în regulă',

    // Footer
    'footer.tag': 'Evacuare gunoi în Chișinău și suburbii. Rapid, ieftin, cu acte.',
    'footer.areas': 'Chișinău · Ialoveni · Strășeni · Codru · Durlești · Stăuceni · Bubuieci · Sîngera',
    'footer.made': 'Făcut în Chișinău',

    // Messages
    'msg.success': 'Cererea e primită. Te sunăm cât de curând.',
    'msg.error': 'Ceva nu a mers. Sună direct la +373 69 269 888.',
    'msg.validation': 'Completează numele, telefonul și detaliile.'
  },

  ru: {
    // Meta
    'meta.title': 'gunoi.md — Вывоз мусора в Кишинёве',
    'meta.desc': 'Вывозим мусор быстро и недорого в Кишинёве. Старая мебель, строймусор, полная очистка. Звоните.',

    // Nav
    'nav.services': 'Услуги',
    'nav.pricing': 'Цены',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'nav.cta': 'Запросить оценку',

    // Launch banner
    'launch.text': 'Новинка в Кишинёве — первые 10 клиентов получают скидку 20%.',

    // Hero
    'hero.badge': 'Кишинёв · Отвечаем сегодня',
    'hero.title1': 'Всё это.',
    'hero.title2': 'Исчезнет завтра.',
    'hero.sub': 'Старая мебель, строймусор, техника, полная очистка квартир. Чёткая цена по телефону.',
    'hero.cta1': 'Позвоните: +373 69 269 888',
    'hero.cta2': 'Запросить оценку',
    'hero.badgeL': 'Заказ выполнен',

    // Live ticker
    'tick.pickups': 'Вывозов сегодня:',
    'tick.resp': 'Среднее время ответа:',
    'tick.respVal': '47 мин',
    'tick.area': 'Кишинёв + пригород',

    // Fake call
    'call.name': 'gunoi.md — Кишинёв',
    'call.sub': 'входящий вызов…',

    // Service mini
    'svc.mini': '+ Запросить',

    // Stats
    'stats.time': '24-48ч',
    'stats.timeL': 'От звонка до вывоза',
    'stats.price': 'от 500 MDL',
    'stats.priceL': 'Малый рейс',
    'stats.area': 'Кишинёв +',
    'stats.areaL': 'Пригород включён',

    // Services
    'services.eyebrow': 'Услуги',
    'services.title': 'Для кого мы работаем',
    's1.t': 'Частные лица',
    's1.d': 'Старая мебель, строймусор, техника, мешки. Приезжаем и вечером / в выходные.',
    's1.p': 'от 500 MDL',
    's2.t': 'Компании и офисы',
    's2.d': 'Офисы, стройка, мебель, оборудование. Счета и договор для юр. лиц.',
    's2.p': 'индивидуальная оценка',
    's3.t': 'Арендодатели',
    's3.d': 'Квартира осталась полной? Очищаем до стен. На следующий день сдаёте.',
    's3.p': 'оценка на месте',
    's4.t': 'Срочные вывозы и события',
    's4.d': 'Сегодня, сейчас, срочно. После вечеринок, переездов, малый снос.',
    's4.p': 'от 500 MDL',

    // How it works
    'how.eyebrow': 'Как это работает',
    'how.title': '3 шага.',
    'hw1.t': 'Звоните',
    'hw1.dHTML': 'Звоните на <a href="tel:+37369269888" class="inline-phone">+373 69 269 888</a>.',
    'hw2.t': 'Цена',
    'hw2.d': 'Чёткая цена по телефону. Согласуем время.',
    'hw3.t': 'Исчезает',
    'hw3.d': 'Грузим, платите, готово.',

    // Pricing
    'price.eyebrow': 'Цены',
    'price.title': 'Понятные тарифы. Без сюрпризов.',
    'price.badge': 'Популярный',
    'price.cta.short': 'Запросить',
    'p1.t': 'Малый · до 1м³',
    'p1.d': 'Несколько предметов, коробки, мешки',
    'p1.p': '500 MDL',
    'p2.t': 'Средний · ~3м³',
    'p2.d': 'Целая комната, бытовая техника',
    'p2.p': '1200 MDL',
    'p3.t': 'Большой · грузовик ~7м³',
    'p3.d': 'Целая квартира, небольшая стройка',
    'p3.p': '2500 MDL',
    'p4.t': 'Полная очистка квартиры / дома',
    'p4.p': 'оценка на месте',
    'p5.t': 'Отдельные крупногабаритные вещи',
    'p5.p': 'от 300 MDL/шт',
    'price.note': 'Итоговая цена зависит от объёма, доступа и типа отходов.',
    'price.cta': 'Позвоните: +373 69 269 888',

    // Scrap bonus
    'scrap.title': 'Есть металлолом? Вычитаем из цены.',
    'scrap.text': 'Радиаторы, трубы, кабели, техника с металлом — вычтем их стоимость из счёта.',

    // Why us
    'why.eyebrow': 'Почему мы',
    'why.title': 'Серьёзно, вовремя, с документами.',
    'why.p1': '✓ Легальная фирма · чек и счёт-фактура',
    'why.p2': '✓ Отвечаем в день обращения',
    'why.p3': '✓ Проверенная бригада в форме',
    'why.p4': '✓ Отходы на авторизованный полигон',
    'why.p5': '✓ Кишинёв + Яловены, Стрэшень, Кодру, Дурлешть, Стэучень',
    'why.p6': '✓ Наличные или перевод — на ваш выбор',

    // Before/after
    'ba.before': 'До',
    'ba.after': 'После',

    // FAQ
    'faq.eyebrow': 'Частые вопросы',
    'faq.title': 'Что спрашивают',
    'q1.t': 'Как быстро приедете?',
    'q1.a': 'Обычно 24-48ч. Срочно → в тот же день, если позвонили до 12:00.',
    'q2.t': 'Забираете строймусор?',
    'q2.a': 'Да — кирпич, бетон, гипсокартон, моллоз. Свыше 5м³ — отдельный грузовик. Асбест не берём.',
    'q3.t': 'Забираете бытовую технику?',
    'q3.a': 'Да — холодильники, стиралки, ТВ, компьютеры. На переработку. Ценный металл = скидка.',
    'q4.t': 'Что НЕ забираете?',
    'q4.a': 'Асбест, химия, открытые краски, битые аккумуляторы, мед. отходы, мёртвые животные.',
    'q5.t': 'Какие районы?',
    'q5.a': 'Весь Кишинёв + Яловены, Стрэшень, Кодру, Дурлешть, Стэучень, Бубуечь, Сынджера.',
    'q6.t': 'Как оплачивать?',
    'q6.a': 'Наличные или перевод. Юр. лица: договор, оплата 7-14 дней. Без аванса до 3000 MDL.',
    'q7.t': 'Мебель выношу я?',
    'q7.a': 'Нет — делаем всё сами. Вы только показываете. Высокий этаж без лифта = чуть дороже.',
    'q8.t': 'Документы для фирм?',
    'q8.a': 'Счёт-фактура, договор, акт приёма-передачи отходов. По закону.',

    // Contact
    'ct.eyebrow': 'Запросить оценку',
    'ct.title': 'Расскажите, что вывезти.',
    'ct.sub': 'Позвоните или оставьте данные — свяжемся за 2ч.',
    'ct.hours': 'Пн–Сб · 08:00–20:00 · Вс по запросу',
    'ct.or': 'или оставьте сообщение',
    'ct.f.name': 'Имя',
    'ct.f.phone': 'Телефон',
    'ct.f.address': 'Адрес',
    'ct.f.details': 'Что нужно вывезти?',
    'ct.f.date': 'Желаемая дата (необязательно)',
    'ct.f.submit': 'Отправить',
    'trust.1': '✓ Ответ за 2ч',
    'trust.2': '✓ Без аванса',
    'trust.3': '✓ Документы в порядке',

    // Footer
    'footer.tag': 'Вывоз мусора в Кишинёве и пригороде. Быстро, недорого, с документами.',
    'footer.areas': 'Кишинёв · Яловены · Стрэшень · Кодру · Дурлешть · Стэучень · Бубуечь · Сынджера',
    'footer.made': 'Сделано в Кишинёве',

    // Messages
    'msg.success': 'Заявка получена. Перезвоним.',
    'msg.error': 'Что-то пошло не так. Звоните +373 69 269 888.',
    'msg.validation': 'Заполните имя, телефон и детали.'
  }
};

let currentLang = 'ro';

function applyLang(lang) {
  if (!translations[lang]) lang = 'ro';
  currentLang = lang;
  const dict = translations[lang];
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'ro';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!dict[key]) return;
    const htmlKey = key + 'HTML';
    if (dict[htmlKey]) {
      el.innerHTML = dict[htmlKey];
    } else {
      el.textContent = dict[key];
    }
  });

  // hw1 has embedded HTML (phone link)
  const hw1 = document.querySelector('[data-i18n="hw1.d"]');
  if (hw1 && dict['hw1.dHTML']) hw1.innerHTML = dict['hw1.dHTML'];

  // Meta
  const titleEl = document.querySelector('title[data-i18n="meta.title"]');
  if (titleEl && dict['meta.title']) titleEl.textContent = dict['meta.title'];
  const descEl = document.querySelector('meta[name="description"][data-i18n="meta.desc"]');
  if (descEl && dict['meta.desc']) descEl.setAttribute('content', dict['meta.desc']);

  // Toggle indicator
  const active = document.querySelector('[data-lang-active]');
  const inactive = document.querySelector('[data-lang-inactive]');
  if (active && inactive) {
    if (lang === 'ro') {
      active.textContent = 'RO';
      inactive.textContent = 'RU';
    } else {
      active.textContent = 'RU';
      inactive.textContent = 'RO';
    }
  }

  try { localStorage.setItem('gunoi_lang', lang); } catch (e) {}
}

const toggleBtn = document.getElementById('langToggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    applyLang(currentLang === 'ro' ? 'ru' : 'ro');
  });
}

// Initial language: saved > browser RU > default RO
(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('gunoi_lang'); } catch (e) {}
  if (saved && translations[saved]) {
    applyLang(saved);
    return;
  }
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  applyLang(browser === 'ru' ? 'ru' : 'ro');
})();

// ---- Launch banner (dismissible, persists) ----
(function launchBanner() {
  const banner = document.getElementById('launchBanner');
  const closeBtn = document.getElementById('launchClose');
  if (!banner || !closeBtn) return;

  let dismissed = false;
  try { dismissed = localStorage.getItem('gunoi_launch_dismissed') === '1'; } catch (e) {}

  if (dismissed) {
    banner.classList.add('hidden');
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    try { localStorage.setItem('gunoi_launch_dismissed', '1'); } catch (e) {}
  });
})();

// ---- Scroll reveal ----
// Any element with class "reveal" fades/slides in when it enters the viewport.
// Sections without the class are auto-tagged below so existing content still animates.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Auto-tag additional elements that should reveal on scroll (belt + suspenders —
// most reveal-worthy elements already have .reveal in HTML, but this catches extras).
document.querySelectorAll(
  '.service-card, .step, .price-card, .price-callout, .faq-item, .why-points, .beforeafter, .scrap-inner'
).forEach(el => {
  if (!el.classList.contains('reveal')) el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- Contact form ----
const form = document.getElementById('waitlistForm');
const formMessage = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    const name = document.getElementById('wlName').value.trim();
    const phone = document.getElementById('wlPhone').value.trim();
    const address = document.getElementById('wlAddress').value.trim();
    const details = document.getElementById('wlDetails').value.trim();
    const date = document.getElementById('wlDate').value.trim();

    const dict = translations[currentLang];

    if (!name || !phone || !details) {
      formMessage.textContent = dict['msg.validation'];
      formMessage.classList.add('error');
      return;
    }

    const payload = {
      name, phone, address, details, date,
      ts: new Date().toISOString(),
      lang: currentLang
    };

    // Local fallback so requests aren't lost while backend is being wired up.
    try {
      const key = 'gunoi_requests';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(payload);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {}

    // TODO: Wire this to a real backend.
    // Options:
    //   - Formspree: POST to https://formspree.io/f/YOUR_ID with JSON
    //   - Resend + a Vercel serverless function at /api/contact
    //   - Simple SMTP relay (e.g., EmailJS)
    // For now: open the user's mail client as a best-effort fallback so the
    // lead still reaches the business even without a backend.
    try {
      const subject = encodeURIComponent(
        currentLang === 'ru'
          ? 'Заявка с сайта gunoi.md'
          : 'Cerere de pe site-ul gunoi.md'
      );
      const body = encodeURIComponent(
        (currentLang === 'ru' ? 'Имя' : 'Nume') + `: ${name}\n` +
        (currentLang === 'ru' ? 'Телефон' : 'Telefon') + `: ${phone}\n` +
        (currentLang === 'ru' ? 'Адрес' : 'Adresa') + `: ${address}\n` +
        (currentLang === 'ru' ? 'Дата' : 'Data') + `: ${date}\n\n` +
        (currentLang === 'ru' ? 'Детали' : 'Detalii') + `:\n${details}\n`
      );
      window.location.href = `mailto:salut@gunoi.md?subject=${subject}&body=${body}`;
    } catch (e) {}

    formMessage.textContent = dict['msg.success'];
    formMessage.classList.add('success');
    form.reset();
  });
}

/* ================================
   SHOCK REBUILD — runtime
   ================================ */

const REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- JUNK ABYSS canvas physics ----
function initJunkAbyss() {
  const canvas = document.getElementById('junkAbyss');
  if (!canvas || REDUCED_MOTION) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0, floorY = 0;
  let items = [];
  let running = true;
  let lastSpawn = 0;
  let lastFrame = 0;
  const MAX_ITEMS = window.innerWidth < 700 ? 14 : 26;
  const FRAME_MS = 1000 / 60;
  const GRAVITY = 0.38;
  const FRICTION = 0.88;
  const BOUNCE = 0.28;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    floorY = H - 10;
  }

  // Item types: each returns draw + size
  const TYPES = [
    { // couch
      w: 110, h: 46,
      draw(ctx) {
        ctx.fillStyle = '#1a3d28';
        ctx.strokeStyle = '#6ee7a8';
        ctx.lineWidth = 2;
        roundRect(ctx, -this.w/2, -this.h/2+8, this.w, this.h-8, 6, true, true);
        roundRect(ctx, -this.w/2, -this.h/2, this.w*0.3, this.h*0.6, 4, true, true);
        roundRect(ctx, -this.w*0.15, -this.h/2, this.w*0.3, this.h*0.6, 4, true, true);
        roundRect(ctx, this.w*0.2, -this.h/2, this.w*0.3, this.h*0.6, 4, true, true);
      }
    },
    { // TV
      w: 72, h: 52,
      draw(ctx) {
        ctx.fillStyle = '#0e1610';
        ctx.strokeStyle = '#5a5a5a';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
        ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
        ctx.fillStyle = '#14201a';
        ctx.fillRect(-this.w/2+5, -this.h/2+5, this.w-10, this.h-14);
        ctx.fillStyle = '#3ddc84';
        ctx.fillRect(-this.w/2+8, this.h/2-5, 6, 2);
      }
    },
    { // box
      w: 56, h: 50,
      draw(ctx) {
        ctx.fillStyle = '#8a7a5c';
        ctx.strokeStyle = '#a68f6a';
        ctx.lineWidth = 2;
        ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
        ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
        ctx.beginPath();
        ctx.moveTo(-this.w/2, 0); ctx.lineTo(this.w/2, 0);
        ctx.moveTo(0, -this.h/2); ctx.lineTo(0, this.h/2);
        ctx.stroke();
      }
    },
    { // mattress
      w: 100, h: 30,
      draw(ctx) {
        ctx.fillStyle = '#d8d2bf';
        ctx.strokeStyle = '#8a7a5c';
        ctx.lineWidth = 2;
        roundRect(ctx, -this.w/2, -this.h/2, this.w, this.h, 6, true, true);
        ctx.strokeStyle = '#a68f6a';
        ctx.lineWidth = 1;
        for (let i = -this.w/2+12; i < this.w/2-10; i += 14) {
          ctx.beginPath();
          ctx.moveTo(i, -this.h/2+4);
          ctx.lineTo(i, this.h/2-4);
          ctx.stroke();
        }
      }
    },
    { // chair
      w: 40, h: 52,
      draw(ctx) {
        ctx.fillStyle = '#1a3d28';
        ctx.strokeStyle = '#6ee7a8';
        ctx.lineWidth = 2;
        ctx.fillRect(-this.w/2, 0, this.w, 10);
        ctx.strokeRect(-this.w/2, 0, this.w, 10);
        ctx.fillRect(this.w/2-8, -this.h/2, 8, this.h/2+10);
        ctx.strokeRect(this.w/2-8, -this.h/2, 8, this.h/2+10);
        ctx.beginPath();
        ctx.moveTo(-this.w/2+3, 10); ctx.lineTo(-this.w/2+3, this.h/2);
        ctx.moveTo(this.w/2-3, 10); ctx.lineTo(this.w/2-3, this.h/2);
        ctx.stroke();
      }
    },
    { // bag
      w: 46, h: 54,
      draw(ctx) {
        ctx.fillStyle = '#1c1c1c';
        ctx.strokeStyle = '#6ee7a8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.w/2+6, -this.h/2+10);
        ctx.quadraticCurveTo(-this.w/2-2, 0, -this.w/2+6, this.h/2);
        ctx.quadraticCurveTo(0, this.h/2+6, this.w/2-6, this.h/2);
        ctx.quadraticCurveTo(this.w/2+2, 0, this.w/2-6, -this.h/2+10);
        ctx.quadraticCurveTo(0, -this.h/2, -this.w/2+6, -this.h/2+10);
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-8, -this.h/2+10); ctx.lineTo(-4, -this.h/2);
        ctx.moveTo(8, -this.h/2+10); ctx.lineTo(4, -this.h/2);
        ctx.stroke();
      }
    },
    { // lamp
      w: 36, h: 56,
      draw(ctx) {
        ctx.fillStyle = '#ffb454';
        ctx.strokeStyle = '#6ee7a8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.w/2, -this.h/2+20);
        ctx.lineTo(0, -this.h/2);
        ctx.lineTo(this.w/2, -this.h/2+20);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -this.h/2+20);
        ctx.lineTo(0, this.h/2);
        ctx.stroke();
      }
    },
    { // carpet roll
      w: 90, h: 24,
      draw(ctx) {
        ctx.fillStyle = '#6b4a28';
        ctx.strokeStyle = '#a68f6a';
        ctx.lineWidth = 2;
        roundRect(ctx, -this.w/2, -this.h/2, this.w, this.h, this.h/2, true, true);
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(-this.w/2+2, 0, this.h/2-4, 0, Math.PI*2);
        ctx.fill();
      }
    },
    { // toilet (L shape)
      w: 44, h: 50,
      draw(ctx) {
        ctx.fillStyle = '#e8f0e8';
        ctx.strokeStyle = '#6ee7a8';
        ctx.lineWidth = 2;
        roundRect(ctx, -this.w/2, -this.h/2, this.w, this.h*0.55, 4, true, true);
        roundRect(ctx, -this.w/2+4, 0, this.w-8, this.h*0.45, 10, true, true);
      }
    },
    { // appliance (fridge/washer)
      w: 56, h: 72,
      draw(ctx) {
        ctx.fillStyle = '#dcdcdc';
        ctx.strokeStyle = '#5a5a5a';
        ctx.lineWidth = 2;
        ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
        ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
        ctx.beginPath();
        ctx.arc(0, -this.h/2+this.h*0.35, 12, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(this.w/2-10, -this.h/2+4, 4, 4);
      }
    }
  ];

  function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  function spawn() {
    if (items.length >= MAX_ITEMS) return;
    const t = TYPES[Math.floor(Math.random() * TYPES.length)];
    const scale = window.innerWidth < 700 ? 0.7 : 1;
    items.push({
      type: t,
      x: W * (0.1 + Math.random() * 0.8),
      y: -60,
      vx: (Math.random() - 0.5) * 1.2,
      vy: 0.5 + Math.random() * 1.5,
      rot: (Math.random() - 0.5) * 0.9,
      vr: (Math.random() - 0.5) * 0.08,
      scale: scale * (0.85 + Math.random() * 0.3),
      life: 1,
      born: performance.now(),
      settled: false
    });
  }

  function step(now) {
    if (!running) return;
    requestAnimationFrame(step);
    if (now - lastFrame < FRAME_MS - 2) return;
    lastFrame = now;

    if (now - lastSpawn > 400 + Math.random() * 400) {
      spawn();
      lastSpawn = now;
    }

    ctx.clearRect(0, 0, W, H);

    // Update physics (simple: vertical gravity + floor stack using top-of-pile lookup)
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const age = (now - it.born) / 1000;

      // Find resting Y using overlap with already-settled items below this x
      let restY = floorY;
      for (let j = 0; j < items.length; j++) {
        if (j === i) continue;
        const other = items[j];
        if (!other.settled && other !== it) continue;
        const halfW = (it.type.w * it.scale) / 2;
        const otherHalfW = (other.type.w * other.scale) / 2;
        if (Math.abs(it.x - other.x) < halfW + otherHalfW - 6) {
          const top = other.y - (other.type.h * other.scale) / 2;
          if (top < restY) restY = top;
        }
      }
      const halfH = (it.type.h * it.scale) / 2;
      const targetY = restY - halfH;

      if (!it.settled) {
        it.vy += GRAVITY;
        it.y += it.vy;
        it.x += it.vx;
        it.rot += it.vr;
        it.vr *= 0.99;
        it.vx *= 0.995;
        if (it.y >= targetY) {
          it.y = targetY;
          if (it.vy > 2) {
            it.vy = -it.vy * BOUNCE;
            it.vx *= FRICTION;
            it.vr *= 0.6;
          } else {
            it.vy = 0;
            it.vx = 0;
            it.settled = true;
            // snap rotation toward nearest 0/pi for realism
            it.rot = Math.round(it.rot / (Math.PI / 4)) * (Math.PI / 4) + (Math.random()-0.5)*0.2;
          }
        }
      }

      // Dissolve oldest if pile is too tall
      if (age > 8 && it.y < floorY - H * 0.55) {
        it.life -= 0.015;
      }

      // Draw
      ctx.save();
      ctx.translate(it.x, it.y);
      ctx.rotate(it.rot);
      ctx.scale(it.scale, it.scale);
      if (it.life < 1) {
        ctx.globalAlpha = Math.max(0, it.life);
        ctx.shadowColor = '#3ddc84';
        ctx.shadowBlur = 20 * (1 - it.life);
      }
      it.type.draw(ctx);
      ctx.restore();
    }

    // Remove dead items
    items = items.filter(it => it.life > 0.05);

    // Floor line
    ctx.strokeStyle = 'rgba(110,231,168,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(W, floorY);
    ctx.stroke();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      // Re-settle: clear settled flag bottom items remain roughly positioned
      items.forEach(it => { if (it.y > floorY) it.y = floorY; });
    }, 120);
  });

  // Pause when off-screen
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      running = e.isIntersecting;
      if (running) {
        lastFrame = 0;
        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0 });
  io.observe(canvas);

  resize();
  // Seed a few so the pile looks non-empty on load
  for (let i = 0; i < 6; i++) {
    spawn();
    const it = items[items.length-1];
    if (it) { it.y = floorY - 20 - i * 30; it.vy = 2; }
  }
  requestAnimationFrame(step);
}

initJunkAbyss();

// ---- LIVE TICKER (pickups today counter) ----
(function ticker() {
  const el = document.getElementById('tickPickups');
  if (!el) return;
  // Seed based on hour so repeat visitors see plausible growth through day
  const hour = new Date().getHours();
  let count = Math.floor(3 + (hour / 24) * 22 + Math.random() * 4); // grows with hour
  el.textContent = count;
  function bump() {
    if (document.hidden) return;
    if (Math.random() < 0.55) {
      count += 1;
      el.textContent = count;
      el.style.transition = 'color 0.4s ease';
      el.style.color = '#bfffda';
      setTimeout(() => { el.style.color = ''; }, 450);
    }
  }
  setInterval(bump, 4000 + Math.random() * 4000);
})();

// ---- BEFORE/AFTER drag slider ----
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
    const x = (e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX)) - rect.left;
    return (x / rect.width) * 100;
  }

  slider.addEventListener('pointerdown', (e) => {
    dragging = true;
    slider.classList.add('dragging');
    slider.setPointerCapture && slider.setPointerCapture(e.pointerId);
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
  });
})();

// ---- SERVICE CARD tap (mobile micro-interaction) ----
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('tapped');
    setTimeout(() => card.classList.remove('tapped'), 1200);
  });
});

// ---- PRICING TRUCK ----
(function pricingTruck() {
  const truck = document.getElementById('pricingTruck');
  const cards = document.querySelectorAll('#pricing .price-card');
  if (!truck || !cards.length) return;
  let idx = 0;
  function position(i) {
    const card = cards[i];
    if (!card) return;
    const parent = truck.offsetParent;
    if (!parent) return;
    const pr = parent.getBoundingClientRect();
    const cr = card.getBoundingClientRect();
    const left = (cr.left - pr.left) + cr.width/2 - 32;
    truck.style.left = left + 'px';
  }
  setTimeout(() => position(idx), 300);
  if (window.matchMedia('(min-width: 900px)').matches && !REDUCED_MOTION) {
    setInterval(() => {
      idx = (idx + 1) % cards.length;
      position(idx);
    }, 3200);
  }
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const i = Array.from(cards).indexOf(card);
      position(i);
    });
    card.addEventListener('click', () => {
      card.classList.remove('puff');
      // trigger reflow
      void card.offsetWidth;
      card.classList.add('puff');
      setTimeout(() => card.classList.remove('puff'), 800);
    });
  });
  window.addEventListener('resize', () => position(idx));
})();

// ---- FAKE INCOMING CALL (Easter egg) ----
(function incomingCall() {
  const el = document.getElementById('incomingCall');
  const decline = document.getElementById('callDecline');
  const accept = document.getElementById('callAccept');
  const footer = document.querySelector('.footer');
  if (!el || !footer) return;

  let dismissed = false;
  try { dismissed = sessionStorage.getItem('gunoi_call_dismissed') === '1'; } catch (e) {}
  let footerInView = false;
  let showing = false;

  const fio = new IntersectionObserver(entries => {
    entries.forEach(e => { footerInView = e.isIntersecting; });
  }, { threshold: 0.1 });
  fio.observe(footer);

  function show() {
    if (dismissed || showing || !footerInView || document.hidden) return;
    showing = true;
    el.classList.add('show');
    el.setAttribute('aria-hidden', 'false');
    // Auto-hide after 12s if no action
    setTimeout(() => {
      if (showing) hide();
    }, 12000);
  }
  function hide() {
    showing = false;
    el.classList.remove('show');
    el.setAttribute('aria-hidden', 'true');
  }

  decline && decline.addEventListener('click', () => {
    hide();
    dismissed = true;
    try { sessionStorage.setItem('gunoi_call_dismissed', '1'); } catch (e) {}
  });
  accept && accept.addEventListener('click', () => {
    hide();
    // Let tel: link proceed naturally
  });

  // Trigger cycle
  setInterval(() => {
    if (!showing) show();
    else if (Math.random() < 0.3) hide();
  }, 22000);
})();

// ---- SOUND TOGGLE (decorative stub) ----
(function soundToggle() {
  const btn = document.getElementById('soundToggle');
  if (!btn) return;
  let on = false;
  btn.addEventListener('click', () => {
    on = !on;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
})();
