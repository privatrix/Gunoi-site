/* gunoi.md — price-from-photo estimator. Mounts on #estimator.
 * Prices come only from lib/estimate.js + pricing.config.json.
 * The AI step (POST /api/estimate) only lists items; nothing it writes is shown.
 * Step 1 is rendered into the page by the site generator (build/templates.js) and bound here;
 * steps 2–4 are rendered by this script. Mount attribute: data-zone="Botanica" | "other:Ialoveni:lt20". */
import { estimate } from '/lib/estimate.js';

const PHONE = '069269888';
const PHONE_LABEL = '069 269 888';
const WA = '37369269888';
const MAX_PHOTOS = 5;
const PHOTO_TARGET_BYTES = 600 * 1024; // keeps 5 photos under the 4.5 MB request limit
const AI_TIMEOUT_MS = 20000;
const SECTORS = 5; // first N free_zones in the config are Chișinău sectors
const STEPS = 4;
const DIST_KM = { lt20: 10, '20to40': 30, gt40: 50 };

const ICON = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1Z"/><path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.6-2-1.2-1 .9c-1.2-.5-2.2-1.5-2.7-2.7l.9-1-1.2-2Z" stroke-width="1.6"/></svg>',
};

const T = {
  ro: {
    progress: 'Pasul {n} din {total}',
    back: 'Înapoi', next: 'Continuă', seePrice: 'Vezi prețul',
    photoFail: 'O poză nu a putut fi citită. Încearcă alta.',
    removePhoto: 'Șterge poza',
    needItems: 'Fă o poză, bifează ceva sau scrie ce ai.',
    s2: 'Unde și la ce etaj?',
    zoneLabel: 'Sectorul sau localitatea', zonePick: 'Alege…',
    sectors: 'Sectoare Chișinău', suburbs: 'Suburbii (fără taxă de drum)', other: 'Altă localitate',
    otherLabel: 'Localitatea', distLabel: 'Cât de departe e de Chișinău?',
    dist: { lt20: 'sub 20 km', '20to40': '20–40 km', gt40: 'peste 40 km', unknown: 'Nu știu' },
    streetLabel: 'Strada (opțional)',
    needZone: 'Alege sectorul sau localitatea.', needOther: 'Scrie localitatea.',
    floorLabel: 'Etajul', floor0: 'Parter / casă cu curte', floorN: 'Etajul {n}',
    lift: 'Este lift', down: 'Totul e deja jos', dismantle: 'Trebuie demontat ceva',
    parkingLabel: 'Mașina poate opri aproape de intrare?',
    parking: { yes: 'Da', no: 'Nu', unknown: 'Nu știu' },
    s3: 'Verifică lista',
    analyzing: 'Ne uităm la poze…',
    seen: 'De ridicat', seenAsk: 'Am verificat pozele. Corect? Schimbă cantitățile dacă e nevoie.',
    yourList: 'Lista ta',
    suggestTitle: 'Am mai văzut în poze — le luăm și pe ele?',
    suggestSub: 'Nu sunt în preț. Atinge ca să le adaugi.',
    aiFailed: 'Nu am putut analiza pozele acum, așa că am folosit lista bifată. Completeaz-o mai jos.',
    unclear: 'Unele lucruri nu s-au văzut clar. Verifică lista.',
    addItem: 'Mai adaugă ceva', addPick: '+ Alege din listă…',
    emptyList: 'Lista e goală — adaugă cel puțin un obiect.',
    remove: 'Șterge', less: 'Mai puțin', more: 'Mai mult',
    s4: 'Prețul tău',
    receiptTitle: 'GUNOI.MD · ESTIMARE',
    total: 'Interval',
    negotiated: 'Preț la cerere',
    negotiatedSub: 'Localitatea e la peste 40 km. Îți facem o ofertă pe WhatsApp sau la telefon.',
    whenLabel: 'Când ți-ar conveni?',
    when: { today: 'Azi', tomorrow: 'Mâine', week: 'Săptămâna asta', later: 'Altă dată' },
    footIncluded: 'Inclus: camion, 2 hamali, coborâre, transport la poligon, bon fiscal.',
    note: 'Interval orientativ. Prețul final ți-l confirmă un coleg înainte de lucru. Plătești la final, cash sau transfer.',
    notTaken: 'Nu preluăm: chimicale, vopsele, azbest, deșeuri medicale.',
    bookWa: 'Rezervă pe WhatsApp', call: 'Sună',
    photosReminder: 'Când se deschide WhatsApp, trimite pozele în același chat.',
    again: 'Modifică datele',
    currency: 'lei',
    bd: {
      call_out: 'Camion + 2 hamali', item: '{item} × {qty}', loaders: 'Hamali, {h} h',
      floor_no_lift: 'Etaje fără lift × {n}', dismantling: 'Demontare: {item} × {qty}',
      full_load: 'Plafon camion plin', minimum: 'Până la comanda minimă',
      distance: 'Drum în afara Chișinăului', weekend: 'Weekend',
    },
    flags: {
      multiple_trips: 'E nevoie de mai mult de un drum de camion.',
      windows_glass_separate: 'Sticla de la ferestre se predă separat, la reciclare.',
      floor_surcharge_waived: 'Volum mic: etajele nu se taxează.',
      minimum_price: 'Comandă minimă.',
      full_load_price: 'Volum mare: plătești cel mult prețul unui camion plin.',
      distance_unknown: 'Taxa de drum se confirmă pe WhatsApp.',
    },
    wa: {
      hello: 'Bună! Vreau o evacuare de gunoi.', id: 'Nr. estimare', items: 'Obiecte', where: 'Unde',
      floor: 'Etaj', house: 'parter / casă', lift: 'cu lift', noLift: 'fără lift', down: 'deja jos',
      dismantle: 'trebuie demontat', parking: 'parcare aproape', when: 'Când', est: 'Estimare pe site',
      ask: 'cer ofertă (peste 40 km)', photos: 'Trimit pozele în acest chat.',
    },
    zoneNames: {},
  },
  ru: {
    progress: 'Шаг {n} из {total}',
    back: 'Назад', next: 'Далее', seePrice: 'Узнать цену',
    photoFail: 'Одно фото не удалось прочитать. Попробуйте другое.',
    removePhoto: 'Удалить фото',
    needItems: 'Сделайте фото, отметьте что-нибудь или напишите, что есть.',
    s2: 'Где и на каком этаже?',
    zoneLabel: 'Сектор или населённый пункт', zonePick: 'Выберите…',
    sectors: 'Секторы Кишинёва', suburbs: 'Пригороды (без доплаты за выезд)', other: 'Другой населённый пункт',
    otherLabel: 'Населённый пункт', distLabel: 'Как далеко от Кишинёва?',
    dist: { lt20: 'до 20 км', '20to40': '20–40 км', gt40: 'дальше 40 км', unknown: 'Не знаю' },
    streetLabel: 'Улица (необязательно)',
    needZone: 'Выберите сектор или населённый пункт.', needOther: 'Напишите населённый пункт.',
    floorLabel: 'Этаж', floor0: 'Первый этаж / частный дом', floorN: '{n} этаж',
    lift: 'Есть лифт', down: 'Всё уже внизу', dismantle: 'Нужно что-то разобрать',
    parkingLabel: 'Машина может встать близко к подъезду?',
    parking: { yes: 'Да', no: 'Нет', unknown: 'Не знаю' },
    s3: 'Проверьте список',
    analyzing: 'Смотрим фото…',
    seen: 'Вывозим', seenAsk: 'Мы проверили фото. Верно? Поправьте количество, если нужно.',
    yourList: 'Ваш список',
    suggestTitle: 'На фото видно ещё — тоже вывезти?',
    suggestSub: 'В цену не входит. Нажмите, чтобы добавить.',
    aiFailed: 'Не удалось проанализировать фото, поэтому мы взяли отмеченный список. Дополните его ниже.',
    unclear: 'Кое-что видно нечётко. Проверьте список.',
    addItem: 'Добавить ещё', addPick: '+ Выбрать из списка…',
    emptyList: 'Список пуст — добавьте хотя бы одну вещь.',
    remove: 'Удалить', less: 'Меньше', more: 'Больше',
    s4: 'Ваша цена',
    receiptTitle: 'GUNOI.MD · ОЦЕНКА',
    total: 'Диапазон',
    negotiated: 'Цена по запросу',
    negotiatedSub: 'Населённый пункт дальше 40 км. Сделаем предложение в WhatsApp или по телефону.',
    whenLabel: 'Когда вам удобно?',
    when: { today: 'Сегодня', tomorrow: 'Завтра', week: 'На этой неделе', later: 'В другой день' },
    footIncluded: 'Включено: грузовик, 2 грузчика, спуск, вывоз на полигон, фискальный чек.',
    note: 'Ориентировочный диапазон. Итоговую цену подтвердит сотрудник до начала работы. Оплата в конце, наличными или переводом.',
    notTaken: 'Не вывозим: химикаты, краски, асбест, медицинские отходы.',
    bookWa: 'Забронировать в WhatsApp', call: 'Позвонить',
    photosReminder: 'Когда откроется WhatsApp, отправьте фото в этот же чат.',
    again: 'Изменить данные',
    currency: 'лей',
    bd: {
      call_out: 'Грузовик + 2 грузчика', item: '{item} × {qty}', loaders: 'Грузчики, {h} ч',
      floor_no_lift: 'Этажи без лифта × {n}', dismantling: 'Разборка: {item} × {qty}',
      full_load: 'Потолок за полный грузовик', minimum: 'До минимального заказа',
      distance: 'Выезд за пределы Кишинёва', weekend: 'Выходной',
    },
    flags: {
      multiple_trips: 'Нужно больше одного рейса грузовика.',
      windows_glass_separate: 'Стекло от окон сдаётся отдельно, на переработку.',
      floor_surcharge_waived: 'Небольшой объём: этажи не оплачиваются.',
      minimum_price: 'Минимальный заказ.',
      full_load_price: 'Большой объём: вы платите не больше цены полного грузовика.',
      distance_unknown: 'Стоимость выезда уточним в WhatsApp.',
    },
    wa: {
      hello: 'Здравствуйте! Нужен вывоз мусора.', id: 'Номер оценки', items: 'Вещи', where: 'Где',
      floor: 'Этаж', house: 'первый / частный дом', lift: 'с лифтом', noLift: 'без лифта', down: 'уже внизу',
      dismantle: 'нужна разборка', parking: 'парковка рядом', when: 'Когда', est: 'Оценка на сайте',
      ask: 'прошу предложение (дальше 40 км)', photos: 'Фото отправлю в этот чат.',
    },
    zoneNames: {
      Botanica: 'Ботаника', Buiucani: 'Буюканы', Centru: 'Центр', Ciocana: 'Чеканы', 'Râșcani': 'Рышкановка',
      'Durlești': 'Дурлешты', 'Stăuceni': 'Стэучень', Codru: 'Кодру', Ciorescu: 'Чорэску', Cricova: 'Крикова',
      'Trușeni': 'Трушень', 'Vadul lui Vodă': 'Вадул-луй-Водэ', 'Cojușna': 'Кожушна', 'Băcioi': 'Бачой',
      Tohatin: 'Тохатин', 'Sîngera': 'Сынжера', Vatra: 'Ватра',
    },
  },
};

