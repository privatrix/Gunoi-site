# Fonts

Self-hosted, subset WOFF2 files in `assets/fonts/` (all SIL Open Font License):
Unbounded 800, Onest 400/500/700, JetBrains Mono 500/700 — each split into
`-lat` (Basic Latin, Latin-1, Romanian ĂăȘșȚț, punctuation) and `-cyr` (Russian Cyrillic).
Caveat 700 (`caveat-700-notes.woff2`) holds only the glyphs used in the hand-written notes
(`pages.home.tryNote`, `pages.home.crew.caption`); `tests/build.test.js` checks they still fit.

Regenerate with fontTools from the Google Fonts TTFs:

    python3 -m fontTools.subset Font.ttf --flavor=woff2 \
      --unicodes="U+0020-007E,U+00A0-00FF,U+0102-0103,U+015E-015F,U+0162-0163,U+0218-021B,U+2013-2014,U+2018-201E,U+2022,U+2026,U+2039-203A,U+2116,U+2190-2193,U+2212" \
      --layout-features='kern,liga,calt,ccmp,locl,mark,mkmk' --output-file=name-lat.woff2
    # Cyrillic: --unicodes="U+0400-045F,U+0490-0491"
    # Caveat:   --text="<all characters of the notes>"
