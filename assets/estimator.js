/* gunoi.md — price estimator (RO /estimare/, RU /ru/ocenka/).
 * Prices come only from lib/estimate.js + pricing.config.json.
 * The AI step (POST /api/estimate) only lists items; nothing it writes is shown. */
import { estimate } from '/lib/estimate.js';

const PHONE = '069269888';
const PHONE_LABEL = '069 269 888';
const WA = '37369269888';
const MAX_PHOTOS = 5;
const PHOTO_TARGET_BYTES = 600 * 1024; // keeps 5 photos under the 4.5 MB request limit
const AI_TIMEOUT_MS = 20000;
const SECTORS = 5; // first N free_zones in the config are Chișinău sectors
const QUICK = ['canapea', 'saltea', 'dulap', 'stenca', 'pat', 'masa', 'scaun', 'frigider', 'masina_spalat',
  'aragaz', 'tv', 'fereastra', 'usa', 'covor', 'sac_moloz', 'sac_menajer', 'borcane', 'crengi', 'fier',
  'anvelopa', 'altceva'];
const STEPS = 6;

const T = {
  ro: {
    progress: 'Pasul {n} din {total}',
    back: 'Înapoi', next: 'Continuă', seePrice: 'Vezi prețul',
    s1: 'Ce ai de evacuat?',
    s1sub: 'Fă poze sau descrie în câteva cuvinte. Poți face ambele.',
    addPhotos: '📷 Adaugă poze', photosHint: 'până la 5 poze, din cameră sau galerie',
    photoFail: 'O poză nu a putut fi citită. Încearcă alta.',
    removePhoto: 'Șterge poza',
    textLabel: 'Descriere (opțional)',
    textPh: 'Ex.: 20 de saci, o canapea, poate și crengi',
    chipsLabel: 'Sau bifează rapid:',
    needItems: 'Adaugă poze, o descriere sau bifează cel puțin un obiect.',
    s2: 'Unde?',
    zoneLabel: 'Sectorul sau localitatea', zonePick: 'Alege…',
    sectors: 'Sectoare Chișinău', suburbs: 'Suburbii', other: 'Altă localitate',
    otherLabel: 'Numele localității',
    distLabel: 'Cât de departe e de Chișinău?',
    dist: { lt20: 'sub 20 km', '20to40': '20–40 km', gt40: 'peste 40 km', unknown: 'Nu știu' },
    streetLabel: 'Strada (opțional)',
    needZone: 'Alege sectorul sau localitatea.', needOther: 'Scrie numele localității.',
    s3: 'Etaj și acces',
    floorLabel: 'Etajul', floor0: 'Casă particulară / curte', floorN: 'Etajul {n}',
    lift: 'Este lift', down: 'Totul e deja jos / în curte', dismantle: 'Trebuie demontat ceva (dulap, stencă, bucătărie)',
    parkingLabel: 'Mașina poate parca aproape de intrare?',
    parking: { yes: 'Da', no: 'Nu', unknown: 'Nu știu' },
    s4: 'Când?',
    when: { today: 'Azi', tomorrow: 'Mâine', week: 'Săptămâna aceasta', later: 'Altă dată' },
    s5: 'Verifică lista',
    analyzing: 'Analizăm pozele și descrierea…',
    seen: 'Am văzut:', seenAsk: 'Corect? Ajustează cantitățile dacă e nevoie.',
    yourList: 'Lista ta:',
    aiFailed: 'Nu am putut analiza pozele acum. Am folosit lista bifată — completeaz-o mai jos.',
    unclear: 'Unele lucruri nu s-au văzut clar. Verifică lista.',
    addItem: 'Adaugă alt obiect', addPick: '+ Adaugă…',
    emptyList: 'Lista e goală — adaugă cel puțin un obiect.',
    remove: 'Șterge', less: 'Mai puțin', more: 'Mai mult',
    s6: 'Prețul estimat',
    negotiated: 'Preț la cerere',
    negotiatedSub: 'Localitatea e la peste 40 km. Îți facem o ofertă la telefon sau pe WhatsApp.',
    includedTitle: 'Ce intră în preț',
    included: ['Camion până la 9 m³', '2 hamali', 'Coborâre de la etaj și încărcare', 'Transport la un poligon autorizat', 'Bon fiscal', 'Plătești la final, după ce terminăm'],
    howTitle: 'Cum am calculat',
    note: 'Prețul final se confirmă când echipa vede obiectele. Fără surprize: plătești la final.',
    idLabel: 'Nr. estimare',
    bookWa: '💬 Rezervă pe WhatsApp', call: '📞 Sună ' + PHONE_LABEL, edit: 'Modifică datele',
    photosReminder: 'După ce se deschide WhatsApp, trimite pozele în același chat.',
    currency: 'MDL',
    bd: {
      truck1: 'Camion cu 2 hamali (1 drum, până la {cap} m³)', truckN: 'Camion cu 2 hamali ({n} drumuri)',
      loaders: 'Timp suplimentar hamali ({h} h)', floor_no_lift: 'Etaje fără lift ({n})',
      dismantling: 'Demontare: {item} × {qty}', special: '{item} × {qty}',
      distance: 'Deplasare în afara orașului', weekend: 'Weekend',
    },
    flags: {
      multiple_trips: 'E nevoie de mai mult de un drum de camion.',
      windows_glass_separate: 'Ferestrele cu sticlă se predau separat, la reciclare.',
      floor_surcharge_waived: 'Volum mic: etajele nu se taxează.',
      minimum_price: 'Comandă minimă: un drum de camion.',
      distance_unknown: 'Taxa de deplasare se confirmă la telefon.',
    },
    wa: {
      hello: 'Bună! Vreau o evacuare de gunoi.', id: 'Nr. estimare', items: 'Obiecte', where: 'Locație',
      floor: 'Etaj', house: 'casă / curte', lift: 'cu lift', noLift: 'fără lift', down: 'deja jos',
      dismantle: 'trebuie demontat', parking: 'parcare aproape', when: 'Când', est: 'Estimare pe site',
      ask: 'cer ofertă (peste 40 km)', photos: 'Trimit pozele în acest chat.',
    },
  },
  ru: {
    progress: 'Шаг {n} из {total}',
    back: 'Назад', next: 'Далее', seePrice: 'Узнать цену',
    s1: 'Что нужно вывезти?',
    s1sub: 'Сделайте фото или опишите в двух словах. Можно и то, и другое.',
    addPhotos: '📷 Добавить фото', photosHint: 'до 5 фото, с камеры или из галереи',
    photoFail: 'Одно фото не удалось прочитать. Попробуйте другое.',
    removePhoto: 'Удалить фото',
    textLabel: 'Описание (необязательно)',
    textPh: 'Напр.: 20 мешков, диван, может ещё ветки',
    chipsLabel: 'Или отметьте быстро:',
    needItems: 'Добавьте фото, описание или отметьте хотя бы один предмет.',
    s2: 'Где?',
    zoneLabel: 'Сектор или населённый пункт', zonePick: 'Выберите…',
    sectors: 'Секторы Кишинёва', suburbs: 'Пригороды', other: 'Другой населённый пункт',
    otherLabel: 'Название населённого пункта',
    distLabel: 'Как далеко от Кишинёва?',
    dist: { lt20: 'до 20 км', '20to40': '20–40 км', gt40: 'дальше 40 км', unknown: 'Не знаю' },
    streetLabel: 'Улица (необязательно)',
    needZone: 'Выберите сектор или населённый пункт.', needOther: 'Напишите название населённого пункта.',
    s3: 'Этаж и доступ',
    floorLabel: 'Этаж', floor0: 'Частный дом / двор', floorN: 'Этаж {n}',
    lift: 'Есть лифт', down: 'Всё уже внизу / во дворе', dismantle: 'Нужно что-то разобрать (шкаф, стенку, кухню)',
    parkingLabel: 'Машина может встать близко к подъезду?',
    parking: { yes: 'Да', no: 'Нет', unknown: 'Не знаю' },
    s4: 'Когда?',
    when: { today: 'Сегодня', tomorrow: 'Завтра', week: 'На этой неделе', later: 'В другой день' },
    s5: 'Проверьте список',
    analyzing: 'Анализируем фото и описание…',
    seen: 'Мы увидели:', seenAsk: 'Верно? Поправьте количество, если нужно.',
    yourList: 'Ваш список:',
    aiFailed: 'Не удалось проанализировать фото. Мы взяли отмеченный список — дополните его ниже.',
    unclear: 'Кое-что видно нечётко. Проверьте список.',
    addItem: 'Добавить другой предмет', addPick: '+ Добавить…',
    emptyList: 'Список пуст — добавьте хотя бы один предмет.',
    remove: 'Удалить', less: 'Меньше', more: 'Больше',
    s6: 'Ориентировочная цена',
    negotiated: 'Цена по запросу',
    negotiatedSub: 'Населённый пункт дальше 40 км. Сделаем предложение по телефону или в WhatsApp.',
    includedTitle: 'Что входит в цену',
    included: ['Грузовик до 9 м³', '2 грузчика', 'Спуск с этажа и погрузка', 'Вывоз на официальный полигон', 'Фискальный чек', 'Оплата в конце, после работы'],
    howTitle: 'Как мы считали',
    note: 'Итоговая цена подтверждается, когда команда увидит вещи. Без сюрпризов: оплата в конце.',
    idLabel: 'Номер оценки',
    bookWa: '💬 Забронировать в WhatsApp', call: '📞 Позвонить ' + PHONE_LABEL, edit: 'Изменить данные',
    photosReminder: 'Когда откроется WhatsApp, отправьте фото в этот же чат.',
    currency: 'лей',
    bd: {
      truck1: 'Грузовик и 2 грузчика (1 рейс, до {cap} м³)', truckN: 'Грузовик и 2 грузчика ({n} рейса)',
      loaders: 'Дополнительное время грузчиков ({h} ч)', floor_no_lift: 'Этажи без лифта ({n})',
      dismantling: 'Разборка: {item} × {qty}', special: '{item} × {qty}',
      distance: 'Выезд за город', weekend: 'Выходной',
    },
    flags: {
      multiple_trips: 'Нужно больше одного рейса грузовика.',
      windows_glass_separate: 'Окна со стеклом сдаются отдельно, на переработку.',
      floor_surcharge_waived: 'Небольшой объём: этажи не оплачиваются.',
      minimum_price: 'Минимальный заказ: один рейс грузовика.',
      distance_unknown: 'Стоимость выезда уточним по телефону.',
    },
    wa: {
      hello: 'Здравствуйте! Нужен вывоз мусора.', id: 'Номер оценки', items: 'Вещи', where: 'Адрес',
      floor: 'Этаж', house: 'частный дом / двор', lift: 'с лифтом', noLift: 'без лифта', down: 'уже внизу',
      dismantle: 'нужна разборка', parking: 'парковка рядом', when: 'Когда', est: 'Оценка на сайте',
      ask: 'прошу предложение (дальше 40 км)', photos: 'Фото отправлю в этот чат.',
    },
  },
};