// ---------- helpers ----------
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const tpl = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');

function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v; // only our own static icon markup
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid);
  return el;
}
const icon = (name) => h('span', { html: ICON[name], style: 'display:contents' });

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
  when: '',
  aiKey: '', aiPromise: null, ai: null, aiStatus: 'idle', aiReason: '',
  confirmed: null, suggestions: [], result: null,
};

let root, t;

function start() {
  if (state.id) return;
  state.id = newId();
  track('estimate_started');
}

// ---------- AI ----------
const pickedKeys = () => Object.keys(state.picks).filter((k) => state.picks[k]);

function aiInputKey() {
  return state.text.trim() + '|' + pickedKeys().join(',') + '|' + state.photos.map((p) => p.b64.length + p.b64.slice(0, 32)).join(',');
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
    body: JSON.stringify({ text: state.text, picks: pickedKeys(), photos: state.photos.map((x) => x.b64), lang: state.lang }),
    signal: ctrl.signal,
  })
    .then((r) => (r.ok ? r.json() : { ok: false, reason: 'http_' + r.status }))
    .catch((e) => ({ ok: false, reason: e?.name === 'AbortError' ? 'client_timeout' : 'client_network' }))
    .then((res) => {
      clearTimeout(timer);
      if (state.aiPromise !== p) return;
      state.ai = res.ok ? res.ai : null;
      state.aiReason = res.ok ? '' : res.reason || 'unknown';
      state.aiStatus = res.ok ? 'done' : 'failed';
      if (state.step === 3) render();
    });
  state.aiPromise = p;
}

