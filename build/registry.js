// Every page on the site, with its URL in each language.
// RU URLs mirror RO under /ru/ unless set explicitly.
export const LANGS = ['ro', 'ru'];

const P = (id, ro, tpl, extra = {}) => ({ id, ro, ru: extra.ru || (ro === '/' ? '/ru/' : '/ru' + ro), tpl, ...extra });

export const PAGES = [
  P('home', '/', 'home', { priority: '1.0' }),
  P('estimare', '/estimare/', 'estimare', { ru: '/ru/ocenka/', priority: '0.9' }),
  P('preturi', '/preturi/', 'preturi', { priority: '0.9' }),

  P('mobila', '/evacuare-mobila-veche/', 'landing', { group: 'service', icon: 'sofa' }),
  P('moloz', '/evacuare-moloz-constructii/', 'landing', { group: 'service', icon: 'bricks' }),
  P('apartament', '/evacuare-apartament/', 'landing', { group: 'service', icon: 'home' }),
  P('hamali', '/hamali/', 'landing', { group: 'service', icon: 'people' }),

  P('saltea', '/evacuare-saltea/', 'landing', { group: 'item' }),
  P('ferestre', '/evacuare-ferestre-vechi/', 'landing', { group: 'item' }),
  P('electrocasnice', '/evacuare-frigider-masina-de-spalat/', 'landing', { group: 'item' }),
  P('stenca', '/evacuare-stenca-mobila-veche/', 'landing', { group: 'item' }),

  P('botanica', '/evacuare-gunoi-botanica/', 'landing', { group: 'sector' }),
  P('buiucani', '/evacuare-gunoi-buiucani/', 'landing', { group: 'sector' }),
  P('centru', '/evacuare-gunoi-centru/', 'landing', { group: 'sector' }),
  P('ciocana', '/evacuare-gunoi-ciocana/', 'landing', { group: 'sector' }),
  P('rascani', '/evacuare-gunoi-rascani/', 'landing', { group: 'sector' }),
  P('ialoveni', '/evacuare-gunoi-ialoveni/', 'landing', { group: 'sector' }),

  P('diaspora', '/diaspora/', 'diaspora', { priority: '0.8' }),
  P('contact', '/contact/', 'contact', { priority: '0.7' }),
  P('despre', '/despre/', 'despre', { priority: '0.6' }),
];

export const byId = Object.fromEntries(PAGES.map((p) => [p.id, p]));
export const href = (id, lang) => {
  const [pid, hash] = id.split('#');
  const p = byId[pid];
  if (!p) throw new Error(`unknown page "${pid}"`);
  return p[lang] + (hash ? '#' + hash : '');
};
export const group = (g) => PAGES.filter((p) => p.group === g);