const DIST_KM = { lt20: 10, '20to40': 30, gt40: 50 };

// ---------- helpers ----------
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const tpl = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');

function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = v;
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
  return el;
}

function track(name, params = {}) {
  if (typeof gtag === 'function') gtag('event', name, { estimate_id: state.id, ...params });
}

function newId() {
  const abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const d = new Date();
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  const r = crypto.getRandomValues(new Uint8Array(4));
  return `G-${ymd}-${Array.from(r, (b) => abc[b % abc.length]).join('')}`;
}

// ---------- photos ----------
async function decode(file) {
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

async function compress(file) {
  const src = await decode(file);
  const w0 = src.width, h0 = src.height;
  let max = 1600, q = 0.8, blob;
  for (let i = 0; i < 8; i++) {
    const s = Math.min(1, max / Math.max(w0, h0));
    const c = document.createElement('canvas');
    c.width = Math.round(w0 * s);
    c.height = Math.round(h0 * s);
    c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
    blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', q));
    if (blob && blob.size <= PHOTO_TARGET_BYTES) break;
    if (q > 0.55) q -= 0.1; else max = Math.round(max * 0.8);
  }
  if (src.close) src.close();
  const b64 = await new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result).split(',')[1]);
    fr.readAsDataURL(blob);
  });
  return { b64, url: URL.createObjectURL(blob) };
}