// Items the customer asked for go into the price; things the AI only noticed in
// the photos become suggestions the customer can add with one tap.
function buildConfirmed() {
  const list = [];
  const byKey = new Map();
  state.suggestions = [];
  if (state.ai) {
    for (const it of state.ai.items) {
      const row = { key: it.key, qty: it.qty, m3: it.m3, dismantle: it.dismantle };
      if (!it.requested) { state.suggestions.push(row); continue; }
      list.push(row);
      if (!byKey.has(it.key)) byKey.set(it.key, row);
    }
  }
  for (const key of pickedKeys()) {
    if (byKey.has(key)) continue;
    const i = state.suggestions.findIndex((s) => s.key === key);
    const row = i >= 0 ? state.suggestions.splice(i, 1)[0] : { key, qty: state.picks[key] };
    list.push(row);
    byKey.set(key, row);
  }
  return list;
}

// ---------- pricing ----------
function priceInput() {
  const free = state.config.distance.free_zones.includes(state.zone);
  return {
    items: state.confirmed.map((c) => ({ key: c.key, qty: c.qty, m3: c.m3, dismantle: c.dismantle })),
    floor: state.alreadyDown ? 0 : state.floor,
    lift: state.lift,
    alreadyDown: state.alreadyDown,
    dismantleAll: state.dismantle,
    zone: free ? state.zone : (state.otherName.trim() || 'other'),
    km: free ? undefined : DIST_KM[state.otherDist],
  };
}

