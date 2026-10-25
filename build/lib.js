// Shared helpers for the static site generator.
import { readFileSync } from 'node:fs';
import { estimate } from '../lib/estimate.js';

export const ROOT = new URL('../', import.meta.url);
export const config = JSON.parse(readFileSync(new URL('pricing.config.json', ROOT), 'utf8'));

export const SITE = 'https://www.gunoi.md';
export const PHONE = '069269888';
export const PHONE_LABEL = '069 269 888';
export const WA = '37369269888';
export const EMAIL = 'gunoimoldova@gmail.com';
export const GA_ID = 'G-EXSYSJE8F6';
export const AHREFS_KEY = 'kkM3qiXMXazCcSJSDCPk9g';

/**
 * Typical jobs, priced by the same engine as the estimator. Content refers to
 * them by key ({band:canapea}); nothing on the site hard-codes an amount.
 * Baseline: Chișinău, 2nd floor (no floor surcharge).
 */
export const EXAMPLES = {
  saltea: { items: [{ key: 'saltea' }] },
  mici: { items: [{ key: 'tv' }, { key: 'scaun' }] },
  canapea: { items: [{ key: 'canapea' }] },
  dulap: { items: [{ key: 'dulap' }] },
  pat: { items: [{ key: 'pat' }] },
  canapea_plus: { items: [{ key: 'canapea' }, { key: 'masa' }, { key: 'comoda' }] },
  stenca: { items: [{ key: 'stenca' }], dismantleAll: true },
  stenca_canapea: { items: [{ key: 'stenca' }, { key: 'canapea_coltar' }], dismantleAll: true },
  bucatarie: { items: [{ key: 'bucatarie' }], dismantleAll: true },
  renovare: { items: [{ key: 'tapet', qty: 6 }, { key: 'sac_moloz', qty: 8 }, { key: 'altceva' }] },
  saci20: { items: [{ key: 'sac_moloz', qty: 20 }] },
  baie: { items: [{ key: 'sac_moloz', qty: 40 }, { key: 'usa' }, { key: 'altceva' }] },
  ferestre2: { items: [{ key: 'fereastra', qty: 2 }] },
  ferestre: { items: [{ key: 'fereastra', qty: 7 }] },
  frigider: { items: [{ key: 'frigider' }] },
  masina: { items: [{ key: 'masina_spalat' }] },
  frigider_masina: { items: [{ key: 'frigider' }, { key: 'masina_spalat' }] },
  electrocasnice: { items: [{ key: 'frigider' }, { key: 'masina_spalat' }, { key: 'aragaz' }, { key: 'tv' }] },
  covoare: { items: [{ key: 'covor', qty: 2 }, { key: 'borcane' }] },
  hamali1: { noTruck: true, items: [] },
  hamali_mutare: { noTruck: true, items: [{ key: 'canapea' }, { key: 'dulap' }, { key: 'pat' }, { key: 'frigider' }] },
  ialoveni_saltea: { zone: 'Ialoveni', km: 15, items: [{ key: 'saltea' }] },
  ialoveni_canapea: { zone: 'Ialoveni', km: 15, items: [{ key: 'canapea' }] },
  ialoveni_stenca: { zone: 'Ialoveni', km: 15, items: [{ key: 'stenca' }, { key: 'canapea_coltar' }], dismantleAll: true },
  ialoveni_apartament: {
    zone: 'Ialoveni', km: 15, dismantleAll: true,
    items: [{ key: 'stenca' }, { key: 'canapea' }, { key: 'pat' }, { key: 'masa' }, { key: 'scaun', qty: 4 }, { key: 'frigider' }],
  },
  apartament: {
    items: [{ key: 'stenca' }, { key: 'canapea' }, { key: 'pat' }, { key: 'masa' }, { key: 'scaun', qty: 4 }, { key: 'frigider' }],
    dismantleAll: true,
  },
  apartament_mare: {
    items: [
      { key: 'stenca' }, { key: 'canapea' }, { key: 'pat' }, { key: 'dulap' }, { key: 'masa' }, { key: 'scaun', qty: 4 },
      { key: 'frigider' }, { key: 'masina_spalat' }, { key: 'sac_menajer', qty: 10 },
    ],
    dismantleAll: true,
  },
};

const BASE = { zone: 'Centru', floor: 2, lift: false };
const cache = new Map();
export function priceOf(key) {
  if (!cache.has(key)) {
    const ex = EXAMPLES[key];
    if (!ex) throw new Error(`unknown example "${key}"`);
    cache.set(key, estimate({ ...BASE, ...ex }, config));
  }
  return cache.get(key);
}

const CUR = { ro: 'lei', ru: 'лей' };
export const num = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const money = (n, lang) => `${num(n)} ${CUR[lang]}`;
export const band = (key, lang) => {
  const r = priceOf(key);
  return `${num(r.low)}–${num(r.high)} ${CUR[lang]}`;
};

function cfgPath(path) {
  const v = path.split('.').reduce((o, k) => (o == null ? o : o[k]), config);
  if (typeof v !== 'number') throw new Error(`config path "${path}" is not a number`);
  return v;
}

/**
 * Replace price placeholders in authored content:
 *   {band:canapea}  → "1 000–1 350 lei"     (typical job band)
 *   {low:canapea}   → "1 000 lei"           (lower edge)
 *   {high:canapea}  → "1 350 lei"
 *   {item:saltea}   → "200 lei"             (catalogue unit price)
 *   {money:call_out.price} → "300 lei"      (any config amount)
 *   {num:floor_no_lift.free_floors} → "3"   (any config number)
 */
export function fill(str, lang) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{(band|low|high|item|money|num):([\w.]+)\}/g, (_, kind, arg) => {
    switch (kind) {
      case 'band': return band(arg, lang);
      case 'low': return money(priceOf(arg).low, lang);
      case 'high': return money(priceOf(arg).high, lang);
      case 'item': {
        const it = config.items[arg];
        if (!it) throw new Error(`unknown item "${arg}"`);
        return money(it.price, lang);
      }
      case 'money': return money(cfgPath(arg), lang);
      case 'num': return num(cfgPath(arg));
      default: return _;
    }
  });
}

/** Deep-fill every string in a content object. */
export function fillAll(obj, lang) {
  if (typeof obj === 'string') return fill(obj, lang);
  if (Array.isArray(obj)) return obj.map((x) => fillAll(x, lang));
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fillAll(v, lang)]));
  }
  return obj;
}

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Strip tags for meta descriptions and JSON-LD. */
export const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const waLink = (text) => `https://wa.me/${WA}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
