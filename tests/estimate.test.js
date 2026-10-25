import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { estimate } from '../lib/estimate.js';

const config = JSON.parse(readFileSync(new URL('../pricing.config.json', import.meta.url), 'utf8'));

/** The computed price must sit inside the operator's range, and the shown band must overlap it. */
function matches(r, lo, hi) {
  assert.ok(r.total >= lo && r.total <= hi, `computed ${r.total} must be within ${lo}–${hi}`);
  assert.ok(r.low <= hi && r.high >= lo, `band ${r.low}–${r.high} must overlap ${lo}–${hi}`);
}
const job = (items, extra = {}) => estimate({ zone: 'Centru', floor: 2, lift: false, items, ...extra }, config);

// ---- Operator's WhatsApp price list (Oct 2026) ----

test('Saltea sau 1–2 obiecte mici: 400–600', () => {
  matches(job([{ key: 'saltea' }]), 400, 600);
  matches(job([{ key: 'tv' }, { key: 'scaun' }]), 400, 600);
});

test('Canapea sau dulap (etaj mic sau cu lift): 900–1 400', () => {
  matches(job([{ key: 'canapea' }]), 900, 1400);
  matches(job([{ key: 'dulap' }], { floor: 8, lift: true }), 900, 1400);
});

test('Canapea + 1–2 piese (masă, comodă): 1 200–1 800', () => {
  matches(job([{ key: 'canapea' }, { key: 'masa' }]), 1200, 1800);
  matches(job([{ key: 'canapea' }, { key: 'masa' }, { key: 'comoda' }]), 1200, 1800);
});

test('Stencă + canapea, cu demontare: 2 500–3 500', () => {
  matches(job([{ key: 'stenca' }, { key: 'canapea_coltar' }], { dismantleAll: true }), 2500, 3500);
  matches(job([{ key: 'stenca' }, { key: 'canapea' }], { dismantleAll: true }), 2500, 3500);
});

test('Tapet, profile și câțiva saci de la renovare: ~1 200', () => {
  matches(job([{ key: 'tapet', qty: 6 }, { key: 'sac_moloz', qty: 8 }, { key: 'altceva' }]), 1000, 1400);
});

test('Ferestre vechi cu sticlă (5–8 bucăți): 1 800–2 200', () => {
  const r = job([{ key: 'fereastra', qty: 7 }]);
  matches(r, 1800, 2200);
  assert.ok(r.flags.includes('windows_glass_separate'));
  matches(job([{ key: 'fereastra', qty: 6 }]), 1700, 2200);
});

test('Apartament întreg / volum mare: de la 3 000', () => {
  const r = job([
    { key: 'stenca' }, { key: 'canapea' }, { key: 'pat' }, { key: 'dulap' }, { key: 'masa' },
    { key: 'scaun', qty: 4 }, { key: 'frigider' }, { key: 'masina_spalat' }, { key: 'sac_menajer', qty: 10 },
  ], { dismantleAll: true });
  assert.ok(r.total >= 3000, `full apartment ${r.total} should be at least 3000`);
  assert.ok(r.total <= config.truck.full_load_price + config.truck.extra_load_price, `full apartment ${r.total} should stay reasonable`);
});

test('În afara Chișinăului (Ialoveni, Mileștii Mici): +200–400', () => {
  const inTown = job([{ key: 'canapea' }]);
  const out = job([{ key: 'canapea' }], { zone: 'Mileștii Mici', km: 15 });
  const far = job([{ key: 'canapea' }], { zone: 'Ialoveni', km: 25 });
  for (const r of [out, far]) {
    const d = r.total - inTown.total;
    assert.ok(d >= 200 && d <= 400, `distance surcharge ${d} must be 200–400`);
  }
});

test('Etaj 4+ fără lift costă mai mult', () => {
  const low = job([{ key: 'canapea' }, { key: 'masa' }], { floor: 2 });
  const high = job([{ key: 'canapea' }, { key: 'masa' }], { floor: 6 });
  assert.equal(high.total - low.total, 3 * config.floor_no_lift.price_per_floor);
});

// ---- Earlier real jobs still land in range ----

test('Botanica et. 5 fără lift: canapea + comodă + masă → real 1 500', () => {
  const r = estimate({ zone: 'Botanica', floor: 5, items: [{ key: 'canapea' }, { key: 'comoda' }, { key: 'masa' }] }, config);
  assert.ok(r.low <= 1500 && 1500 <= r.high, `band ${r.low}–${r.high} must contain 1500`);
});

test('Botanica et. 5 fără lift: stencă + canapea de colț, demontare → real 3 000–3 500', () => {
  const r = estimate({ zone: 'Botanica', floor: 5, dismantleAll: true, items: [{ key: 'stenca' }, { key: 'canapea_coltar' }] }, config);
  matches(r, 3000, 3500);
});

test('Poșta Veche et. 5 fără lift: 7 ferestre → real 2 100', () => {
  const r = estimate({ zone: 'Râșcani', floor: 5, items: [{ key: 'fereastra', qty: 7 }] }, config);
  assert.ok(r.low <= 2100 && 2100 <= r.high, `band ${r.low}–${r.high} must contain 2100`);
});

// ---- Rules ----

test('peste 40 km → fără preț, "cere ofertă"', () => {
  const r = estimate({ zone: 'Orhei', km: 45, items: [{ key: 'canapea' }] }, config);
  assert.equal(r.negotiated, true);
  assert.equal(r.low, null);
  assert.ok(r.flags.includes('distance_negotiated'));
});

test('comandă minimă', () => {
  const r = job([{ key: 'scaun' }]);
  assert.equal(r.total, config.minimum_total.price);
  assert.ok(r.flags.includes('minimum_price'));
});

test('peste capacitatea camionului → al doilea drum, cu plafon per camion plin', () => {
  const r = job([{ key: 'sac_moloz', qty: 200 }]);
  assert.equal(r.trips, 2);
  assert.ok(r.flags.includes('multiple_trips'));
  assert.ok(r.total <= config.truck.full_load_price + config.truck.extra_load_price);
});

test('banda conține prețul calculat și e rotunjită la 50', () => {
  for (const items of [[{ key: 'pat' }], [{ key: 'bucatarie' }], [{ key: 'crengi', qty: 3 }, { key: 'anvelopa', qty: 4 }]]) {
    const r = job(items, { dismantleAll: true });
    assert.ok(r.low < r.total && r.total < r.high);
    assert.equal(r.low % config.estimate_band.round_to, 0);
    assert.equal(r.high % config.estimate_band.round_to, 0);
  }
});

test('hamali fără camion: minim o oră, fără prețuri de obiecte', () => {
  const r = estimate({ zone: 'Centru', noTruck: true, items: [] }, config);
  assert.equal(r.trips, 0);
  assert.deepEqual(r.breakdown.map((b) => b.key), ['loaders']);
  assert.equal(r.total, config.loaders.price_per_hour_pair * config.loaders.min_hours);
});

test('obiect necunoscut → tratat ca "altceva", semnalat', () => {
  const r = job([{ key: 'pian' }]);
  assert.ok(r.flags.includes('unknown_item'));
  assert.equal(r.items[0].key, 'altceva');
});

test('niciun preț în cod: toate sumele vin din config', () => {
  const doubled = structuredClone(config);
  doubled.call_out.price *= 2;
  doubled.items.canapea.price *= 2;
  const a = job([{ key: 'canapea' }]);
  const b = estimate({ zone: 'Centru', floor: 2, lift: false, items: [{ key: 'canapea' }] }, doubled);
  assert.equal(b.total - a.total, config.call_out.price + config.items.canapea.price);
});
