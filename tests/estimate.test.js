import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { estimate } from '../lib/estimate.js';

const config = JSON.parse(readFileSync(new URL('../pricing.config.json', import.meta.url), 'utf8'));
const inBand = (r, price) => r.low <= price && price <= r.high;

// ---- Real jobs from the operator ----

test('Botanica, et. 5 fără lift: canapea + comodă mică + masă → real 1 500', () => {
  const r = estimate({
    zone: 'Botanica', floor: 5, lift: false,
    items: [{ key: 'canapea' }, { key: 'comoda' }, { key: 'masa' }],
  }, config);
  assert.ok(inBand(r, 1500), `band ${r.low}–${r.high} must contain 1500`);
});

test('Botanica, et. 5 fără lift: stencă + canapea de colț, demontare → real ~3 000–3 500', () => {
  const r = estimate({
    zone: 'Botanica', floor: 5, lift: false, dismantleAll: true,
    items: [{ key: 'stenca' }, { key: 'canapea_coltar' }],
  }, config);
  assert.ok(r.low <= 3500 && r.high >= 3000, `band ${r.low}–${r.high} must overlap 3000–3500`);
  assert.ok(r.total >= 3000 && r.total <= 3500, `computed ${r.total} should sit in 3000–3500`);
});

test('Poșta Veche, et. 5 fără lift: 7 ferestre vechi cu sticlă + rame → real 2 100', () => {
  const r = estimate({
    zone: 'Râșcani', floor: 5, lift: false,
    items: [{ key: 'fereastra', qty: 7 }],
  }, config);
  assert.ok(inBand(r, 2100), `band ${r.low}–${r.high} must contain 2100`);
  assert.ok(r.flags.includes('windows_glass_separate'));
});

test('Buiucani, et. 1: o saltea 180×200 → minimul', () => {
  const r = estimate({
    zone: 'Buiucani', floor: 1, lift: false,
    items: [{ key: 'saltea' }],
  }, config);
  assert.equal(r.total, config.truck_base.price);
  assert.ok(r.flags.includes('minimum_price'));
});

test('Mileștii Mici (~20 km): 2 TV, mașină de spălat, 2 cuptoare, borcane, covoare → taxă distanță', () => {
  const r = estimate({
    zone: 'Mileștii Mici', km: 20, floor: 0,
    items: [
      { key: 'tv', qty: 2 }, { key: 'masina_spalat' }, { key: 'cuptor_electric', qty: 2 },
      { key: 'borcane' }, { key: 'covor', qty: 2 },
    ],
  }, config);
  const dist = r.breakdown.find((b) => b.key === 'distance');
  assert.ok(dist, 'distance surcharge must apply');
  assert.equal(dist.amount, config.distance.tiers[0].price);
  assert.equal(r.negotiated, false);
});

// ---- Rules ----

test('peste 40 km → fără preț, "cere ofertă"', () => {
  const r = estimate({ zone: 'Orhei', km: 45, items: [{ key: 'canapea' }] }, config);
  assert.equal(r.negotiated, true);
  assert.equal(r.low, null);
  assert.equal(r.high, null);
  assert.ok(r.flags.includes('distance_negotiated'));
});

test('cu lift nu se taxează etajele', () => {
  const base = { zone: 'Centru', floor: 9, dismantleAll: true, items: [{ key: 'stenca' }, { key: 'dulap' }] };
  const noLift = estimate({ ...base, lift: false }, config);
  const lift = estimate({ ...base, lift: true }, config);
  assert.ok(noLift.breakdown.some((b) => b.key === 'floor_no_lift'));
  assert.ok(!lift.breakdown.some((b) => b.key === 'floor_no_lift'));
  assert.ok(lift.total < noLift.total);
});

test('peste capacitatea camionului → al doilea drum', () => {
  const r = estimate({ zone: 'Ciocana', items: [{ key: 'sac_moloz', qty: 200 }] }, config);
  assert.equal(r.trips, 2);
  assert.ok(r.flags.includes('multiple_trips'));
  assert.equal(r.breakdown.find((b) => b.key === 'truck').amount, config.truck_base.price * 2);
});

test('banda conține mereu prețul calculat și e rotunjită la 50', () => {
  const cases = [
    { items: [{ key: 'pat' }] },
    { floor: 7, items: [{ key: 'bucatarie' }], dismantleAll: true },
    { items: [{ key: 'crengi', qty: 3 }, { key: 'anvelopa', qty: 4 }] },
  ];
  for (const c of cases) {
    const r = estimate({ zone: 'Centru', ...c }, config);
    assert.ok(r.low < r.total && r.total < r.high);
    assert.equal(r.low % config.estimate_band.round_to, 0);
    assert.equal(r.high % config.estimate_band.round_to, 0);
  }
});

test('hamali fără camion: minim o oră', () => {
  const r = estimate({ zone: 'Centru', noTruck: true, items: [] }, config);
  const loaders = r.breakdown.find((b) => b.key === 'loaders');
  assert.equal(r.trips, 0);
  assert.ok(!r.breakdown.some((b) => b.key === 'truck'));
  assert.equal(loaders.hours, config.loaders.min_hours);
  assert.equal(loaders.amount, config.loaders.price_per_hour_pair * config.loaders.min_hours);
});

test('obiect necunoscut → tratat ca "altceva", semnalat', () => {
  const r = estimate({ zone: 'Centru', items: [{ key: 'pian' }] }, config);
  assert.ok(r.flags.includes('unknown_item'));
  assert.equal(r.items[0].key, 'altceva');
});

test('niciun preț în cod: toate sumele vin din config', () => {
  const doubled = structuredClone(config);
  doubled.truck_base.price *= 2;
  doubled.floor_no_lift.price_per_floor *= 2;
  const input = { zone: 'Centru', floor: 6, items: [{ key: 'stenca' }, { key: 'canapea' }] };
  const a = estimate(input, config);
  const b = estimate(input, doubled);
  assert.equal(b.total - a.total, config.truck_base.price + 3 * config.floor_no_lift.price_per_floor);
});
