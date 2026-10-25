// Inline SVG icons, drawn for gunoi.md. Stroke icons use currentColor.
const s = (body, vb = '0 0 24 24') =>
  `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  phone: s('<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  whatsapp: s('<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1Z"/><path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.6-2-1.2-1 .9c-1.2-.5-2.2-1.5-2.7-2.7l.9-1-1.2-2Z" stroke-width="1.6"/>'),
  camera: s('<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6H7l1.6-2h6.8L17 6h1.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"/><circle cx="12" cy="13" r="3.8"/>'),
  receipt: s('<path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21Z"/><path d="M9 8h6M9 12h6M9 16h3"/>'),
  check: s('<path d="m4 12.5 5 5L20 6.5"/>'),
  cross: s('<path d="M6 6l12 12M18 6 6 18"/>'),
  truck: s('<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3.2v2.8h-7z"/><circle cx="6.5" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>'),
  sofa: s('<path d="M4 11V8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5V11"/><path d="M2.5 13a2 2 0 0 1 4 0v1.5h11V13a2 2 0 0 1 4 0v5h-19ZM5 18v2M19 18v2"/>'),
  bricks: s('<path d="M3 5h18v14H3zM3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M9 14.3V19"/>'),
  home: s('<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5M10 20v-5.5h4V20"/>'),
  people: s('<circle cx="8" cy="7.5" r="3"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M13.5 15.2A4.5 4.5 0 0 1 21 18.5V20"/>'),
  plane: s('<path d="M21 4 3 11l6.5 2.5L12 20l3-5.5L21 4Z"/><path d="m9.5 13.5 5.5-4"/>'),
  clock: s('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  card: s('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'),
  pin: s('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>'),
  mail: s('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  // hand-drawn curved arrow (for the "încearcă" note)
  scribbleArrow: `<svg viewBox="0 0 60 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 6c10 2 22 6 28 15s8 15 6 21"/><path d="M30 36.5 38.5 43l5.5-9.5"/></svg>`,
};
