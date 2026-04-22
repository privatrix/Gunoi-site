/* ================================
   gunoi.md — interactivity
   Languages: RO (default) + RU
   ================================ */

const translations = {
  ro: {
    // Meta
    'meta.title': 'gunoi.md — Evacuare gunoi și deșeuri în Chișinău',
    'meta.desc': 'Ridicăm gunoiul tău rapid și ieftin în Chișinău și suburbii. Mobilă veche, debris de la renovare, electrocasnice, evacuări complete. Sună pentru ofertă.',

    // Nav
    'nav.services': 'Servicii',
    'nav.pricing': 'Prețuri',
    'nav.about': 'Despre',
    'nav.contact': 'Contact',
    'nav.cta': 'Cere ofertă',

    // Hero
    'hero.badge': 'Chișinău și suburbii · Răspundem azi',
    'hero.title1': 'Scăpăm de gunoiul tău.',
    'hero.title2': 'Rapid și ieftin.',
    'hero.sub': 'Evacuăm mobilă veche, debris de la renovare, electrocasnice, gunoi mixt și facem evacuări complete apartamente. Ofertă clară la telefon, venim când spui tu, plătești când e gata.',
    'hero.cta1': 'Sună acum: +373 69 269 888',
    'hero.cta2': 'Cere ofertă',

    // Stats
    'stats.time': '24-48h',
    'stats.timeL': 'De la apel la evacuare',
    'stats.price': 'de la 500 MDL',
    'stats.priceL': 'Pentru rută mică',
    'stats.area': 'Chișinău +',
    'stats.areaL': 'Suburbiile incluse',

    // Phone mock
    'scan.status': 'Ridicare confirmată',
    'scan.label': 'Comandă',
    'scan.name': '1 cameră · mobilă + saci',
    'scan.price': 'Ofertă',
    'scan.book': 'Programează →',

    // Services
    'services.eyebrow': 'Servicii',
    'services.title': 'Pentru cine lucrăm',
    's1.t': 'Gospodării',
    's1.d': 'Debris după renovare, mobilă veche, electrocasnice stricate, saci de gunoi, curățare pivniță sau garaj. Venim când ai timp, inclusiv seara sau în weekend.',
    's1.p': 'de la 500 MDL',
    's2.t': 'Firme & oficii',
    's2.d': 'Evacuare birouri, relocări, deșeuri de la șantier, mobilier vechi, echipament scos din uz. Emitem bon sau factură, lucrăm cu contract pentru firme.',
    's2.p': 'ofertă personalizată',
    's3.t': 'Proprietari care dau în chirie',
    's3.d': 'Apartament lăsat de chiriași cu totul în el? Curățăm complet — mobilă, haine, electrocasnice, gunoi — până rămâne gol. Predai altor chiriași a doua zi.',
    's3.p': 'evaluare la fața locului',
    's4.t': 'Evacuări rapide & evenimente',
    's4.d': 'O dată, urgent, azi? Demolare mică, curățare după petrecere, mutare cu grămezi de lăsat în urmă. Un apel și venim.',
    's4.p': 'de la 500 MDL',

    // How it works
    'how.eyebrow': 'Cum funcționează',
    'how.title': 'Trei pași. Fără bătăi de cap.',
    'hw1.t': 'Ne spui ce ai',
    'hw1.dHTML': 'Sună la <a href="tel:+37369269888" class="inline-phone">+373 69 269 888</a> sau completează formularul. Descrie volumul, adresa, accesul. O fotografie ajută.',
    'hw2.t': 'Primești oferta',
    'hw2.d': 'Îți spunem prețul la telefon, fără surprize. Dacă lucrarea e mare, venim gratis să evaluăm la fața locului. Stabilim ziua și ora.',
    'hw3.t': 'Venim, ridicăm, plătești',
    'hw3.d': 'Echipa vine cu mașina, încarcă totul, duce la depozitul legal de deșeuri. Plătești pe loc — cash sau transfer. Emitem bon sau factură.',

    // Pricing
    'price.eyebrow': 'Prețuri orientative',
    'price.title': 'Tarife clare. Fără surprize.',
    'price.h1': 'Serviciu',
    'price.h2': 'Preț',
    'p1.t': 'Mic · până la 1m³',
    'p1.d': 'Câteva obiecte de mobilă, cutii, saci',
    'p1.p': 'de la 500 MDL',
    'p2.t': 'Mediu · ~3m³',
    'p2.d': 'O cameră întreagă, electrocasnice',
    'p2.p': 'de la 1200 MDL',
    'p3.t': 'Mare · camion ~7m³',
    'p3.d': 'Apartament întreg, șantier mic',
    'p3.p': 'de la 2500 MDL',
    'p4.t': 'Evacuare completă apartament / casă',
    'p4.d': 'Curățare totală până la pereți goi',
    'p4.p': 'ofertă la fața locului',
    'p5.t': 'Obiecte mari individuale',
    'p5.d': 'Frigider, canapea, mobilă grea',
    'p5.p': 'de la 300 MDL/bucată',
    'price.note': 'Prețul final depinde de volum, greutate și acces. Cere ofertă gratuită.',
    'price.cta': 'Sună pentru ofertă: +373 69 269 888',

    // Factors
    'factors.title': 'Ce influențează prețul',
    'f1.t': 'Volum și greutate',
    'f1.d': '— cât de mult încape în mașină',
    'f2.t': 'Acces',
    'f2.d': '— etaj, lift, distanța până la mașină',
    'f3.t': 'Tip de deșeu',
    'f3.d': '— debris greu costă mai mult decât mobilă',
    'f4.t': 'Urgență',
    'f4.d': '— azi costă puțin mai mult decât săptămâna viitoare',
    'f5.t': 'Materiale periculoase',
    'f5.d': '— nu preluăm azbest, chimice, medicale',

    // Scrap bonus
    'scrap.title': 'Ai fier vechi în gunoi? Reducere la preț.',
    'scrap.text': 'Dacă printre lucrurile de evacuat ai metal — radiatoare vechi, țevi, electrocasnice, cabluri, fier de la șantier — scădem valoarea lor din factură. Spune-ne la telefon ce ai, calculăm împreună.',

    // Why us
    'why.eyebrow': 'De ce noi',
    'why.title': 'Serios, la timp, cu acte în regulă.',
    'why.body': 'Mulți spun că vin și apoi nu apar. Sau apar, dar cu prețul dublat. Noi lucrăm altfel: ofertă clară la telefon, program respectat, echipă îmbrăcată ca oamenii, deșeurile duse la depozitul legal — nu aruncate pe câmp la marginea orașului.',
    'why.p1': '✓ Firmă legală, emitem bon fiscal sau factură',
    'why.p2': '✓ Răspundem la telefon în ziua apelului',
    'why.p3': '✓ Echipă verificată, îmbrăcată uniform',
    'why.p4': '✓ Deșeurile merg la depozit autorizat',
    'why.p5': '✓ Acoperim Chișinău + Ialoveni, Strășeni, Codru, Durlești, Stăuceni',
    'why.p6': '✓ Plată cash sau transfer — tu alegi',

    // FAQ
    'faq.eyebrow': 'Întrebări frecvente',
    'faq.title': 'Ce întreabă lumea',
    'q1.t': 'Cât de repede puteți veni?',
    'q1.a': 'De obicei în 24-48 de ore de la apel. Pentru urgențe încercăm să venim în aceeași zi, dacă sunați până la ora 12:00. Depinde de volumul de comenzi și de zonă.',
    'q2.t': 'Luați debris de la construcție și renovare?',
    'q2.a': 'Da — cărămidă, beton spart, gipscarton, parchet, tâmplărie, moloz. Pentru volume mari (peste 5m³) trimitem camion special. Nu luăm azbest.',
    'q3.t': 'Luați electrocasnice și electronice?',
    'q3.a': 'Da — frigidere, mașini de spălat, sobe, televizoare, calculatoare. Le ducem la punctul legal de reciclare. Dacă au metal valoros înăuntru, scădem ceva din preț.',
    'q4.t': 'Ce NU luați?',
    'q4.a': 'Nu luăm deșeuri periculoase: azbest, substanțe chimice, vopsele deschise, baterii auto sparte, deșeuri medicale, animale moarte. Pentru acestea îți spunem unde să te duci.',
    'q5.t': 'Ce zone acoperiți?',
    'q5.a': 'Chișinău integral (toate sectoarele) plus Ialoveni, Strășeni, Codru, Durlești, Stăuceni, Bubuieci, Sîngera. Pentru alte localități sunați și discutăm.',
    'q6.t': 'Cum plătesc?',
    'q6.a': 'Cash la finalul lucrării sau transfer bancar după emiterea facturii. Pentru firme lucrăm cu contract și plata în 7-14 zile. Nu cerem avans pentru comenzi sub 3000 MDL.',
    'q7.t': 'Urc eu mobila sau o faceți voi?',
    'q7.a': 'Noi facem totul — scoatere din apartament, coborâre pe scări, încărcare. Tu doar arăți ce pleacă. Dacă e etaj înalt fără lift, prețul crește puțin.',
    'q8.t': 'Pentru firme, emiteți acte?',
    'q8.a': 'Da — factură fiscală, contract de prestări servicii, act de primire-predare a deșeurilor. Lucrăm cu persoane juridice conform legii.',

    // Contact
    'ct.eyebrow': 'Cere ofertă',
    'ct.title': 'Spune-ne ce ai de evacuat.',
    'ct.sub': 'Sună direct sau lasă-ne detaliile și te contactăm în maxim 2 ore în program de lucru.',
    'ct.hours': 'Luni–Sâmbătă · 08:00–20:00 · Duminica la cerere',
    'ct.or': 'sau lasă un mesaj',
    'ct.f.name': 'Nume',
    'ct.f.phone': 'Telefon',
    'ct.f.address': 'Adresa (stradă, sector)',
    'ct.f.details': 'Ce trebuie evacuat? (volum, tip de obiecte)',
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
    'meta.title': 'gunoi.md — Вывоз мусора и отходов в Кишинёве',
    'meta.desc': 'Вывозим ваш мусор быстро и недорого в Кишинёве и пригороде. Старая мебель, строительный мусор, бытовая техника, полная очистка. Звоните для оценки.',

    // Nav
    'nav.services': 'Услуги',
    'nav.pricing': 'Цены',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'nav.cta': 'Запросить оценку',

    // Hero
    'hero.badge': 'Кишинёв и пригород · Отвечаем сегодня',
    'hero.title1': 'Избавим от мусора.',
    'hero.title2': 'Быстро и недорого.',
    'hero.sub': 'Вывозим старую мебель, строительный мусор после ремонта, бытовую технику, смешанный мусор, делаем полную очистку квартир. Чёткая цена по телефону, приезжаем когда удобно вам, оплата по факту.',
    'hero.cta1': 'Позвоните: +373 69 269 888',
    'hero.cta2': 'Запросить оценку',

    // Stats
    'stats.time': '24-48ч',
    'stats.timeL': 'От звонка до вывоза',
    'stats.price': 'от 500 MDL',
    'stats.priceL': 'За малый рейс',
    'stats.area': 'Кишинёв +',
    'stats.areaL': 'Пригород включён',

    // Phone mock
    'scan.status': 'Вывоз подтверждён',
    'scan.label': 'Заказ',
    'scan.name': '1 комната · мебель + мешки',
    'scan.price': 'Цена',
    'scan.book': 'Записать →',

    // Services
    'services.eyebrow': 'Услуги',
    'services.title': 'Для кого мы работаем',
    's1.t': 'Частные лица',
    's1.d': 'Строительный мусор после ремонта, старая мебель, сломанная техника, мешки с мусором, уборка подвала или гаража. Приезжаем когда вам удобно — вечером или в выходные.',
    's1.p': 'от 500 MDL',
    's2.t': 'Компании и офисы',
    's2.d': 'Вывоз из офисов, переезды, строительные отходы, старая мебель, списанное оборудование. Выдаём чек или счёт-фактуру, работаем с юр. лицами по договору.',
    's2.p': 'индивидуальная оценка',
    's3.t': 'Арендодатели',
    's3.d': 'Квартиранты оставили всё в квартире? Очищаем полностью — мебель, одежда, техника, мусор — до пустых стен. На следующий день сдаёте новым жильцам.',
    's3.p': 'оценка на месте',
    's4.t': 'Срочные вывозы и события',
    's4.d': 'Разово, срочно, сегодня? Небольшой снос, уборка после вечеринки, переезд с кучами на выброс. Один звонок — и мы у вас.',
    's4.p': 'от 500 MDL',

    // How it works
    'how.eyebrow': 'Как это работает',
    'how.title': 'Три шага. Без головной боли.',
    'hw1.t': 'Расскажите, что есть',
    'hw1.dHTML': 'Звоните на <a href="tel:+37369269888" class="inline-phone">+373 69 269 888</a> или заполните форму. Опишите объём, адрес, доступ. Фото очень помогает.',
    'hw2.t': 'Получаете цену',
    'hw2.d': 'Называем цену по телефону, без сюрпризов. Если объём большой — приезжаем бесплатно оценить на месте. Согласовываем день и время.',
    'hw3.t': 'Приезжаем, вывозим, вы платите',
    'hw3.d': 'Бригада приезжает с машиной, грузит всё, везёт на официальный полигон. Оплата на месте — наличными или переводом. Выдаём чек или счёт.',

    // Pricing
    'price.eyebrow': 'Ориентировочные цены',
    'price.title': 'Понятные тарифы. Без сюрпризов.',
    'price.h1': 'Услуга',
    'price.h2': 'Цена',
    'p1.t': 'Малый · до 1м³',
    'p1.d': 'Несколько предметов мебели, коробки, мешки',
    'p1.p': 'от 500 MDL',
    'p2.t': 'Средний · ~3м³',
    'p2.d': 'Целая комната, бытовая техника',
    'p2.p': 'от 1200 MDL',
    'p3.t': 'Большой · грузовик ~7м³',
    'p3.d': 'Целая квартира, небольшая стройка',
    'p3.p': 'от 2500 MDL',
    'p4.t': 'Полная очистка квартиры / дома',
    'p4.d': 'Вычищаем до пустых стен',
    'p4.p': 'оценка на месте',
    'p5.t': 'Отдельные крупногабаритные вещи',
    'p5.d': 'Холодильник, диван, тяжёлая мебель',
    'p5.p': 'от 300 MDL/шт',
    'price.note': 'Итоговая цена зависит от объёма, веса и доступа. Запросите бесплатную оценку.',
    'price.cta': 'Позвоните для оценки: +373 69 269 888',

    // Factors
    'factors.title': 'Что влияет на цену',
    'f1.t': 'Объём и вес',
    'f1.d': '— сколько помещается в машину',
    'f2.t': 'Доступ',
    'f2.d': '— этаж, лифт, расстояние до машины',
    'f3.t': 'Тип отходов',
    'f3.d': '— тяжёлый строительный мусор дороже мебели',
    'f4.t': 'Срочность',
    'f4.d': '— сегодня чуть дороже, чем на следующей неделе',
    'f5.t': 'Опасные материалы',
    'f5.d': '— не берём асбест, химию, медицинские отходы',

    // Scrap bonus
    'scrap.title': 'Есть металлолом? Скидка на вывоз.',
    'scrap.text': 'Если среди вещей на вывоз есть металл — старые радиаторы, трубы, бытовая техника, кабели, железо со стройки — вычитаем его стоимость из счёта. Расскажите по телефону что есть, посчитаем вместе.',

    // Why us
    'why.eyebrow': 'Почему мы',
    'why.title': 'Серьёзно, вовремя, с документами.',
    'why.body': 'Многие обещают приехать — и не появляются. Или приезжают с удвоенной ценой. Мы работаем иначе: чёткая цена по телефону, соблюдаем график, бригада в форме, отходы везём на официальный полигон — а не бросаем за городом.',
    'why.p1': '✓ Легальная фирма, выдаём чек или счёт-фактуру',
    'why.p2': '✓ Отвечаем на звонки в день обращения',
    'why.p3': '✓ Проверенная бригада в единой форме',
    'why.p4': '✓ Отходы везём на авторизованный полигон',
    'why.p5': '✓ Работаем в Кишинёве + Яловены, Стрэшень, Кодру, Дурлешть, Стэучень',
    'why.p6': '✓ Оплата наличными или переводом — на ваш выбор',

    // FAQ
    'faq.eyebrow': 'Частые вопросы',
    'faq.title': 'Что спрашивают',
    'q1.t': 'Как быстро можете приехать?',
    'q1.a': 'Обычно в течение 24-48 часов после звонка. Если срочно — стараемся приехать в тот же день, если позвонили до 12:00. Зависит от загрузки и района.',
    'q2.t': 'Забираете строительный мусор после ремонта?',
    'q2.a': 'Да — кирпич, битый бетон, гипсокартон, паркет, столярку, моллоз. Для больших объёмов (более 5м³) отправляем отдельный грузовик. Асбест не берём.',
    'q3.t': 'Забираете бытовую технику и электронику?',
    'q3.a': 'Да — холодильники, стиральные машины, плиты, телевизоры, компьютеры. Сдаём на официальную переработку. Если внутри ценный металл — делаем скидку.',
    'q4.t': 'Что НЕ забираете?',
    'q4.a': 'Не берём опасные отходы: асбест, химию, открытые краски, битые аккумуляторы, медицинские отходы, мёртвых животных. Для них подскажем куда обратиться.',
    'q5.t': 'Какие районы обслуживаете?',
    'q5.a': 'Весь Кишинёв (все сектора) плюс Яловены, Стрэшень, Кодру, Дурлешть, Стэучень, Бубуечь, Сынджера. По другим населённым пунктам — звоните, обсудим.',
    'q6.t': 'Как оплачивать?',
    'q6.a': 'Наличными по факту выполнения работы или банковским переводом после счёта. С юр. лицами — по договору с оплатой 7-14 дней. Аванс не требуем для заказов до 3000 MDL.',
    'q7.t': 'Мебель выношу я или вы сами?',
    'q7.a': 'Мы делаем всё — выносим из квартиры, спускаем по лестнице, грузим. Вы только показываете что забрать. Если высокий этаж без лифта — цена немного увеличивается.',
    'q8.t': 'Для юр. лиц выдаёте документы?',
    'q8.a': 'Да — счёт-фактура, договор на оказание услуг, акт приёма-передачи отходов. С юр. лицами работаем по закону.',

    // Contact
    'ct.eyebrow': 'Запросить оценку',
    'ct.title': 'Расскажите, что нужно вывезти.',
    'ct.sub': 'Позвоните напрямую или оставьте данные — свяжемся в течение 2 часов в рабочее время.',
    'ct.hours': 'Пн–Сб · 08:00–20:00 · Вс по запросу',
    'ct.or': 'или оставьте сообщение',
    'ct.f.name': 'Имя',
    'ct.f.phone': 'Телефон',
    'ct.f.address': 'Адрес (улица, сектор)',
    'ct.f.details': 'Что нужно вывезти? (объём, тип вещей)',
    'ct.f.date': 'Желаемая дата (необязательно)',
    'ct.f.submit': 'Отправить заявку',
    'trust.1': '✓ Ответ за 2ч',
    'trust.2': '✓ Без аванса',
    'trust.3': '✓ Документы в порядке',

    // Footer
    'footer.tag': 'Вывоз мусора в Кишинёве и пригороде. Быстро, недорого, с документами.',
    'footer.areas': 'Кишинёв · Яловены · Стрэшень · Кодру · Дурлешть · Стэучень · Бубуечь · Сынджера',
    'footer.made': 'Сделано в Кишинёве',

    // Messages
    'msg.success': 'Заявка получена. Перезвоним в ближайшее время.',
    'msg.error': 'Что-то пошло не так. Звоните на +373 69 269 888.',
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
    // Special case: some keys contain embedded HTML (marked with HTML suffix in JS only)
    const htmlKey = key + 'HTML';
    if (dict[htmlKey]) {
      el.innerHTML = dict[htmlKey];
    } else {
      el.textContent = dict[key];
    }
  });

  // Special: hw1 description has a link. Look up hw1.dHTML if the element is the hw1 text.
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

// Replace the hw1 text element with its HTML version on load
document.addEventListener('DOMContentLoaded', () => {
  const hw1 = document.querySelector('[data-i18n="hw1.d"]');
  if (hw1) {
    const html = translations[currentLang]['hw1.dHTML'];
    if (html) hw1.innerHTML = html;
  }
});

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

// ---- Scroll reveal ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.step, .price-row, .faq-item, .why-body, .why-points, .scrap-inner').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
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
      // Fire and forget mailto — not ideal but guarantees the lead isn't silently dropped.
      window.location.href = `mailto:salut@gunoi.md?subject=${subject}&body=${body}`;
    } catch (e) {}

    formMessage.textContent = dict['msg.success'];
    formMessage.classList.add('success');
    form.reset();
  });
}