// ---------- rendering ----------
const label = (key) => state.config.items[key]?.[state.lang] || key;
const zoneLabel = (z) => t.zoneNames[z] || z;

function nav(onNext, nextLabel = t.next) {
  return h('div', { class: 'est-nav' },
    state.step > 1 ? h('button', { type: 'button', class: 'btn btn-ghost', onclick: () => go(state.step - 1) }, '←', h('span', { class: 'sr-only' }, t.back)) : null,
    h('button', { type: 'button', class: 'btn btn-yellow', onclick: onNext, disabled: !onNext }, nextLabel, ' →'),
  );
}

const errorBox = () => h('p', { class: 'est-error', role: 'alert', hidden: true });
function showError(box, msg) { box.textContent = msg; box.hidden = false; }

function qtyRow(key, getQty, setQty, extra) {
  const out = h('span', { class: 'est-qty-n', 'aria-live': 'polite' }, String(getQty()));
  return h('div', { class: 'est-row' },
    h('span', { class: 'est-row-name' }, label(key)),
    h('div', { class: 'est-qty' },
      h('button', { type: 'button', 'aria-label': `${t.less}: ${label(key)}`, onclick: () => { setQty(Math.max(0, getQty() - 1)); out.textContent = getQty(); } }, '−'),
      out,
      h('button', { type: 'button', 'aria-label': `${t.more}: ${label(key)}`, onclick: () => { setQty(getQty() + 1); out.textContent = getQty(); } }, '+'),
      extra,
    ),
  );
}

function opt(type, name, text, checked, onchange) {
  return h('label', { class: 'est-opt' },
    h('input', { type, name, checked, onchange: (e) => onchange(e.target.checked) }),
    h('span', {}, text));
}

