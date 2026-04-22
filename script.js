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
    'hero.title1': 'Scăpăm de gunoiul tău.',
    'hero.title2': 'Rapid și ieftin.',
    'hero.sub': 'Mobilă veche, debris, electrocasnice, evacuări complete. Ofertă clară la telefon.',
    'hero.cta1': 'Sună: +373 69 269 888',
    'hero.cta2': 'Cere ofertă',
    'hero.badgeL': 'Comandă rezolvată',

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
    'how.title': 'Trei pași. Fără bătăi de cap.',
    'hw1.t': 'Ne suni',
    'hw1.dHTML': 'Sună la <a href="tel:+37369269888" class="inline-phone">+373 69 269 888</a>. Descrie volumul și adresa. O foto ajută.',
    'hw2.t': 'Primești prețul',
    'hw2.d': 'Ofertă la telefon, fără surprize. Stabilim ziua și ora.',
    'hw3.t': 'Ridicăm, plătești',
    'hw3.d': 'Încărcăm, ducem la depozit legal. Plătești pe loc. Bon sau factură.',

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
    'hero.title1': 'Избавим от мусора.',
    'hero.title2': 'Быстро и недорого.',
    'hero.sub': 'Старая мебель, строймусор, техника, полная очистка квартир. Чёткая цена по телефону.',
    'hero.cta1': 'Позвоните: +373 69 269 888',
    'hero.cta2': 'Запросить оценку',
    'hero.badgeL': 'Заказ выполнен',

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
    'how.title': 'Три шага. Без головной боли.',
    'hw1.t': 'Вы звоните',
    'hw1.dHTML': 'Звоните на <a href="tel:+37369269888" class="inline-phone">+373 69 269 888</a>. Опишите объём и адрес. Фото помогает.',
    'hw2.t': 'Получаете цену',
    'hw2.d': 'Цена по телефону, без сюрпризов. Согласовываем день и время.',
    'hw3.t': 'Вывозим, вы платите',
    'hw3.d': 'Грузим, везём на официальный полигон. Оплата на месте. Чек или счёт.',

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
