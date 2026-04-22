/* ================================
   gunoi.md — interactivity
   ================================ */

// ---- i18n ----
const translations = {
  ro: {
    'nav.cta': 'Intră pe listă',
    'hero.badge': 'Lansăm în Chișinău — 2026',
    'hero.title1': 'Gunoiul tău',
    'hero.title2': 'face bani.',
    'hero.sub': 'Prima platformă AI din Moldova care ridică metalele, electrocasnicele vechi și deșeurile valoroase de la ușa ta — și îți plătește pentru ele. Fără negociere. Fără surprize.',
    'hero.cta1': 'Intră pe lista de așteptare',
    'hero.cta2': 'Cum funcționează',
    'stats.ai': 'Estimare instant',
    'stats.pickup': 'Ridicare rapidă',
    'stats.fee': 'Taxe pentru tine',
    'scan.identified': 'Identificat',
    'scan.price': 'Valoare estimată',
    'scan.book': 'Programează ridicarea',
    'how.eyebrow': 'Cum funcționează',
    'how.title': 'Trei pași. Niciunul complicat.',
    'step1.title': 'Fotografiază',
    'step1.text': 'Deschide telefonul. Fotografiază obiectul — metal, electrocasnic, cablu, mașină de spălat veche. AI-ul nostru îl identifică instant.',
    'step2.title': 'Primești prețul',
    'step2.text': 'Vezi valoarea reală de piață — nu o cifră inventată. Transparent. Dacă ești de acord, programezi ridicarea.',
    'step3.title': 'Venim. Plătim.',
    'step3.text': 'Un colector verificat vine la ușa ta în 24-48h. Cântărește, verifică, plătește pe loc. Tu câștigi. Moldova câștigă.',
    'collect.eyebrow': 'Ce ridicăm',
    'collect.title': 'Dacă are valoare, o vrem.',
    'c1.t': 'Metale feroase',
    'c1.d': 'Fier, oțel, tablă, radiatoare, țevi, piese auto',
    'c2.t': 'Metale neferoase',
    'c2.d': 'Cupru, alamă, aluminiu, plumb, zinc — cele mai valoroase',
    'c3.t': 'Electrocasnice',
    'c3.d': 'Mașini de spălat, frigidere, sobe, aparate de aer condiționat',
    'c4.t': 'Electronice',
    'c4.d': 'Calculatoare, televizoare, plăci, cabluri, componente',
    'c5.t': 'Auto & vehicule',
    'c5.d': 'Mașini casate, motoare, baterii, catalizatoare, jante',
    'c6.t': 'Construcții',
    'c6.d': 'Debris de la șantier, armătură, tâmplărie, materiale recuperabile',
    'why.eyebrow': 'De ce gunoi.md',
    'why.title': 'Prima dată când pe cineva chiar îl interesează gunoiul tău.',
    'why.body': 'Până acum, ridicarea fierului vechi în Moldova însemna să suni la cineva, să negociezi, să speri că nu te fură la cântar. Noi facem altfel: AI-ul identifică obiectul, prețul e afișat public, colectorul e verificat și notat, plata se face pe loc. Nu ești la mila nimănui.',
    'why.p1': 'Preț transparent bazat pe piața reală',
    'why.p2': 'Colectori verificați, evaluați de alți utilizatori',
    'why.p3': 'Plată pe loc — cash sau transfer bancar',
    'why.p4': 'Documente pentru firme — conforme cu normele UE',
    'why.p5': 'Urmărești cât ai reciclat și cât ai câștigat',
    'impact.title': 'Impact colectiv estimat',
    'impact.unit': 'tone/an',
    'impact.desc': 'de metal care azi zace prin curți și garaje în Chișinău și care poate intra înapoi în economia reală.',
    'impact.co2': '~ 4.800 tone CO₂ evitat',
    'col.eyebrow': 'Pentru colectori',
    'col.title': 'Ești deja în meserie? Platforma e și pentru tine.',
    'col.body': 'Dacă ridici deja fier vechi, electrocasnice sau deșeuri valoroase — vino pe platformă. Îți aducem clienți verificați, îți gestionăm programul, îți oferim plăți automate. Zero bătăi de cap cu reclamă pe Facebook.',
    'col.cta': 'Devino colector partener',
    'wl.eyebrow': 'Lansăm în curând',
    'wl.title': 'Fii printre primii care transformă gunoiul în bani.',
    'wl.sub': 'Primii 500 de utilizatori primesc bonus +10% la prima ridicare.',
    'wl.name': 'Numele tău',
    'wl.email': 'Email',
    'wl.phone': 'Telefon (opțional)',
    'wl.r1': 'Am gunoi de vândut',
    'wl.r2': 'Sunt colector',
    'wl.r3': 'Sunt firmă',
    'wl.submit': 'Intră pe listă',
    'wl.t1': '🔒 Zero spam',
    'wl.t2': '📍 Chișinău întâi',
    'wl.t3': '🇲🇩 Făcut în Moldova',
    'footer.tag': 'Gunoiul tău face bani. Hai să-i scoatem.',
    'footer.made': 'Construit în Chișinău',
    'msg.success': 'Ești pe listă. Îți scriem când lansăm în zona ta.',
    'msg.error': 'Ceva nu a mers. Încearcă din nou.',
    'msg.validation': 'Te rugăm să completezi câmpurile obligatorii.'
  },
  en: {
    'nav.cta': 'Join waitlist',
    'hero.badge': 'Launching in Chișinău — 2026',
    'hero.title1': 'Your trash',
    'hero.title2': 'makes money.',
    'hero.sub': "Moldova's first AI-powered platform that picks up scrap metal, old appliances, and valuable waste from your door — and pays you for it. No haggling. No surprises.",
    'hero.cta1': 'Join the waitlist',
    'hero.cta2': 'How it works',
    'stats.ai': 'Instant estimate',
    'stats.pickup': 'Fast pickup',
    'stats.fee': 'Zero fees for you',
    'scan.identified': 'Identified',
    'scan.price': 'Estimated value',
    'scan.book': 'Schedule pickup',
    'how.eyebrow': 'How it works',
    'how.title': 'Three steps. None complicated.',
    'step1.title': 'Take a photo',
    'step1.text': 'Open your phone. Photograph the item — metal, appliance, cable, old washing machine. Our AI identifies it instantly.',
    'step2.title': 'Get the price',
    'step2.text': 'See the real market value — not a made-up number. Transparent. If you agree, schedule the pickup.',
    'step3.title': 'We come. We pay.',
    'step3.text': 'A verified collector comes to your door within 24-48h. Weighs, verifies, pays on the spot. You win. Moldova wins.',
    'collect.eyebrow': 'What we collect',
    'collect.title': "If it has value, we want it.",
    'c1.t': 'Ferrous metals',
    'c1.d': 'Iron, steel, sheet metal, radiators, pipes, auto parts',
    'c2.t': 'Non-ferrous metals',
    'c2.d': 'Copper, brass, aluminum, lead, zinc — highest value',
    'c3.t': 'Appliances',
    'c3.d': 'Washing machines, fridges, stoves, air conditioners',
    'c4.t': 'Electronics',
    'c4.d': 'Computers, TVs, boards, cables, components',
    'c5.t': 'Auto & vehicles',
    'c5.d': 'Scrap cars, engines, batteries, catalytic converters, rims',
    'c6.t': 'Construction',
    'c6.d': 'Site debris, rebar, fittings, recoverable materials',
    'why.eyebrow': 'Why gunoi.md',
    'why.title': "First time anyone actually cares about your trash.",
    'why.body': 'Until now, getting rid of scrap metal in Moldova meant calling someone, haggling, hoping they don\'t cheat you on the scale. We do it differently: AI identifies the item, the price is public, the collector is verified and rated, payment happens on the spot. You\'re at no one\'s mercy.',
    'why.p1': 'Transparent price based on real market',
    'why.p2': 'Verified collectors, rated by other users',
    'why.p3': 'Payment on the spot — cash or bank transfer',
    'why.p4': 'EU-compliant documentation for companies',
    'why.p5': 'Track how much you recycled and earned',
    'impact.title': 'Estimated collective impact',
    'impact.unit': 'tons/year',
    'impact.desc': 'of metal currently sitting in yards and garages across Chișinău that can re-enter the real economy.',
    'impact.co2': '~ 4,800 tons CO₂ avoided',
    'col.eyebrow': 'For collectors',
    'col.title': 'Already in the business? The platform is for you too.',
    'col.body': "If you already collect scrap, appliances, or valuable waste — join the platform. We bring verified customers, manage your schedule, offer automated payments. No more Facebook ad headaches.",
    'col.cta': 'Become a partner collector',
    'wl.eyebrow': 'Launching soon',
    'wl.title': 'Be among the first to turn trash into money.',
    'wl.sub': 'First 500 users get a +10% bonus on their first pickup.',
    'wl.name': 'Your name',
    'wl.email': 'Email',
    'wl.phone': 'Phone (optional)',
    'wl.r1': 'I have trash to sell',
    'wl.r2': 'I am a collector',
    'wl.r3': 'I am a business',
    'wl.submit': 'Join waitlist',
    'wl.t1': '🔒 Zero spam',
    'wl.t2': '📍 Chișinău first',
    'wl.t3': '🇲🇩 Made in Moldova',
    'footer.tag': 'Your trash makes money. Let\'s get it out.',
    'footer.made': 'Built in Chișinău',
    'msg.success': "You're on the list. We'll write when we launch in your area.",
    'msg.error': 'Something went wrong. Please try again.',
    'msg.validation': 'Please fill in required fields.'
  }
};