// Step 1 — what. The markup comes from the page; bind it once and keep the node,
// so going back to step 1 keeps photos, ticks and text as they were.
let step1El = null;
function bindStep1(el) {
  const q = (name) => el.querySelector(`[data-est="${name}"]`);
  const fileInput = q('file'), shoot = q('shoot'), grid = q('photos'), more = q('more'), text = q('text'), err = q('err');

  function drawPhotos() {
    grid.replaceChildren(...state.photos.map((p, i) =>
      h('div', { class: 'est-thumb' },
        h('img', { src: p.url, alt: '' }),
        h('button', { type: 'button', 'aria-label': t.removePhoto, onclick: () => {
          URL.revokeObjectURL(p.url);
          state.photos.splice(i, 1);
          drawPhotos();
        } }, '×'))));
    shoot.hidden = state.photos.length > 0;
    more.hidden = state.photos.length === 0 || state.photos.length >= MAX_PHOTOS;
  }

  fileInput.addEventListener('change', async () => {
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
  });
  shoot.addEventListener('click', () => fileInput.click());
  more.addEventListener('click', () => fileInput.click());

  el.querySelectorAll('.est-chip[data-key]').forEach((chip) => {
    const key = chip.dataset.key;
    if (chip.getAttribute('aria-pressed') === 'true') state.picks[key] = 1;
    chip.addEventListener('click', () => {
      start();
      err.hidden = true;
      state.picks[key] = state.picks[key] ? 0 : 1;
      chip.setAttribute('aria-pressed', String(!!state.picks[key]));
    });
  });

  text.addEventListener('input', () => { start(); err.hidden = true; state.text = text.value; });

  q('next').addEventListener('click', () => {
    const any = state.photos.length || state.text.trim() || pickedKeys().length;
    if (!any) return showError(err, t.needItems);
    start();
    state.confirmed = null; // rebuilt from the AI result + ticked items on step 3
    runAi();
    go(2);
  });
  return el;
}

