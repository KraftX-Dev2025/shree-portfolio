/* The buddy: the twin as a roaming mascot. It wanders the screen, picks a random mood every few seconds,
   follows the cursor with its eyes, dodges now and then, and opens a chat when clicked.
   Talks with the same brain as the home-page twin: /api/twin first, then the scripted answers in data.js. */
(() => {
  if (window.__buddy) return; window.__buddy = true;
  const T = window.TWIN || { greeting: "I'm Shree's twin.", intents: [], fallback: "Not in my memory yet." };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const INK = "#1a1033", W = () => innerWidth, H = () => innerHeight;
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} } };

  const LINES = [
    "Psst.", "Click me. Or don't.", "Ask me about the walking robot.", "I've read the diary. All of it.",
    "54 products. I counted.", "Bored. Ask me something.", "Roast? One click.", "Chal, baat karte hain.",
    "I'm the twin. The better-rested one.", "Still scrolling?", "Kaam ki baat karein?", "I know where the 3 AM welding stories are.",
    "Hiring? Investing? Click.", "Click me. I'm the interesting one.", "He's shipped 54 things. I counted.",
    "This page has more projects than he has sleep.", "Dupari 1 te 4 me pan zopto."
  ];
  const DODGE = ["Nope.", "Too slow.", "Personal space.", "Arre, aaram se."];
  const DRAG = ["Rude.", "Put me down.", "Okay, new spot. Fine."];
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  /* ---------- styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
  #buddy { position: fixed; left: 0; top: 0; z-index: 2147483000; width: 76px; height: 82px; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none;
    transition: transform var(--bd, 1.4s) cubic-bezier(.45,.05,.3,1), opacity .4s; will-change: transform; }
  #buddy.off { opacity: 0; pointer-events: none; }
  #buddy.dragging { transition: opacity .4s; cursor: grabbing; }
  #buddy .bd-flip { width: 100%; height: 100%; transition: transform .25s; }
  #buddy.left .bd-flip { transform: scaleX(-1); }
  #buddy .bd-body { width: 100%; height: 100%; transform-origin: 50% 100%; animation: bd-breathe 3s ease-in-out infinite; }
  #buddy.walk .bd-body { animation: bd-waddle .32s ease-in-out infinite alternate; }
  #buddy.hop .bd-body { animation: bd-hop .6s cubic-bezier(.3,0,.4,1) 2; }
  #buddy.spin .bd-body { animation: bd-spin .8s cubic-bezier(.5,0,.3,1) 1; }
  #buddy.wiggle .bd-body { animation: bd-wiggle .18s ease-in-out 8 alternate; }
  #buddy.wave #bd-armR { animation: bd-wave .35s ease-in-out infinite alternate; }
  #buddy svg { width: 100%; height: 100%; overflow: visible; display: block; filter: drop-shadow(0 6px 18px rgba(139,92,246,.45)); }
  #bd-armL, #bd-armR { transform-box: fill-box; transform-origin: 50% 12%; transition: transform .3s; }
  #bd-armL { transform: rotate(20deg); } #bd-armR { transform: rotate(-20deg); }
  #buddy.pushup .bd-body { animation: bd-push .5s ease-in-out 4 alternate; }
  #buddy.wobble .bd-body { animation: bd-wiggle .12s ease-in-out 4 alternate; }
  .bd-prop { position: fixed; z-index: 2147482999; pointer-events: none; transition: transform 1.6s cubic-bezier(.2,.6,.3,1), opacity 1.6s; }
  @keyframes bd-push { from { transform: scale(1,1); } to { transform: translateY(10px) scale(1.12,.8); } }
  @keyframes bd-breathe { 50% { transform: scale(1.03, .97); } }
  @keyframes bd-waddle { from { transform: rotate(-7deg) translateY(0); } to { transform: rotate(7deg) translateY(-3px); } }
  @keyframes bd-hop { 0%,100% { transform: translateY(0) scale(1,1); } 15% { transform: translateY(0) scale(1.1,.88); } 50% { transform: translateY(-38px) scale(.94,1.06); } 85% { transform: translateY(0) scale(1.08,.9); } }
  @keyframes bd-spin { to { transform: rotate(360deg); } }
  @keyframes bd-wiggle { from { transform: rotate(-9deg); } to { transform: rotate(9deg); } }
  @keyframes bd-wave { from { transform: rotate(-150deg); } to { transform: rotate(-110deg); } }
  #bd-say { position: fixed; z-index: 2147483001; max-width: 220px; background: var(--paper, #eeeae2); color: var(--ink, #07080c); font: 600 13px/1.3 var(--body, system-ui);
    padding: 8px 12px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,.45); pointer-events: none; opacity: 0; transform: translateY(6px); transition: opacity .2s, transform .2s; white-space: nowrap; }
  #bd-say.on { opacity: 1; transform: none; }
  #bd-chat { position: fixed; z-index: 2147483002; right: max(16px, env(safe-area-inset-right, 0px)); bottom: max(16px, calc(env(safe-area-inset-bottom, 0px) + 16px));
    width: min(360px, calc(100vw - 32px)); height: min(480px, calc(100vh - 120px)); display: none; flex-direction: column; overflow: hidden;
    background: var(--panel, #10121a); border: 1px solid var(--line, #252839); border-radius: 18px; box-shadow: 0 24px 60px rgba(0,0,0,.6); color: var(--paper, #eeeae2); }
  #bd-chat.on { display: flex; }
  #bd-chat .bd-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid var(--line, #252839); }
  #bd-chat .bd-head .av { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #f0d2f8, #b48ff0 55%, #7d55e6); box-shadow: 0 0 14px rgba(139,92,246,.6); flex: none; }
  #bd-chat .bd-head b { font: 600 14px var(--body, system-ui); display: block; }
  #bd-chat .bd-head small { font: 11px var(--mono, monospace); color: var(--mute, #8d91a4); }
  #bd-chat .bd-head button { margin-left: auto; background: none; border: 0; color: var(--mute, #8d91a4); font: 12px var(--mono, monospace); letter-spacing: .08em; text-transform: uppercase; cursor: pointer; padding: 6px; }
  #bd-chat .bd-head button:hover { color: var(--paper, #eeeae2); }
  #bd-log { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
  #bd-log .m { max-width: 85%; padding: 9px 12px; border-radius: 14px; font: 14px/1.45 var(--body, system-ui); }
  #bd-log .t { background: #181b27; align-self: flex-start; border-bottom-left-radius: 4px; }
  #bd-log .u { background: var(--diamond, #9b8cff); color: var(--ink, #07080c); align-self: flex-end; border-bottom-right-radius: 4px; }
  #bd-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 14px 10px; }
  #bd-chips button { font: 11px var(--mono, monospace); color: var(--mute, #8d91a4); background: none; border: 1px solid var(--line, #252839); border-radius: 999px; padding: 6px 10px; cursor: pointer; }
  #bd-chips button:hover { color: var(--paper, #eeeae2); border-color: #3a3e55; }
  #bd-form { display: flex; gap: 8px; padding: 10px 12px 12px; border-top: 1px solid var(--line, #252839); }
  #bd-form input { flex: 1; min-width: 0; background: var(--ink, #07080c); color: var(--paper, #eeeae2); border: 1px solid var(--line, #252839); border-radius: 999px; padding: 10px 14px; font: 14px var(--body, system-ui); }
  #bd-form input:focus { outline: none; border-color: var(--diamond, #9b8cff); }
  #bd-form button { background: var(--diamond, #9b8cff); color: var(--ink, #07080c); border: 0; border-radius: 999px; padding: 0 16px; font: 600 13px var(--body, system-ui); cursor: pointer; }
  #bd-dismiss { color: var(--mute, #8d91a4); }
  #bd-back { position: fixed; z-index: 2147483000; right: max(16px, env(safe-area-inset-right, 0px)); bottom: max(16px, calc(env(safe-area-inset-bottom, 0px) + 16px)); width: 18px; height: 18px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
    background: linear-gradient(135deg, #f0d2f8, #b48ff0 55%, #7d55e6); box-shadow: 0 0 14px rgba(139,92,246,.7); display: none; }
  #bd-back.on { display: block; }
  #bd-back:hover { transform: scale(1.2); }
  @media (max-width: 600px) { #buddy { width: 60px; height: 65px; } }
  @media (prefers-reduced-motion: reduce) { #buddy, #buddy .bd-body { transition: opacity .2s !important; animation: none !important; } }`;
  document.head.append(css);

  /* ---------- the character (same family as the kid on the crate) ---------- */
  const el = document.createElement("div");
  el.id = "buddy"; el.setAttribute("role", "button"); el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", "Talk to Shree's twin");
  el.innerHTML = `<div class="bd-flip"><div class="bd-body"><svg viewBox="-58 -160 116 125">
    <defs><linearGradient id="bdBlob" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0d2f8"/><stop offset=".55" stop-color="#b48ff0"/><stop offset="1" stop-color="#7d55e6"/></linearGradient></defs>
    <rect id="bd-armL" x="-50" y="-112" width="16" height="32" rx="8" fill="#9f78ec"/>
    <rect id="bd-armR" x="34" y="-112" width="16" height="32" rx="8" fill="#9f78ec"/>
    <ellipse cx="-15" cy="-50" rx="11" ry="7" fill="#7d55e6"/><ellipse cx="15" cy="-50" rx="11" ry="7" fill="#7d55e6"/>
    <rect x="-42" y="-152" width="84" height="102" rx="40" fill="url(#bdBlob)"/>
    <path d="M-28 -136 q10 -10 24 -10" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round" fill="none"/>
    <rect x="-4.5" y="-70" width="9" height="9" fill="#9b8cff" transform="rotate(45 0 -65.5)"/>
    <g id="bd-face"></g>
    <g fill="none" stroke="${INK}" stroke-width="2.2" opacity=".85"><rect x="-28" y="-125" width="26" height="25" rx="10"/><rect x="2" y="-125" width="26" height="25" rx="10"/><path d="M-2 -113 h4"/></g>
    <g id="bd-zz" opacity="0" font-family="JetBrains Mono, monospace" font-weight="600" fill="#b48ff0"><text x="34" y="-150" font-size="14">z</text><text x="44" y="-164" font-size="18">Z</text></g>
  </svg></div></div>`;
  document.body.append(el);
  const say = document.createElement("div"); say.id = "bd-say"; document.body.append(say);

  /* faces */
  const eye = (x, y, o = {}) => `<ellipse cx="${x}" cy="${y}" rx="${o.rx || 9.5}" ry="${o.ry || 10.5}" fill="#fff"/><circle class="bd-pupil" cx="${x}" cy="${y + 1.5}" r="${o.pr || 5.4}" fill="${INK}"/><circle class="bd-shine" cx="${x - 2}" cy="${y - .7}" r="1.8" fill="#fff"/>`
    + (o.lid ? `<path d="M${x - 11} ${y - 12} h22 v${o.lid} q-11 4 -22 0 z" fill="#b48ff0"/>` : "");
  const ln = (d, w = 4) => `<path d="${d}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  const arc = (x, y, up = true) => ln(`M${x - 8} ${y + (up ? 3 : -2)} q8 ${up ? -10 : 9} 16 0`);
  const FACES = {
    idle: () => eye(-15, -112) + eye(15, -112) + ln("M-24 -130 L-8 -131", 3.5) + ln("M8 -131 L24 -130", 3.5) + ln("M-11 -91 q11 8 22 0"),
    smug: () => eye(-15, -112, { lid: 10 }) + eye(15, -112, { lid: 10 }) + ln("M-25 -128 L-7 -123") + ln("M7 -123 L25 -128") + ln("M-16 -93 q16 11 32 0"),
    happy: () => arc(-15, -112) + arc(15, -112) + ln("M-14 -93 q14 12 28 0"),
    shock: () => eye(-15, -112, { rx: 11, ry: 12, pr: 3.6 }) + eye(15, -112, { rx: 11, ry: 12, pr: 3.6 }) + ln("M-25 -133 L-9 -136", 3.5) + ln("M9 -136 L25 -133", 3.5) + `<ellipse cx="0" cy="-87" rx="6" ry="8" fill="#3b1446"/>`,
    sleep: () => arc(-15, -110, false) + arc(15, -110, false) + ln("M-6 -90 q6 4 12 0", 3),
    wink: () => arc(-15, -112) + eye(15, -112) + ln("M8 -129 L24 -126") + ln("M-14 -93 q14 11 28 0"),
    blink: () => ln("M-23 -111 h16 M7 -111 h16") + ln("M-11 -91 q11 8 22 0")
  };
  const faceEl = el.querySelector("#bd-face"), zz = el.querySelector("#bd-zz");
  let mood = "idle";
  const face = (m) => { mood = m; faceEl.innerHTML = FACES[m](); zz.setAttribute("opacity", m === "sleep" ? "1" : "0"); };
  face("idle");

  /* ---------- position + movement ---------- */
  let x = W() - 110, y = H() - 130, busy = false, chatOpen = false, hidden = false, dragging = false;
  const size = () => el.getBoundingClientRect();
  const clamp = () => { const r = size(); x = Math.max(8, Math.min(W() - r.width - 8, x)); y = Math.max(70, Math.min(H() - r.height - 8, y)); };
  const place = (dur = 0) => { el.style.setProperty("--bd", dur + "s"); el.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
  clamp(); place(0);
  const flash = (cls, ms) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };
  const talk = (t, ms = 2600) => {
    say.textContent = t; const r = size(); say.classList.add("on");
    const sw = say.offsetWidth; let sx = r.left + r.width / 2 - sw / 2; sx = Math.max(8, Math.min(W() - sw - 8, sx));
    say.style.left = sx + "px"; say.style.top = Math.max(8, r.top - 42) + "px";
    clearTimeout(talk.t); talk.t = setTimeout(() => say.classList.remove("on"), ms);
  };
  const moveTo = (nx, ny, speed = 260) => new Promise((res) => {
    const d = Math.hypot(nx - x, ny - y); if (d < 4) return res();
    el.classList.toggle("left", nx < x); el.classList.add("walk");
    x = nx; y = ny; clamp(); const dur = reduce ? 0 : Math.min(3.2, Math.max(.45, d / speed)); place(dur);
    setTimeout(() => { el.classList.remove("walk"); res(); }, dur * 1000 + 30);
  });
  /* stay in the side gutters and the lower half so reading isn't blocked */
  /* never leave him outside the viewport (after a peek, a resize or a drag) */
  const keepOnScreen = () => { const ox = x, oy = y; clamp(); if (ox !== x || oy !== y) place(.6); };
  const randomSpot = () => {
    if (matchMedia("(max-width: 600px)").matches) return [16 + Math.random() * (W() - 90), H() - 90 - Math.random() * 60];
    const leftBand = Math.random() < .35, bx = leftBand ? 16 + Math.random() * Math.max(10, W() * .14) : W() * .74 + Math.random() * (W() * .26 - 100);
    return [bx, H() * .45 + Math.random() * (H() * .55 - 110)];
  };

  /* eyes follow the pointer */
  let px = W() / 2, py = H() / 2, lastMove = Date.now();
  addEventListener("pointermove", (e) => {
    const speed = Math.hypot(e.clientX - px, e.clientY - py); px = e.clientX; py = e.clientY; lastMove = Date.now();
    const r = size(), cx = r.left + r.width / 2, cy = r.top + r.height * .45, dx = px - cx, dy = py - cy, dist = Math.hypot(dx, dy) || 1;
    const flip = el.classList.contains("left") ? -1 : 1;
    el.querySelectorAll(".bd-pupil, .bd-shine").forEach((p) => p.setAttribute("transform", `translate(${(dx / dist) * 3 * flip} ${(dy / dist) * 3})`));
    if (mood === "sleep" && dist < 110) { face("shock"); talk("Main jaag raha tha.", 1500); setTimeout(() => mood === "shock" && face("idle"), 900); }
    // dodge a fast-approaching cursor now and then
    if (!busy && !chatOpen && !dragging && !hidden && !inScene && dist < 70 && speed > 24 && Math.random() < .35) {
      busy = true; face("shock"); talk(pick(DODGE), 1400);
      moveTo(x - Math.sign(dx) * (120 + Math.random() * 80), y - Math.sign(dy) * 60, 900).then(() => { face("smug"); busy = false; });
    }
  }, { passive: true });

  /* ---------- random behaviour ---------- */
  const napTime = () => { const h = new Date().getHours(); return h >= 13 && h < 16; };
  const ACTS = [
    [5, async () => { const [a, b] = randomSpot(); face("idle"); await moveTo(a, b); }, 0],
    [2, async () => { face("happy"); flash("hop", 1250); await wait(1300); }],
    [1, async () => { face("smug"); flash("spin", 850); await wait(900); }],
    [2, async () => { face("idle"); flash("wiggle", 1500); talk(pick(LINES)); await wait(1600); }],
    [3, async () => { face(pick(["smug", "idle", "wink"])); el.classList.add("wave"); talk(pick(LINES)); await wait(2400); el.classList.remove("wave"); }],
    [2, async () => { // come over and ask for attention (heavy on mobile)
      const r = size(); const tx = px - r.width / 2 + (px > W() / 2 ? -90 : 90); face("idle"); await moveTo(tx, py - r.height / 2, 320);
      face("wink"); el.classList.add("wave"); talk(pick(["Hi.", "Psst.", "Click me.", "Ek minute?"])); await wait(2000); el.classList.remove("wave"); }, 1],
    [2, async () => { // peek from an edge
      const r = size(), side = Math.random() < .5; face("idle"); await moveTo(side ? -r.width * .55 : W() - r.width * .45, H() * (.35 + Math.random() * .45), 400);
      x = side ? -r.width * .55 : W() - r.width * .45; place(.3); el.classList.toggle("left", !side); await wait(2200); face("wink"); talk("Peekaboo. Fine, that one was childish.", 2200); await wait(2300); const [a, b] = randomSpot(); await moveTo(a, b); }, 1],
    [napTime() ? 6 : 1, async () => { face("sleep"); talk(napTime() ? "Dupari 1 te 4. Do not disturb." : "Five minutes.", 2400); await wait(5000); face("idle"); }],
    [2, async () => { for (let i = 0; i < 3; i++) { const [a, b] = randomSpot(); await moveTo(a, b, 700); } face("smug"); talk("Cardio.", 1600); }, 1],
    [2, async () => { face("smug"); flash("pushup", 2100); await wait(2150); talk(pick(["Twenty. Ish.", "75 Hard, day one.", "Gym since 2018. Me since today."]), 1800); await wait(1800); }],
    [2, async () => { // throw a paper crane
      face("happy"); el.classList.add("wave"); const r = size(), c = prop(`<svg width="34" height="24" viewBox="0 0 40 28"><path d="M0 18 l20 -16 l-5 17 l20 2 l-24 7 z" fill="#eeeae2"/><path d="M20 2 l-5 17 l-15 -1 z" fill="#c9c6bf"/></svg>`, r.left + r.width * .7, r.top + 10);
      requestAnimationFrame(() => { const dir = r.left > W() / 2 ? -1 : 1; c.style.transform = `translate(${dir * (220 + Math.random() * 200)}px, ${-120 - Math.random() * 120}px) rotate(${dir * 25}deg)`; c.style.opacity = "0"; });
      talk("Origami. Since 1998.", 1800); await wait(1700); el.classList.remove("wave"); c.remove(); }],
    [1, async () => { // mic drop
      face("smug"); const r = size(), m = prop(`<svg width="14" height="30" viewBox="0 0 14 30"><rect x="4" y="10" width="6" height="20" rx="3" fill="#20232f"/><circle cx="7" cy="7" r="7" fill="#8d91a4"/></svg>`, r.left + r.width - 6, r.top + r.height * .35);
      talk("That's my set.", 1600); await wait(900); m.style.transform = `translateY(${H() - r.top}px) rotate(40deg)`; m.style.opacity = "0"; await wait(1300); m.remove(); }]
  ];
  function prop(svg, left, top) { const p = document.createElement("div"); p.className = "bd-prop"; p.innerHTML = svg; p.style.left = left + "px"; p.style.top = top + "px"; document.body.append(p); return p; }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const mobile = matchMedia("(max-width: 600px)").matches;
  let lastAct = -1;
  const weighted = () => {
    const pool = ACTS.map((a, i) => [i, mobile && a[2] ? a[0] * .2 : a[0]]).filter(([i]) => i !== lastAct);
    const tot = pool.reduce((s, a) => s + a[1], 0); let n = Math.random() * tot;
    for (const [i, w] of pool) { if ((n -= w) < 0) { lastAct = i; return ACTS[i][1]; } } lastAct = pool[0][0]; return ACTS[pool[0][0]][1];
  };
  let blinkT;
  const blink = () => { if (mood === "idle" && !busy) { faceEl.innerHTML = FACES.blink(); setTimeout(() => mood === "idle" && face("idle"), 130); } blinkT = setTimeout(blink, 2500 + Math.random() * 3500); };
  blink();
  const loop = async () => {
    if (!busy && !dragging && !chatOpen) keepOnScreen();
    if (!busy && !chatOpen && !dragging && !hidden && !inScene && !document.hidden) {
      busy = true;
      try {
        if (Date.now() - lastMove > 25000 && Math.random() < .5) { face("happy"); flash("hop", 1250); talk("Still there?"); await wait(1500); }
        else if (!reduce) await weighted()();
        else { face(pick(["idle", "smug", "wink"])); talk(pick(LINES)); await wait(2500); }
      } catch {}
      busy = false;
    }
    setTimeout(loop, 2600 + Math.random() * 4200);
  };
  setTimeout(loop, 2500);
  setTimeout(() => { if (!chatOpen && !hidden) { face("wink"); el.classList.add("wave"); talk("Psst. I'm the twin. Click me."); setTimeout(() => el.classList.remove("wave"), 2200); } }, 1800);

  /* step aside while the story scene (where he sits on the crate) is on screen */
  const scene = document.getElementById("scroller");
  /* during the story scene he doesn't vanish: he parks in the corner and watches his sibling on the crate */
  let inScene = false;
  if (scene && "IntersectionObserver" in window) {
    const steps = Array.from({ length: 41 }, (_, i) => i / 40);
    new IntersectionObserver(([e]) => {
      const now = e.intersectionRect.height > innerHeight * .6;
      if (now === inScene) return; inScene = now;
      if (inScene && !chatOpen && !dismissed) { say.classList.remove("on"); const b = size(); face("smug"); moveTo(W() - b.width - 16, H() - b.height - 16, 500); }
    }, { threshold: steps }).observe(scene);
  }
  addEventListener("resize", () => { clamp(); place(0); });
  let lastY = scrollY, lastT = 0;
  addEventListener("scroll", () => { const now = Date.now(), v = Math.abs(scrollY - lastY) / Math.max(16, now - lastT); lastY = scrollY; lastT = now;
    if (v > 3 && !busy && !chatOpen && !hidden && !inScene && !reduce) { flash("wobble", 500); if (Math.random() < .15) talk("Slow down. There's reading here.", 1800); } }, { passive: true });

  /* ---------- drag vs click ---------- */
  let down = null;
  el.addEventListener("pointerdown", (e) => { down = { sx: e.clientX, sy: e.clientY, ox: x, oy: y, moved: false }; el.setPointerCapture(e.pointerId); });
  el.addEventListener("pointermove", (e) => {
    if (!down) return; const dx = e.clientX - down.sx, dy = e.clientY - down.sy;
    if (!down.moved && Math.hypot(dx, dy) > 6) { down.moved = true; dragging = true; el.classList.add("dragging"); face("shock"); }
    if (down.moved) { x = down.ox + dx; y = down.oy + dy; clamp(); place(0); }
  });
  el.addEventListener("pointerup", () => {
    if (!down) return; const moved = down.moved; down = null;
    if (moved) { dragging = false; el.classList.remove("dragging"); face("smug"); talk(pick(DRAG), 1600); }
    else openChat();
  });
  el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openChat(); } });

  /* ---------- chat (same brain as the home-page twin) ---------- */
  const chat = document.createElement("div");
  chat.id = "bd-chat"; chat.setAttribute("role", "dialog"); chat.setAttribute("aria-label", "Chat with Shree's twin");
  chat.innerHTML = `<div class="bd-head"><span class="av"></span><div><b>Shree's twin</b><small id="bd-status">online</small></div><button type="button" id="bd-dismiss" title="Hide him for this visit">Hide him</button><button type="button" id="bd-close" aria-label="Close chat">Close</button></div>
    <div id="bd-log" aria-live="polite"></div><div id="bd-chips"></div>
    <form id="bd-form" autocomplete="off"><input id="bd-in" placeholder="Ask about KraftX, Robocon, stand-up…" maxlength="400" aria-label="Message"><button type="submit">Send</button></form>`;
  document.body.append(chat);
  const log = chat.querySelector("#bd-log"), inp = chat.querySelector("#bd-in"), history = [];
  let api = true, greeted = false;
  const add = (who, text) => { const d = document.createElement("div"); d.className = "m " + who; d.textContent = text; log.append(d); log.scrollTop = log.scrollHeight; return d; };
  const local = (q) => { const s = q.toLowerCase(); const hit = (T.intents || []).find((it) => it.k.some((k) => s.includes(k))); return hit ? hit.a : T.fallback; };
  const ask = async (q) => {
    add("u", q); history.push({ role: "user", content: q }); const typing = add("t", "…"); let reply = null;
    if (api) {
      try {
        const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 15000);
        const r = await fetch("/api/twin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-12) }), signal: ctl.signal });
        clearTimeout(to); if (r.ok || r.status === 429) reply = (await r.json()).reply; else api = false;
      } catch { api = false; }
      if (!api) chat.querySelector("#bd-status").textContent = "scripted answers";
    }
    if (!reply) { await wait(450 + Math.random() * 500); reply = local(q); }
    typing.remove(); add("t", reply); history.push({ role: "assistant", content: reply });
  };
  chat.querySelector("#bd-chips").innerHTML = ["What is KraftX?", "The walking robot", "Roast me"].map((c) => `<button type="button">${c}</button>`).join("");
  chat.querySelector("#bd-chips").addEventListener("click", (e) => { if (e.target.tagName === "BUTTON") ask(e.target.textContent === "The walking robot" ? "Tell me about Robocon" : e.target.textContent); });
  chat.querySelector("#bd-form").addEventListener("submit", (e) => { e.preventDefault(); const q = inp.value.trim(); if (!q) return; inp.value = ""; ask(q); });
  function openChat() {
    chatOpen = true; chat.classList.add("on"); say.classList.remove("on"); face("happy"); flash("hop", 1250);
    if (!greeted) { greeted = true; add("t", T.greeting); }
    const r = chat.getBoundingClientRect(), b = size();
    if (r.left > b.width + 16) { x = r.left - b.width - 6; y = r.bottom - b.height; } else { x = r.right - b.width - 8; y = r.top - b.height + 10; }
    clamp(); place(.6);
    if (matchMedia("(hover: hover)").matches) setTimeout(() => inp.focus({ preventScroll: true }), 200);
  }
  const closeChat = () => { chatOpen = false; chat.classList.remove("on"); face("smug"); talk("Come back.", 1500); };
  chat.querySelector("#bd-close").onclick = closeChat;
  let dismissed = false;
  const pill = document.createElement("button");
  pill.id = "bd-back"; pill.type = "button"; pill.setAttribute("aria-label", "Bring Shree's twin back"); pill.title = "Bring him back";
  document.body.append(pill);
  const setDismissed = (v) => {
    dismissed = hidden = v; el.classList.toggle("off", v); pill.classList.toggle("on", v); store.set("buddy-hidden", v ? "1" : "0");
    if (v) say.classList.remove("on"); else { face("wink"); flash("hop", 1250); talk("Missed me.", 1600); }
  };
  chat.querySelector("#bd-dismiss").onclick = () => { closeChat(); setDismissed(true); };
  pill.onclick = () => setDismissed(false);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && chatOpen) closeChat(); });
  if (store.get("buddy-hidden") === "1") setDismissed(true);
})();
