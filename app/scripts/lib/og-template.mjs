/**
 * Social card markup.
 *
 * Colours, fonts and the body wash are the site's own dark-theme tokens from
 * src/index.css. If those change, change them here too — a card that no longer
 * looks like the site is worse than no card.
 */

const T = {
  bg: "#000000",
  fg: "#f5f5f7",
  muted: "#a1a1a6",
  accent: "#2997ff",
  sans: `'SF Pro Display','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif`,
  text: `'SF Pro Text','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif`,
  mono: `'SF Mono','JetBrains Mono',monospace`,
  serif: `'New York','Iowan Old Style','Palatino Linotype',Palatino,Georgia,ui-serif,serif`,
}

const esc = (value) =>
  String(value)
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/'/gu, "\u2019")
    .replace(/"([^"]*)"/gu, "\u201c$1\u201d")

const BACKDROP = `
  background-color:${T.bg};
  background-image:
    radial-gradient(ellipse at 14% 4%, rgba(41,151,255,0.14), transparent 62%),
    radial-gradient(ellipse at 86% 12%, rgba(94,92,230,0.12), transparent 58%),
    radial-gradient(ellipse at 46% 96%, rgba(48,209,88,0.06), transparent 60%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.35' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.11' fill='white'/%3E%3C/svg%3E");
`

const FOOTER = `<div class="foot">
  <span class="name">Kousik Dutta</span><span class="dot">&middot;</span>
  <span class="role">Product Designer &amp; UX Engineer</span>
  <span class="url">kousikdutta.com</span>
</div>`

const shell = (body, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{${BACKDROP}color:${T.fg};font-family:${T.sans};-webkit-font-smoothing:antialiased;
       display:flex;flex-direction:column;justify-content:space-between;padding:76px 84px;overflow:hidden}
  .h{letter-spacing:-0.045em;font-weight:700;text-wrap:balance}
  .h em{font-family:${T.serif};font-style:italic;font-weight:650;letter-spacing:-0.055em}
  .rule{width:64px;height:3px;background:${T.accent};border-radius:2px}
  .kick{font-family:${T.mono};font-size:23px;letter-spacing:0.14em;text-transform:uppercase;color:${T.accent}}
  .foot{display:flex;align-items:center}
  .name{font-family:${T.text};font-size:30px;font-weight:600;letter-spacing:-0.01em}
  .role{font-family:${T.text};font-size:30px;font-weight:400;color:${T.muted};letter-spacing:-0.01em}
  .dot{color:${T.muted};padding:0 12px}
  .url{margin-left:auto;font-family:${T.mono};font-size:24px;color:${T.muted};letter-spacing:0.01em}
  ${extra}
</style></head><body>${body}</body></html>`

/** The homepage card: the hero line plus the claim the build actually enforces. */
export const homeCard = () =>
  shell(
    `<div><div class="rule"></div></div>
     <div>
       <div class="h" style="font-size:92px;line-height:0.98">Thinking <em>becomes</em><br>product.</div>
       <div class="claim">This site fails its own build if text contrast drops below 4.5:1.</div>
     </div>
     ${FOOTER}`,
    `.claim{margin-top:34px;font-family:${T.text};font-size:31px;line-height:1.44;color:${T.fg};
      max-width:760px;letter-spacing:-0.011em;opacity:.9;text-wrap:balance;
      border-left:3px solid ${T.accent};padding-left:26px}`
  )

/** Title card. Type steps down as the title lengthens so it never clips. */
export const titleCard = ({ title, kicker }) => {
  const n = title.length
  const size = n <= 34 ? 88 : n <= 48 ? 78 : n <= 64 ? 68 : n <= 82 ? 58 : 50
  return shell(
    `<div class="kick">${esc(kicker)}</div>
     <div class="h" style="font-size:${size}px;line-height:1.06;max-width:1010px">${esc(title)}</div>
     ${FOOTER}`
  )
}

export const renderCard = (spec) => (spec.kind === "home" ? homeCard() : titleCard(spec))