// Step 2 — where and access
function step2() {
  const err = errorBox();
  const zones = state.config.distance.free_zones;
  const otherBox = h('div', { class: 'est-other', hidden: state.zone !== '__other' },
    h('label', { class: 'est-label', for: 'est-other' }, t.otherLabel),
    h('input', { id: 'est-other', type: 'text', value: state.otherName, autocomplete: 'address-level2', oninput: (e) => { state.otherName = e.target.value; } }),
    h('p', { class: 'est-label' }, t.distLabel),
    h('div', { class: 'est-seg' }, Object.entries(t.dist).map(([v, txt]) =>
      opt('radio', 'est-dist', txt, state.otherDist === v, () => { state.otherDist = v; }))),
  );
  const select = h('select', { id: 'est-zone', onchange: (e) => { state.zone = e.target.value; otherBox.hidden = state.zone !== '__other'; err.hidden = true; } },
    h('option', { value: '' }, t.zonePick),
    h('optgroup', { label: t.sectors }, zones.slice(0, SECTORS).map((z) => h('option', { value: z, selected: state.zone === z }, zoneLabel(z)))),
    h('optgroup', { label: t.suburbs }, zones.slice(SECTORS).map((z) => h('option', { value: z, selected: state.zone === z }, zoneLabel(z)))),
    h('option', { value: '__other', selected: state.zone === '__other' }, t.other),
  );
  const floors = Array.from({ length: 21 }, (_, n) =>
    h('option', { value: n, selected: state.floor === n }, n === 0 ? t.floor0 : tpl(t.floorN, { n })));

  return [
    h('h2', {}, t.s2),
    h('label', { class: 'est-label', for: 'est-zone', style: 'margin-top:4px' }, t.zoneLabel), select,
    otherBox,
    h('label', { class: 'est-label', for: 'est-floor' }, t.floorLabel),
    h('select', { id: 'est-floor', onchange: (e) => { state.floor = Number(e.target.value); } }, floors),
    h('div', { class: 'est-grid2', style: 'margin-top:10px' },
      opt('checkbox', 'lift', t.lift, state.lift, (v) => { state.lift = v; }),
      opt('checkbox', 'down', t.down, state.alreadyDown, (v) => { state.alreadyDown = v; })),
    h('div', { style: 'margin-top:10px' }, opt('checkbox', 'dismantle', t.dismantle, state.dismantle, (v) => { state.dismantle = v; })),
    h('p', { class: 'est-label' }, t.parkingLabel),
    h('div', { class: 'est-seg' }, Object.entries(t.parking).map(([v, txt]) =>
      opt('radio', 'est-parking', txt, state.parking === v, () => { state.parking = v; }))),
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

// Step 3 — check the list
function step3() {
  if (state.aiStatus === 'pending') {
    return [h('h2', {}, t.s3), h('div', { class: 'est-loading', role: 'status' }, h('span', { class: 'est-spinner' }), t.analyzing), nav(null, t.seePrice)];
  }
  if (!state.confirmed) state.confirmed = buildConfirmed();
  const err = errorBox();
  const list = h('div', { class: 'est-list' });

  function draw() {
    list.replaceChildren(...state.confirmed.map((row, i) => qtyRow(row.key, () => row.qty, (q) => { row.qty = q; },
      h('button', { type: 'button', class: 'est-del', 'aria-label': `${t.remove}: ${label(row.key)}`, onclick: () => { state.confirmed.splice(i, 1); draw(); } }, '×'))));
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
  if (state.aiStatus === 'failed') {
    notes.push(h('p', { class: 'est-note' }, t.aiFailed, h('br'), h('small', { class: 'est-code' }, 'cod: ' + state.aiReason)));
  }
  if (fromAi && (state.ai.confidence === 'low' || state.ai.unclear.length)) notes.push(h('p', { class: 'est-note' }, t.unclear));

  const suggest = h('div', { class: 'est-suggest' });
  function drawSuggest() {
    const rows = state.suggestions || [];
    suggest.hidden = !rows.length;
    suggest.replaceChildren(
      h('p', { class: 'est-label' }, t.suggestTitle),
      h('p', { class: 'est-hint', style: 'margin:-4px 0 10px' }, t.suggestSub),
      h('div', { class: 'est-chips' }, rows.map((row, i) => h('button', {
        type: 'button', class: 'est-chip add',
        onclick: () => {
          state.suggestions.splice(i, 1);
          const same = state.confirmed.find((r) => r.key === row.key);
          if (same) same.qty += row.qty; else state.confirmed.push(row);
          draw();
          drawSuggest();
        },
      }, `+ ${row.qty > 1 ? row.qty + '× ' : ''}${label(row.key)}`))),
    );
  }
  drawSuggest();

  return [
    h('h2', {}, t.s3),
    ...notes,
    fromAi ? h('p', { class: 'est-sub' }, t.seenAsk) : null,
    h('p', { class: 'est-label', style: 'margin-top:6px' }, fromAi ? t.seen : t.yourList),
    list,
    suggest,
    h('p', { class: 'est-label' }, t.addItem), adder,
    err,
    nav(() => {
      state.confirmed = state.confirmed.filter((r) => r.qty > 0);
      if (!state.confirmed.length) { draw(); return showError(err, t.emptyList); }
      go(4);
    }, t.seePrice),
  ];
}

function breakdownLine(b) {
  const bd = t.bd;
  switch (b.key) {
    case 'item': return tpl(bd.item, { item: label(b.item), qty: b.qty });
    case 'loaders': return tpl(bd.loaders, { h: String(b.hours).replace('.', ',') });
    case 'floor_no_lift': return tpl(bd.floor_no_lift, { n: b.floors });
    case 'dismantling': return tpl(bd.dismantling, { item: label(b.item), qty: b.qty });
    default: return bd[b.key] || b.key;
  }
}

function waMessage(r) {
  const w = t.wa;
  const items = state.confirmed.map((c) => `${c.qty}× ${label(c.key)}`).join(', ');
  const place = state.zone === '__other' ? `${state.otherName.trim()} (${t.dist[state.otherDist] || ''})` : zoneLabel(state.zone);
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
    state.when ? `${w.when}: ${t.when[state.when]}` : null,
    `${w.est}: ${price}`,
    state.photos.length ? w.photos : null,
  ].filter(Boolean).join('\n');
}

// Step 4 — the receipt
function step4() {
  const r = estimate(priceInput(), state.config);
  state.result = r;
  track('estimate_shown', { low: r.low, high: r.high, negotiated: r.negotiated });

  const wa = h('a', { class: 'btn btn-wa', target: '_blank', rel: 'noopener', onclick: () => track('cta_whatsapp') }, icon('whatsapp'), t.bookWa);
  const setWa = () => { wa.href = `https://wa.me/${WA}?text=${encodeURIComponent(waMessage(r))}`; };
  setWa();

  const whenChips = h('div', { class: 'est-chips est-when', role: 'group', 'aria-label': t.whenLabel },
    Object.entries(t.when).map(([v, txt]) => {
      const b = h('button', { type: 'button', class: 'est-chip', 'aria-pressed': String(state.when === v), onclick: () => {
        state.when = state.when === v ? '' : v;
        whenChips.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', String(state.when === v));
        setWa();
      } }, txt);
      return b;
    }));

  const flagTexts = r.flags.map((f) => t.flags[f]).filter(Boolean);
  const today = new Date().toLocaleDateString(state.lang === 'ru' ? 'ru-RU' : 'ro-RO');

  const receiptEl = h('div', { class: 'receipt' },
    h('div', { class: 'rc-head' }, h('strong', {}, t.receiptTitle), h('small', {}, `${state.id} · ${today}`)),
    r.negotiated
      ? h('p', { style: 'margin:0' }, t.negotiatedSub)
      : [
          h('ul', { class: 'rc-rows' }, r.breakdown.map((b) => h('li', { class: 'rc-row' },
            h('span', {}, breakdownLine(b)), h('i'), h('b', {}, `${fmt(b.amount)}`)))),
          h('div', { class: 'rc-total' }, h('span', {}, t.total), h('span', {}, `${fmt(r.low)}–${fmt(r.high)} ${t.currency}`)),
        ],
    h('div', { class: 'rc-foot' }, h('p', {}, t.footIncluded)),
  );

  return [
    h('div', { class: 'est-result' },
      h('h2', {}, r.negotiated ? t.negotiated : t.s4),
      r.negotiated ? null : h('p', { class: 'est-price' }, `${fmt(r.low)}–${fmt(r.high)} `, h('small', {}, t.currency)),
      receiptEl,
      h('p', { class: 'est-label' }, t.whenLabel), whenChips,
      h('div', { class: 'est-ctas' }, wa,
        h('a', { class: 'btn btn-yellow', href: `tel:${PHONE}`, onclick: () => track('cta_call') }, icon('phone'), `${t.call} ${PHONE_LABEL}`)),
      state.photos.length ? h('p', { class: 'est-note', style: 'margin-top:14px' }, t.photosReminder) : null,
      flagTexts.length ? h('ul', { class: 'est-flags' }, flagTexts.map((f) => h('li', {}, f))) : null,
      h('p', { class: 'est-hint' }, t.note),
      h('p', { class: 'est-hint' }, t.notTaken),
      h('button', { type: 'button', class: 'btn btn-paper est-again', onclick: () => go(1) }, t.again),
    ),
  ];
}

const STEP_FNS = { 2: step2, 3: step3, 4: step4 };

let configReady = null;
async function go(n) {
  if (!state.config) {
    try { await configReady; } catch { /* keep step 1; the call / WhatsApp buttons still work */ }
    if (!state.config) return;
  }
  state.step = n;
  render();
  const first = root.querySelector('h2');
  if (first) { first.tabIndex = -1; first.focus({ preventScroll: true }); }
  const top = root.getBoundingClientRect().top;
  if (top < 0 || top > window.innerHeight * 0.5) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function render() {
  if (state.step === 1) return root.replaceChildren(step1El);
  root.replaceChildren(h('div', { class: 'est-shell' },
    h('div', { class: 'est-top' },
      h('p', { class: 'est-step' }, tpl(t.progress, { n: state.step, total: STEPS })),
      h('div', { class: 'est-dots', 'aria-hidden': 'true' }, Array.from({ length: STEPS }, (_, i) => h('span', { class: i < state.step ? 'on' : '' })))),
    ...STEP_FNS[state.step](),
  ));
}

function applyPresets() {
  const zone = root.dataset.zone || '';
  if (zone.startsWith('other:')) {
    const [, name, dist] = zone.split(':');
    state.zone = '__other';
    state.otherName = name || '';
    state.otherDist = dist || '';
  } else if (state.config.distance.free_zones.includes(zone)) {
    state.zone = zone;
  }
}

function init() {
  root = document.getElementById('estimator');
  if (!root) return;
  const ssr = root.querySelector('.est-shell[data-step="1"]');
  if (!ssr) return;
  state.lang = document.documentElement.lang === 'ru' ? 'ru' : 'ro';
  t = T[state.lang];
  step1El = bindStep1(ssr); // interactive right away; prices load in parallel
  configReady = fetch('/pricing.config.json', { cache: 'no-cache' })
    .then((r) => r.json())
    .then((cfg) => { state.config = cfg; applyPresets(); });
}

init();
