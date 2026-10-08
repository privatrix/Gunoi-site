/* gunoi.md — pricing engine.
 * Pure function: same input + config → same output. No I/O, no prices of its own;
 * every amount comes from pricing.config.json. Runs in the browser and in Node.
 *
 * input = {
 *   items:       [{ key, qty = 1, dismantle = false, m3 }],  // m3 optional per-unit override (AI)
 *   volumeM3:    number,   // optional total override (AI); otherwise summed from items
 *   floor:       number,   // 0 = ground
 *   lift:        boolean,
 *   alreadyDown: boolean,  // items already downstairs / in the yard
 *   dismantleAll:boolean,  // "trebuie demontat" toggle: dismantle every dismantlable item
 *   zone:        string,   // sector / suburb name; free if listed in config
 *   km:          number,   // distance from centre, used when zone is not a free zone
 *   weekend:     boolean,
 *   noTruck:     boolean   // loaders only
 * }
 */

const r2 = (n) => Math.round(n * 100) / 100;
const roundUp = (n, step) => Math.ceil(n / step - 1e-9) * step;
const roundDown = (n, step) => Math.floor(n / step + 1e-9) * step;

export function estimate(input, config) {
  const cfg = config;
  const flags = [];
  const breakdown = [];
  const add = (key, amount, extra = {}) => {
    if (amount !== 0) breakdown.push({ key, amount, ...extra });
  };

  const floor = Math.max(0, Math.floor(Number(input.floor) || 0));
  const onStairs = !input.lift && !input.alreadyDown && floor > 0;

  // ---- items → volume, dismantling, special extras
  let itemsM3 = 0;
  let dismantleHours = 0;
  const lines = [];
  for (const raw of input.items || []) {
    const qty = Math.max(0, Number(raw.qty ?? 1));
    if (!qty) continue;
    let key = raw.key;
    let def = cfg.items[key];
    if (!def || key.startsWith('_')) {
      flags.push('unknown_item');
      key = 'altceva';
      def = cfg.items.altceva;
    }
    const unitM3 = Number.isFinite(raw.m3) && raw.m3 > 0 ? raw.m3 : def.m3;
    itemsM3 += unitM3 * qty;
    lines.push({ key, qty });

    const dismantle = def.dismantle && (raw.dismantle || input.dismantleAll);
    if (dismantle) {
      const cls = cfg.dismantling.classes[def.dismantle] || cfg.dismantling.classes.other;
      add('dismantling', cls.price * qty, { item: key, qty, cls: def.dismantle });
      dismantleHours += cls.hours * qty;
    }

    if (def.special) {
      const sp = cfg.special_items[def.special];
      if (sp && sp.price) add('special', sp.price * qty, { item: key, qty, unit: sp.unit });
      if (def.special === 'window_glass') flags.push('windows_glass_separate');
    }
  }

  const volumeM3 = r2(
    Number.isFinite(input.volumeM3) && input.volumeM3 > 0 ? input.volumeM3 : itemsM3
  );

  // ---- trips
  const trips = input.noTruck ? 0 : Math.max(1, Math.ceil(volumeM3 / cfg.truck_base.capacity_m3 - 1e-9));
  if (trips > 1) flags.push('multiple_trips');
  if (trips) add('truck', cfg.truck_base.price * trips, { trips });

  // ---- labour time model
  const lt = cfg.labour_time_model;
  const loaderHours = r2(
    lt.base_hours + lt.per_m3 * volumeM3 + (onStairs ? lt.per_floor_no_lift * floor : 0) + dismantleHours
  );
  const L = cfg.loaders;
  const billable = input.noTruck
    ? Math.max(L.min_hours, loaderHours)
    : Math.max(0, loaderHours - cfg.truck_base.included_loader_hours * trips);
  const billedHours = billable > 0 ? roundUp(billable, L.round_to_hours) : 0;
  add('loaders', billedHours * L.price_per_hour_pair, { hours: billedHours });

  // ---- floors without lift
  const F = cfg.floor_no_lift;
  const floorsCharged = onStairs ? Math.max(0, floor - F.free_floors) : 0;
  if (floorsCharged) {
    if (volumeM3 < F.waive_below_m3) flags.push('floor_surcharge_waived');
    else add('floor_no_lift', floorsCharged * F.price_per_floor, { floors: floorsCharged });
  }

  // ---- distance
  const D = cfg.distance;
  let negotiated = false;
  const freeZone = input.zone && D.free_zones.includes(input.zone);
  if (!freeZone) {
    const km = Number(input.km);
    if (!Number.isFinite(km)) {
      if (input.zone) flags.push('distance_unknown');
    } else if (km > D.negotiate_above_km) {
      negotiated = true;
      flags.push('distance_negotiated');
    } else if (km >= D.free_within_km) {
      const tier = D.tiers.find((t) => km >= t.from_km && km <= t.to_km);
      if (tier) add('distance', tier.price, { km });
    }
  }

  // ---- weekend
  if (input.weekend) add('weekend', cfg.weekend.price);

  const total = breakdown.reduce((s, b) => s + b.amount, 0);
  if (!input.noTruck && trips === 1 && total === cfg.truck_base.price) flags.push('minimum_price');

  // ---- band (never a single number)
  const B = cfg.estimate_band;
  const low = negotiated ? null : roundDown(total * (1 + B.low_pct / 100), B.round_to);
  const high = negotiated ? null : roundUp(total * (1 + B.high_pct / 100), B.round_to);

  return {
    low,
    high,
    total: negotiated ? null : total,
    negotiated,
    breakdown,
    trips,
    loaderHours,
    volumeM3,
    items: lines,
    flags: [...new Set(flags)],
  };
}