let currentLang = 'ro';

function applyLang(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  // Toggle active labels
  const active = document.querySelector('[data-lang-active]');
  const inactive = document.querySelector('[data-lang-inactive]');
  if (active && inactive) {
    if (lang === 'ro') {
      active.textContent = 'RO';
      inactive.textContent = 'EN';
    } else {
      active.textContent = 'EN';
      inactive.textContent = 'RO';
    }
  }
  try { localStorage.setItem('gunoi_lang', lang); } catch (e) {}
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'ro' ? 'en' : 'ro');
});

// Initial language
(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('gunoi_lang'); } catch (e) {}
  if (saved && translations[saved]) {
    applyLang(saved);
  } else {
    // Default RO; detect browser EN
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    applyLang(browser === 'en' ? 'en' : 'ro');
  }
})();

// ---- Animated impact bar ----
const impactBar = document.getElementById('impactBar');
const impactNum = document.getElementById('impactTons');

function animateImpact() {
  if (!impactBar) return;
  impactBar.style.width = '72%';
  // Number count-up
  const target = 2400;
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    if (impactNum) impactNum.textContent = value.toLocaleString('ro-MD');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ---- Scroll reveal ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('impact-card')) {
        animateImpact();
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.step, .collect-item, .impact-card, .why-body, .why-points').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ---- Waitlist form ----
const form = document.getElementById('waitlistForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMessage.textContent = '';
  formMessage.className = 'form-message';

  const name = document.getElementById('wlName').value.trim();
  const email = document.getElementById('wlEmail').value.trim();
  const phone = document.getElementById('wlPhone').value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value || 'user';

  const dict = translations[currentLang];

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMessage.textContent = dict['msg.validation'];
    formMessage.classList.add('error');
    return;
  }

  // Save locally for now (Phase 1 — no backend)
  const payload = {
    name, email, phone, role,
    ts: new Date().toISOString(),
    lang: currentLang
  };

  try {
    const key = 'gunoi_waitlist';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(payload);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {}

  // TODO: Replace with real API endpoint (Formspree, Supabase, etc.)
  // Example:
  // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST', headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // });

  formMessage.textContent = dict['msg.success'];
  formMessage.classList.add('success');
  form.reset();
});