// ---------- state ----------
const state = {
  step: 1, id: null, config: null, lang: 'ro',
  photos: [], text: '', picks: {},
  zone: '', otherName: '', otherDist: '', street: '',
  floor: 1, lift: false, alreadyDown: false, dismantle: false, parking: 'unknown',
  when: 'today',
  aiKey: '', aiPromise: null, ai: null, aiStatus: 'idle',
  confirmed: null, result: null,
};

let root, t;

function start() {
  if (state.id) return;
  state.id = newId();
  track('estimate_started');
}

// ---------- AI ----------
function aiInputKey() {
  return state.text.trim() + '|' + state.photos.map((p) => p.b64.length + p.b64.slice(0, 32)).join(',');
}

function runAi() {
  const key = aiInputKey();
  if (key === state.aiKey) return;
  state.aiKey = key;
  state.confirmed = null;
  if (!state.text.trim() && !state.photos.length) {
    state.aiStatus = 'idle';
    state.ai = null;
    state.aiPromise = null;
    return;
  }
  state.aiStatus = 'pending';
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), AI_TIMEOUT_MS);
  const p = fetch('/api/estimate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text: state.text, photos: state.photos.map((x) => x.b64), lang: state.lang }),
    signal: ctrl.signal,
  })
    .then((r) => (r.ok ? r.json() : { ok: false }))
    .catch(() => ({ ok: false }))
    .then((res) => {
      clearTimeout(timer);
      if (state.aiPromise !== p) return;
      state.ai = res.ok ? res.ai : null;
      state.aiStatus = res.ok ? 'done' : 'failed';
      if (state.step === 5) render();
    });
  state.aiPromise = p;
}

function buildConfirmed() {
  const list = [];
  const byKey = new Map();
  if (state.ai) {
    for (const it of state.ai.items) {
      const row = { key: it.key, qty: it.qty, m3: it.m3, dismantle: it.dismantle };
      list.push(row);
      if (!byKey.has(it.key)) byKey.set(it.key, row);
    }
  }
  for (const [key, qty] of Object.entries(state.picks)) {
    if (!qty) continue;
    const row = byKey.get(key);
    if (row) row.qty = Math.max(row.qty, qty);
    else list.push({ key, qty });
  }
  return list;
}

// ---------- pricing ----------
function priceInput() {
  const free = state.config.distance.free_zones.includes(state.zone);
  const day = new Date();
  if (state.when === 'tomorrow') day.setDate(day.getDate() + 1);
  const weekend = (state.when === 'today' || state.when === 'tomorrow') && [0, 6].includes(day.getDay());
  return {
    items: state.confirmed.map((c) => ({ key: c.key, qty: c.qty, m3: c.m3, dismantle: c.dismantle })),
    floor: state.alreadyDown ? 0 : state.floor,
    lift: state.lift,
    alreadyDown: state.alreadyDown,
    dismantleAll: state.dismantle,
    zone: free ? state.zone : (state.otherName.trim() || 'other'),
    km: free ? undefined : DIST_KM[state.otherDist],
    weekend,
  };
}

// ---------- rendering ----------
const label = (key) => state.config.items[key]?.[state.lang] || key;

function nav(onNext, nextLabel = t.next) {
  return h('div', { class: 'est-nav' },
    state.step > 1 ? h('button', { type: 'button', class: 'btn ghost', onclick: () => go(state.step - 1) }, t.back) : h('span'),
    h('button', { type: 'button', class: 'btn yellow', onclick: onNext, disabled: !onNext }, nextLabel),
  );
}

function errorBox() {
  return h('p', { class: 'est-error', role: 'alert', hidden: true });
}
function showError(box, msg) {
  box.textContent = msg;
  box.hidden = false;
}

function qtyRow(key, getQty, setQty, extra) {
  const out = h('span', { class: 'est-qty-n', 'aria-live': 'polite' }, String(getQty()));
  return h('div', { class: 'est-row' },
    h('span', { class: 'est-row-name' }, label(key)),
    h('div', { class: 'est-qty' },
      h('button', { type: 'button', 'aria-label': t.less, onclick: () => { setQty(Math.max(0, getQty() - 1)); out.textContent = getQty(); } }, '−'),
      out,
      h('button', { type: 'button', 'aria-label': t.more, onclick: () => { setQty(getQty() + 1); out.textContent = getQty(); } }, '+'),
      extra,
    ),
  );
}

function step1() {
  const err = errorBox();
  const grid = h('div', { class: 'est-photos' });
  const fileInput = h('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true, onchange: onFiles });
  const addBtn = h('button', { type: 'button', class: 'btn ghost est-add-photo', onclick: () => fileInput.click() }, t.addPhotos);

  function drawPhotos() {
    grid.replaceChildren(...state.photos.map((p, i) =>
      h('div', { class: 'est-thumb' },
        h('img', { src: p.url, alt: '' }),
        h('button', { type: 'button', 'aria-label': t.removePhoto, onclick: () => {
          URL.revokeObjectURL(p.url);
          state.photos.splice(i, 1);
          drawPhotos();
        } }, '×'))));
    addBtn.hidden = state.photos.length >= MAX_PHOTOS;
  }

  async function onFiles() {
    start();
    err.hidden = true;
    const files = Array.from(fileInput.files).slice(0, MAX_PHOTOS - state.photos.length);
    fileInput.value = '';
    for (const f of files) {
      try {
        state.photos.push(await compress(f));
        track('estimate_photo_uploaded', { photo_count: state.photos.length });
      } catch {
        showError(err, t.photoFail);
      }
      drawPhotos();
    }
  }
  drawPhotos();

  const chips = h('div', { class: 'est-chips' }, QUICK.map((key) => {
    const chip = h('button', {
      type: 'button', class: 'est-chip' + (state.picks[key] ? ' on' : ''), 'aria-pressed': String(!!state.picks[key]),
      onclick: () => {
        start();
        err.hidden = true;
        state.picks[key] = state.picks[key] ? 0 : 1;
        chip.classList.toggle('on', !!state.picks[key]);
        chip.setAttribute('aria-pressed', String(!!state.picks[key]));
      },
    }, label(key));
    return chip;
  }));

  return [
    h('h2', {}, t.s1), h('p', { class: 'est-sub' }, t.s1sub),
    fileInput, grid, addBtn, h('p', { class: 'est-hint' }, t.photosHint),
    h('label', { class: 'est-label', for: 'est-text' }, t.textLabel),
    h('textarea', { id: 'est-text', rows: 3, placeholder: t.textPh, oninput: (e) => { start(); err.hidden = true; state.text = e.target.value; } }, state.text),
    h('p', { class: 'est-label' }, t.chipsLabel), chips,
    err,
    nav(() => {
      const any = state.photos.length || state.text.trim() || Object.values(state.picks).some(Boolean);
      if (!any) return showError(err, t.needItems);
      start();
      state.confirmed = null; // rebuilt from the AI result + ticked items on step 5
      runAi();
      go(2);
    }),
  ];
}

function step2() {
  const err = errorBox();
  const zones = state.config.distance.free_zones;
  const otherBox = h('div', { class: 'est-other', hidden: state.zone !== '__other' },
    h('label', { class: 'est-label', for: 'est-other' }, t.otherLabel),
    h('input', { id: 'est-other', type: 'text', value: state.otherName, autocomplete: 'address-level2', oninput: (e) => { state.otherName = e.target.value; } }),
    h('p', { class: 'est-label' }, t.distLabel),
    h('div', { class: 'est-seg' }, Object.entries(t.dist).map(([v, txt]) => radio('dist', v, txt, state.otherDist, (x) => { state.otherDist = x; }))),
  );
  const select = h('select', { id: 'est-zone', onchange: (e) => { state.zone = e.target.value; otherBox.hidden = state.zone !== '__other'; } },
    h('option', { value: '' }, t.zonePick),
    h('optgroup', { label: t.sectors }, zones.slice(0, SECTORS).map((z) => h('option', { value: z, selected: state.zone === z }, z))),
    h('optgroup', { label: t.suburbs }, zones.slice(SECTORS).map((z) => h('option', { value: z, selected: state.zone === z }, z))),
    h('option', { value: '__other', selected: state.zone === '__other' }, t.other),
  );
  return [
    h('h2', {}, t.s2),
    h('label', { class: 'est-label', for: 'est-zone' }, t.zoneLabel), select,
    otherBox,
    h('label', { class: 'est-label', for: 'est-street' }, t.streetLabel),
    h('input', { id: 'est-street', type: 'text', value: state.street, autocomplete: 'address-line1', oninput: (e) => { state.street = e.target.value; } }),
    err,
    nav(() => {
      if (!state.zone) return showError(err, t.needZone);
      if (state.zone === '__other' && !state.otherName.trim()) return showError(err, t.needOther);
      if (state.zone === '__other' && !state.otherDist) state.otherDist = 'unknown';
      go(3);
    }),
  ];
}

function radio(name, value, text, current, set) {
  return h('label', { class: 'est-radio' },
    h('input', { type: 'radio', name, value, checked: current === value, onchange: () => set(value) }),
    h('span', {}, text));
}

function toggle(text, get, set) {
  return h('label', { class: 'est-toggle' },
    h('input', { type: 'checkbox', checked: get(), onchange: (e) => set(e.target.checked) }),
    h('span', {}, text));
}

function step3() {
  const floors = Array.from({ length: 21 }, (_, n) =>
    h('option', { value: n, selected: state.floor === n }, n === 0 ? t.floor0 : tpl(t.floorN, { n })));
  return [
    h('h2', {}, t.s3),
    h('label', { class: 'est-label', for: 'est-floor' }, t.floorLabel),
    h('select', { id: 'est-floor', onchange: (e) => { state.floor = Number(e.target.value); } }, floors),
    toggle(t.lift, () => state.lift, (v) => { state.lift = v; }),
    toggle(t.down, () => state.alreadyDown, (v) => { state.alreadyDown = v; }),
    toggle(t.dismantle, () => state.dismantle, (v) => { state.dismantle = v; }),
    h('p', { class: 'est-label' }, t.parkingLabel),
    h('div', { class: 'est-seg' }, Object.entries(t.parking).map(([v, txt]) => radio('parking', v, txt, state.parking, (x) => { state.parking = x; }))),
    nav(() => go(4)),
  ];
}

function step4() {
  return [
    h('h2', {}, t.s4),
    h('div', { class: 'est-seg est-seg-col' }, Object.entries(t.when).map(([v, txt]) => radio('when', v, txt, state.when, (x) => { state.when = x; }))),
    nav(() => go(5)),
  ];
}

function step5() {
  if (state.aiStatus === 'pending') {
    return [h('h2', {}, t.s5), h('div', { class: 'est-loading', role: 'status' }, h('span', { class: 'est-spinner' }), t.analyzing), nav(null)];
  }
  if (!state.confirmed) state.confirmed = buildConfirmed();
  const err = errorBox();
  const list = h('div', { class: 'est-list' });

  function draw() {
    list.replaceChildren(...state.confirmed.map((row, i) => qtyRow(row.key, () => row.qty, (q) => { row.qty = q; },
      h('button', { type: 'button', class: 'est-del', 'aria-label': t.remove, onclick: () => { state.confirmed.splice(i, 1); draw(); } }, '×'))));
    if (!state.confirmed.length) list.append(h('p', { class: 'est-hint' }, t.emptyList));
  }
  draw();

  const keys = Object.keys(state.config.items).filter((k) => !k.startsWith('_'));
  const adder = h('select', { 'aria-label': t.addItem, onchange: (e) => {
    const key = e.target.value;
    if (!key) return;
    const row = state.confirmed.find((r) => r.key === key);
    if (row) row.qty += 1; else state.confirmed.push({ key, qty: 1 });
    e.target.value = '';
    draw();
  } }, h('option', { value: '' }, t.addPick), keys.map((k) => h('option', { value: k }, label(k))));

  const fromAi = state.aiStatus === 'done' && state.ai;
  const notes = [];
  if (state.aiStatus === 'failed') notes.push(h('p', { class: 'est-note' }, t.aiFailed));
  if (fromAi && (state.ai.confidence === 'low' || state.ai.unclear.length)) notes.push(h('p', { class: 'est-note' }, t.unclear));

  return [
    h('h2', {}, t.s5),
    ...notes,
    h('p', { class: 'est-label' }, fromAi ? t.seen : t.yourList),
    fromAi ? h('p', { class: 'est-sub' }, t.seenAsk) : null,
    list,
    h('label', { class: 'est-label' }, t.addItem), adder,
    err,
    nav(() => {
      state.confirmed = state.confirmed.filter((r) => r.qty > 0);
      if (!state.confirmed.length) { draw(); return showError(err, t.emptyList); }
      go(6);
    }, t.seePrice),
  ];
}

function breakdownLine(b) {
  const bd = t.bd;
  switch (b.key) {
    case 'truck': return b.trips > 1 ? tpl(bd.truckN, { n: b.trips }) : tpl(bd.truck1, { cap: state.config.truck_base.capacity_m3 });
    case 'loaders': return tpl(bd.loaders, { h: String(b.hours).replace('.', ',') });
    case 'floor_no_lift': return tpl(bd.floor_no_lift, { n: b.floors });
    case 'dismantling': return tpl(bd.dismantling, { item: label(b.item), qty: b.qty });
    case 'special': return tpl(bd.special, { item: label(b.item), qty: b.qty });
    default: return bd[b.key] || b.key;
  }
}

function waMessage(r) {
  const w = t.wa;
  const items = state.confirmed.map((c) => `${c.qty}× ${label(c.key)}`).join(', ');
  const place = state.zone === '__other' ? `${state.otherName.trim()} (${t.dist[state.otherDist] || ''})` : state.zone;
  const floor = state.alreadyDown ? w.down
    : state.floor === 0 ? w.house
    : `${state.floor}, ${state.lift ? w.lift : w.noLift}`;
  const extra = [state.dismantle && w.dismantle, `${w.parking}: ${t.parking[state.parking]}`].filter(Boolean).join(', ');
  const price = r.negotiated ? w.ask : `${fmt(r.low)}–${fmt(r.high)} ${t.currency}`;
  return [
    w.hello,
    `${w.id}: ${state.id}`,
    `${w.items}: ${items}`,
    `${w.where}: ${place}${state.street.trim() ? ', ' + state.street.trim() : ''}`,
    `${w.floor}: ${floor}; ${extra}`,
    `${w.when}: ${t.when[state.when]}`,
    `${w.est}: ${price}`,
    state.photos.length ? w.photos : null,
  ].filter(Boolean).join('\n');
}

function step6() {
  const r = estimate(priceInput(), state.config);
  state.result = r;
  track('estimate_shown', { low: r.low, high: r.high, negotiated: r.negotiated });

  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(waMessage(r))}`;
  const flagTexts = r.flags.map((f) => t.flags[f]).filter(Boolean);

  return [
    h('h2', {}, r.negotiated ? t.negotiated : t.s6),
    r.negotiated
      ? h('p', { class: 'est-sub' }, t.negotiatedSub)
      : h('p', { class: 'est-price' }, `${fmt(r.low)} – ${fmt(r.high)}`, h('span', {}, ' ' + t.currency)),
    h('p', { class: 'est-id' }, `${t.idLabel}: `, h('strong', {}, state.id)),
    h('div', { class: 'est-ctas' },
      h('a', { class: 'btn wa-btn', href: waHref, target: '_blank', rel: 'noopener', onclick: () => track('cta_whatsapp') }, t.bookWa),
      h('a', { class: 'btn yellow', href: `tel:${PHONE}`, onclick: () => track('cta_call') }, t.call),
    ),
    state.photos.length ? h('p', { class: 'est-note' }, t.photosReminder) : null,
    flagTexts.length ? h('ul', { class: 'est-flags' }, flagTexts.map((f) => h('li', {}, f))) : null,
    h('h3', {}, t.includedTitle),
    h('ul', { class: 'est-included' }, t.included.map((x) => h('li', {}, x))),
    r.negotiated ? null : h('h3', {}, t.howTitle),
    r.negotiated ? null : h('dl', { class: 'est-bd' }, r.breakdown.flatMap((b) => [
      h('dt', {}, breakdownLine(b)), h('dd', {}, `${fmt(b.amount)} ${t.currency}`),
    ])),
    h('p', { class: 'est-hint' }, t.note),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => go(1) }, t.edit),
  ];
}

const STEP_FNS = { 1: step1, 2: step2, 3: step3, 4: step4, 5: step5, 6: step6 };

function go(n) {
  state.step = n;
  render();
  root.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function render() {
  const bar = h('div', { class: 'est-progress', role: 'progressbar', 'aria-valuemin': 1, 'aria-valuemax': STEPS, 'aria-valuenow': state.step },
    h('span', { style: `width:${(state.step / STEPS) * 100}%` }));
  root.replaceChildren(
    h('p', { class: 'est-step' }, tpl(t.progress, { n: state.step, total: STEPS })),
    bar,
    h('div', { class: 'est-card' }, STEP_FNS[state.step]()),
  );
  const first = root.querySelector('.est-card h2');
  if (first) { first.tabIndex = -1; first.focus({ preventScroll: true }); }
}

async function init() {
  root = document.getElementById('estimator');
  if (!root) return;
  state.lang = document.documentElement.lang === 'ru' ? 'ru' : 'ro';
  t = T[state.lang];
  try {
    state.config = await fetch('/pricing.config.json', { cache: 'no-cache' }).then((r) => r.json());
  } catch {
    return; // the static fallback (call / WhatsApp) stays visible
  }
  render();
}

init();
