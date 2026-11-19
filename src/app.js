(() => {
const S = window.SITE, $ = (s) => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= HERO ================= */
$("#hero-eyebrow").textContent = S.tagline;
$("#tagline").textContent = S.headline || S.tagline;
$("#intro").textContent = S.intro;
$("#socials").innerHTML = S.socials.filter((s) => s.href && s.href !== "#").map((s) => `<a href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`).join(" · ");

/* ================= PROOF STRIP (numbers derived from the projects data) ================= */
if (window.VENTURES) {
  const V = window.VENTURES, inds = new Set(V.map((v) => v.industry));
  const stats = [
    [V.length, "Projects shipped", "projects.html"],
    [inds.size, "Industries", "projects.html"],
    [V.filter((v) => v.type === "venture" && v.href).length, "Ventures live", "projects.html"],
    [250, "People held 19 min on stage", ""]
  ];
  $("#proof").innerHTML = stats.map(([n, l, h]) => h ? `<a href="${h}"><b>${n}</b><span>${l}</span></a>` : `<div><b>${n}</b><span>${l}</span></div>`).join("");
}

if (S.showreel) {
  const v = document.createElement("video");
  Object.assign(v, { src: S.showreel, autoplay: true, muted: true, loop: true, playsInline: true });
  $("#reel").replaceWith(v);
} else {
  // Placeholder reel: drifting blue diamonds and film frames until the real video lands.
  const c = $("#reel"), x = c.getContext("2d");
  let W, H, parts = [];
  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    parts = Array.from({ length: Math.round(W / 45) }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * .9 + .1, r: Math.random() * Math.PI }));
  };
  size(); addEventListener("resize", size);
  const words = S.ticker;
  const frame = (t) => {
    x.fillStyle = "#07080c"; x.fillRect(0, 0, W, H);
    const g = x.createRadialGradient(W * .7 + Math.sin(t / 4000) * 120, H * .35, 10, W * .7, H * .35, W * .6);
    g.addColorStop(0, "rgba(90,169,255,.16)"); g.addColorStop(1, "rgba(7,8,12,0)");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    for (const p of parts) {
      p.y -= p.z * .4; p.r += .01 * p.z; if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      x.save(); x.translate(p.x, p.y); x.rotate(Math.PI / 4 + Math.sin(p.r) * .3);
      x.fillStyle = `rgba(90,169,255,${.08 + p.z * .3})`; const s = 1.5 + p.z * 3; x.fillRect(-s / 2, -s / 2, s, s); x.restore();
    }
    if (!reduce) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ================= MEMORY GRAPH ================= */
(() => {
  const cv = $("#graph"), ctx = cv.getContext("2d");
  const byId = {}, kids = {};
  for (const n of window.GRAPH) { byId[n.id] = { ...n, x: 0, y: 0, vx: 0, vy: 0, depth: 0 }; (kids[n.parent] ||= []).push(n.id); }
  for (const n of Object.values(byId)) { let d = 0, p = n.parent; while (p) { d++; p = byId[p].parent; } n.depth = d; }
  const vis = new Set(), open = new Set();
  let W = 0, H = 0, cam = { x: 0, y: 0, k: 1 }, sel = "shree", hover = null, heat = 1;

  const show = (id, near) => { if (vis.has(id)) return; const n = byId[id]; const a = Math.random() * Math.PI * 2; n.x = (near ? near.x : 0) + Math.cos(a) * 30; n.y = (near ? near.y : 0) + Math.sin(a) * 30; n.vx = n.vy = 0; vis.add(id); };
  const expand = (id) => { open.add(id); for (const c of kids[id] || []) show(c, byId[id]); heat = 1; };
  const collapse = (id) => { open.delete(id); for (const c of kids[id] || []) { collapse(c); vis.delete(c); } heat = 1; };
  const reset = () => { vis.clear(); open.clear(); show("shree"); byId.shree.x = byId.shree.y = 0; expand("shree"); select("shree"); };
  const path = (id) => { const p = []; while (id) { p.unshift(byId[id].label); id = byId[id].parent; } return p.join(" / "); };
  const select = (id) => {
    sel = id; const n = byId[id];
    $("#g-title").textContent = n.label; $("#g-note").textContent = n.note || ""; $("#g-crumbs").textContent = path(id);
    const k = (kids[id] || []).length; $("#g-count").textContent = k ? (open.has(id) ? `${k} branches open` : `${k} branches inside. Click to open.`) : "A leaf. Click its parent to fold.";
  };

  const resize = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  new ResizeObserver(resize).observe(cv); resize();

  const rad = (n) => n.depth === 0 ? 9 : n.depth === 1 ? 6 : kids[n.id] ? 5 : 3;
  const step = () => {
    const arr = [...vis].map((i) => byId[i]);
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
      const a = arr[i], b = arr[j]; let dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy + .01;
      if (d2 > 90000) continue; const f = 2600 / d2, d = Math.sqrt(d2); dx /= d; dy /= d;
      a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f;
    }
    for (const n of arr) {
      if (n.parent && vis.has(n.parent)) {
        const p = byId[n.parent], L = n.depth === 1 ? 140 : 80; let dx = n.x - p.x, dy = n.y - p.y; const d = Math.hypot(dx, dy) || 1, f = (d - L) * .03;
        dx /= d; dy /= d; n.vx -= dx * f; n.vy -= dy * f; p.vx += dx * f * .5; p.vy += dy * f * .5;
      }
      n.vx -= n.x * .0016; n.vy -= n.y * .0016;
    }
    for (const n of arr) { if (n === drag) continue; n.vx *= .82; n.vy *= .82; n.x += n.vx * heat; n.y += n.vy * heat; }
    heat = Math.max(.02, heat * .995);
  };
  const toScreen = (n) => [W / 2 + (n.x + cam.x) * cam.k, H / 2 + (n.y + cam.y) * cam.k];
  const draw = (t) => {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (const id of vis) { const n = byId[id]; if (!n.parent || !vis.has(n.parent)) continue;
      const [x1, y1] = toScreen(n), [x2, y2] = toScreen(byId[n.parent]);
      const lit = sel === id || sel === n.parent || hover === id;
      ctx.strokeStyle = lit ? "rgba(90,169,255,.6)" : "rgba(141,145,164,.16)"; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
    for (const id of vis) {
      const n = byId[id], [x, y] = toScreen(n), r = rad(n) * Math.sqrt(cam.k), has = !!kids[id], isOpen = open.has(id);
      if (has && !isOpen) { ctx.strokeStyle = "rgba(90,169,255,.35)"; ctx.beginPath(); ctx.arc(x, y, r + 5, 0, 7); ctx.stroke(); }
      ctx.fillStyle = n.depth === 0 ? "#eeeae2" : has ? "#5aa9ff" : "#8d91a4";
      ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      if (sel === id || hover === id) { ctx.strokeStyle = "#eeeae2"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, 7); ctx.stroke(); ctx.lineWidth = 1; }
      const fs = n.depth === 0 ? 15 : n.depth === 1 ? 13 : 11;
      ctx.font = `${n.depth < 1 ? 500 : 400} ${fs}px Inter, system-ui`; ctx.textAlign = "center";
      ctx.fillStyle = sel === id || hover === id || n.depth < 2 ? "#eeeae2" : "rgba(238,234,226,.7)";
      ctx.fillText(n.label, x, y + r + fs + 4);
    }
  };
  const loop = (t) => { step(); draw(t); requestAnimationFrame(loop); };

  // interaction
  let drag = null, panning = null, moved = 0;
  const pick = (ex, ey) => { let best = null, bd = 1e9; for (const id of vis) { const [x, y] = toScreen(byId[id]); const d = Math.hypot(x - ex, y - ey); if (d < Math.max(16, rad(byId[id]) + 8) && d < bd) { bd = d; best = id; } } return best; };
  const pos = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.addEventListener("pointerdown", (e) => { const [x, y] = pos(e); const id = pick(x, y); moved = 0; cv.setPointerCapture(e.pointerId); cv.classList.add("dragging");
    if (id) drag = byId[id]; else panning = { x, y, cx: cam.x, cy: cam.y }; });
  cv.addEventListener("pointermove", (e) => { const [x, y] = pos(e);
    if (drag) { moved++; drag.x = (x - W / 2) / cam.k - cam.x; drag.y = (y - H / 2) / cam.k - cam.y; drag.vx = drag.vy = 0; heat = Math.max(heat, .4); }
    else if (panning) { moved++; cam.x = panning.cx + (x - panning.x) / cam.k; cam.y = panning.cy + (y - panning.y) / cam.k; }
    else { hover = pick(x, y); cv.style.cursor = hover ? "pointer" : "grab"; } });
  const up = () => { cv.classList.remove("dragging");
    if (drag && moved < 4) { const id = drag.id; if (kids[id]) open.has(id) && id !== "shree" ? collapse(id) : expand(id); select(id); }
    drag = null; panning = null; };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  cv.addEventListener("wheel", (e) => { if (!e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 40) return; e.preventDefault(); cam.k = Math.min(2.5, Math.max(.4, cam.k * (e.deltaY < 0 ? 1.1 : .9))); }, { passive: false });
  $("#g-all").onclick = () => { let more = true; while (more) { more = false; for (const id of [...vis]) if (kids[id] && !open.has(id)) { expand(id); more = true; } } cam.k = W < 600 ? .55 : .75; select(sel); };
  $("#g-reset").onclick = () => { cam = { x: 0, y: 0, k: 1 }; reset(); };
  reset(); for (let i = 0; i < 200; i++) step(); requestAnimationFrame(loop);
})();

/* ================= TIMELINE SCENE ================= */
(() => {
  const CH = window.CHAPTERS, svg = $("#scene");
  const SKIN = "#c68e62", HAIR = "#1b1414";
  const shirts = ["#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#cfc9bd","#5aa9ff"];

  const props = {
    origami: `<g class="bob"><path d="M590 290 l40 -30 l-10 32 l38 4 l-46 14 z" fill="#eeeae2"/><path d="M630 260 l-10 32 l-30 -2 z" fill="#c9c6bf"/></g>
      <rect x="610" y="425" width="22" height="14" fill="#e85d5d" transform="rotate(-8 620 432)"/><rect x="645" y="428" width="18" height="11" fill="#ffb547" transform="rotate(12 650 432)"/>
      <path d="M680 440 q12 -30 24 0 z" fill="#a0603a"/>`,
    gaming: `<rect x="590" y="372" width="170" height="10" fill="#3a3f55"/><rect x="600" y="382" width="8" height="58" fill="#3a3f55"/><rect x="742" y="382" width="8" height="58" fill="#3a3f55"/>
      <rect x="618" y="292" width="110" height="80" rx="8" fill="#20232f" stroke="#3a3f55"/><rect x="628" y="300" width="90" height="62" fill="#0e2a1c"/>
      <g class="blink"><circle cx="673" cy="331" r="12" stroke="#7cf29b" fill="none"/><path d="M673 315v32M657 331h32" stroke="#7cf29b"/></g>
      <text x="632" y="312" font-family="JetBrains Mono" font-size="8" fill="#7cf29b">de_dust2</text>`,
    campus: `<g class="fly"><path d="M100 110 l46 -6 l10 -12 l6 0 l-4 14 l22 -2 l6 -8 l5 0 l-3 10 l-3 10 l-5 0 l-6 -8 l-22 -2 l4 14 l-6 0 l-10 -12 z" fill="#c9c6bf"/></g>
      <rect x="668" y="250" width="4" height="190" fill="#8d91a4"/><path d="M672 254 h86 l-14 18 l14 18 h-86 z" fill="#3aa37a"/><text x="680" y="276" font-family="JetBrains Mono" font-size="11" fill="#07080c" font-weight="600">TECH FEST</text>`,
    robocon: `<g transform="translate(640 0)"><rect x="0" y="380" width="110" height="44" rx="6" fill="#3a3f55"/><circle cx="20" cy="428" r="13" fill="#111"/><circle cx="90" cy="428" r="13" fill="#111"/>
      <rect x="70" y="300" width="10" height="84" fill="#d98c2b"/><rect x="40" y="296" width="60" height="10" fill="#d98c2b" transform="rotate(-18 75 300)"/><path d="M36 300 l-12 -8 m12 18 l-12 6" stroke="#eeeae2" stroke-width="4"/>
      <circle cx="30" cy="395" r="5" fill="#5aa9ff" class="blink"/><text x="10" y="372" font-family="JetBrains Mono" font-size="10" fill="#8d91a4">ROBOCON '19</text></g>
      <g class="spark"><path d="M612 395 l-10 -8 m10 14 l-14 2 m14 4 l-8 10" stroke="#ffb547" stroke-width="2"/></g>`,
    gym: `<g><rect x="630" y="410" width="96" height="30" rx="4" fill="#20232f"/><text x="678" y="430" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#5aa9ff">LOCKDOWN PR</text></g>
      <rect x="600" y="424" width="16" height="16" rx="3" fill="#3a3f55"/><rect x="742" y="418" width="22" height="22" rx="3" fill="#3a3f55"/>`,
    corporate: `<g transform="translate(600 0)"><path d="M0 425 q4 -34 40 -38 l30 -24 h70 l34 26 q30 4 32 36 z" fill="#c9c6bf"/><path d="M78 368 h56 l24 20 h-100 z" fill="#20232f"/>
      <circle cx="44" cy="428" r="16" fill="#111" stroke="#8d91a4" stroke-width="4"/><circle cx="168" cy="428" r="16" fill="#111" stroke="#8d91a4" stroke-width="4"/></g>
      <text x="610" y="345" font-family="JetBrains Mono" font-size="10" fill="#8d91a4">09:00 → 18:00</text>`,
    leap: `<rect x="696" y="300" width="6" height="140" fill="#8d91a4"/><rect x="630" y="290" width="140" height="58" rx="6" fill="#5aa9ff"/>
      <text x="700" y="316" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="20" fill="#07080c">KRAFTX</text><text x="700" y="336" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#07080c">OPEN · CLIENT 1 OF 5</text>
      <g class="spark"><rect x="560" y="200" width="6" height="6" fill="#ffb547"/><rect x="430" y="170" width="6" height="6" fill="#e85d5d"/><rect x="600" y="150" width="6" height="6" fill="#5aa9ff"/></g>`,
    juggle: `<g class="spin" style="transform-origin:500px 120px">${["KX", "HC", "FT", "EA"].map((t, i) => { const a = i * Math.PI / 2, x = 500 + Math.cos(a) * 80 - 20, y = 120 + Math.sin(a) * 40 - 14; return `<g><rect x="${x}" y="${y}" width="40" height="28" rx="4" fill="${["#5aa9ff", "#ffb547", "#e85d5d", "#3aa37a"][i]}"/><text x="${x + 20}" y="${y + 19}" text-anchor="middle" font-family="JetBrains Mono" font-weight="600" font-size="12" fill="#07080c">${t}</text></g>`; }).join("")}</g>`,
    content: `<path d="M680 440 l20 -120 l20 120 M700 320 v120" stroke="#8d91a4" stroke-width="3" fill="none"/><circle cx="700" cy="280" r="44" fill="none" stroke="#eeeae2" stroke-width="8" class="glow"/>
      <rect x="690" y="262" width="20" height="36" rx="3" fill="#20232f"/><circle cx="722" cy="236" r="5" fill="#ff4d4d" class="blink"/><text x="732" y="240" font-family="JetBrains Mono" font-size="10" fill="#ff4d4d">REC</text>
      <g transform="rotate(-20 620 420)"><ellipse cx="620" cy="404" rx="16" ry="20" fill="#3aa37a"/><rect x="617" y="422" width="6" height="18" fill="#eeeae2"/></g>`,
    standup: `<polygon points="470,0 530,0 640,440 360,440" fill="url(#spot)"/><path d="M590 440 v-120 m-14 120 h28" stroke="#8d91a4" stroke-width="3"/>
      <g class="sway">${Array.from({ length: 16 }, (_, i) => `<circle cx="${30 + i * 50}" cy="${505 + (i % 2) * 8}" r="16" fill="#151826"/><rect x="${12 + i * 50}" y="${518 + (i % 2) * 8}" width="36" height="30" rx="12" fill="#151826"/>`).join("")}</g>
      <text x="640" y="250" font-family="JetBrains Mono" font-size="11" fill="#8d91a4">250 PEOPLE · 19 MIN</text>`,
    twin: `<path d="M500 240 C 400 120, 260 160, 150 290" stroke="#5aa9ff" stroke-width="2" stroke-dasharray="4 8" fill="none" class="glow"/>
      <g class="bob"><rect x="140" y="220" width="20" height="20" fill="#5aa9ff" transform="rotate(45 150 230)"/></g>`
  };
  const handR = {
    origami: `<rect x="30" y="-4" width="16" height="16" fill="#eeeae2" transform="rotate(20 38 4)"/>`,
    robocon: `<path d="M0 0 l26 -26 m-6 -6 l12 12" stroke="#c9c6bf" stroke-width="6" stroke-linecap="round"/>`,
    corporate: `<rect x="-16" y="4" width="34" height="24" rx="3" fill="#6b4a2b"/><path d="M-6 4 v-5 h14 v5" stroke="#6b4a2b" stroke-width="3" fill="none"/>`,
    standup: `<rect x="-3" y="-30" width="7" height="30" rx="3" fill="#20232f"/><circle cx="0" cy="-32" r="7" fill="#8d91a4"/>`,
    content: `<rect x="-4" y="-22" width="10" height="20" rx="2" fill="#20232f"/>`
  };
  const pose = { // [left deg, right deg, body class, right-arm anim, left-arm anim]
    origami: [25, -55, "", "", ""], gaming: [20, -70, "", "type", ""], campus: [15, -150, "", "wave", ""], robocon: [20, -60, "", "type", ""],
    gym: [168, -168, "lift", "", ""], corporate: [12, -8, "", "", ""], leap: [150, -150, "jump", "", ""], juggle: [140, -140, "", "wave", "wave"],
    content: [20, -125, "", "wave", ""], standup: [50, -150, "", "", "wave"], twin: [130, -15, "", "", "wave"]
  };

  const boyFaces = {
    wonder: `<circle cx="-8" cy="-128" r="3.4"/><circle cx="8" cy="-128" r="3.4"/><circle cx="0" cy="-112" r="4" fill="#5a1f1f"/>`,
    curious: `<circle cx="-8" cy="-127" r="2.6"/><circle cx="8" cy="-127" r="2.6"/><path d="M2 -138 l12 -4" stroke-width="2.4"/><path d="M-5 -112 h10" stroke-width="2.4"/>`,
    happy: `<path d="M-12 -126 q4 -5 8 0 M4 -126 q4 -5 8 0" stroke-width="2.4" fill="none"/><path d="M-8 -115 q8 9 16 0" stroke-width="2.6" fill="none"/>`,
    proud: `<path d="M-12 -127 h8 M4 -127 h8" stroke-width="2.6"/><path d="M-9 -115 q9 8 18 0" stroke-width="2.6" fill="none"/><circle cx="-15" cy="-118" r="3.5" fill="#e88b8b" stroke="none"/><circle cx="15" cy="-118" r="3.5" fill="#e88b8b" stroke="none"/>`,
    shock: `<circle cx="-8" cy="-128" r="5" fill="#fff"/><circle cx="8" cy="-128" r="5" fill="#fff"/><circle cx="-8" cy="-128" r="2.2"/><circle cx="8" cy="-128" r="2.2"/><ellipse cx="0" cy="-111" rx="5" ry="7" fill="#5a1f1f"/>`,
    bored: `<path d="M-12 -127 h8 M4 -127 h8" stroke-width="2.4"/><circle cx="-8" cy="-125" r="1.8"/><circle cx="8" cy="-125" r="1.8"/><path d="M-6 -112 h12" stroke-width="2.4"/>`,
    nervous: `<circle cx="-8" cy="-127" r="2.4"/><circle cx="8" cy="-127" r="2.4"/><path d="M-8 -112 q2 -3 4 0 t4 0 t4 0 t4 0" stroke-width="2" fill="none"/><path d="M20 -140 q4 7 0 10 q-4 -3 0 -10" fill="#5aa9ff" stroke="none"/>`,
    dizzy: `<path d="M-11 -131 l6 6 m0 -6 l-6 6 M5 -131 l6 6 m0 -6 l-6 6" stroke-width="2.2"/><path d="M-8 -112 q2 -3 4 0 t4 0 t4 0 t4 0" stroke-width="2" fill="none"/>`,
    cheer: `<path d="M-12 -126 q4 -5 8 0 M4 -126 q4 -5 8 0" stroke-width="2.4" fill="none"/><path d="M-9 -117 h18 q-2 12 -9 12 q-7 0 -9 -12" fill="#5a1f1f"/>`,
    laugh: `<path d="M-12 -128 q4 4 8 0 M4 -128 q4 4 8 0" stroke-width="2.4" fill="none"/><path d="M-10 -118 h20 q-2 14 -10 14 q-8 0 -10 -14" fill="#5a1f1f"/><path d="M-16 -124 q-3 6 0 8" stroke="#5aa9ff" stroke-width="2" fill="none"/><path d="M16 -124 q3 6 0 8" stroke="#5aa9ff" stroke-width="2" fill="none"/>`,
    wink: `<path d="M-12 -127 q4 -5 8 0" stroke-width="2.4" fill="none"/><circle cx="8" cy="-127" r="2.8"/><path d="M-8 -115 q8 9 16 0" stroke-width="2.6" fill="none"/>`
  };
  const boyArms = { cheer: [150, -150], laugh: [40, -40], wonder: [150, -150], bored: [10, -150], nervous: [20, -20], dizzy: [100, -100], wink: [10, -150] };

  svg.innerHTML = `
  <defs><linearGradient id="spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".35"/><stop offset="1" stop-color="#fff6d8" stop-opacity=".04"/></linearGradient></defs>
  <text id="bgYear" x="440" y="300" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="500" font-size="190" fill="#0c0e15"></text>
  <line x1="0" y1="440" x2="800" y2="440" stroke="#252839" stroke-width="2"/>
  ${Object.entries(props).map(([k, v]) => `<g class="prop" data-act="${k}">${v}</g>`).join("")}
  <g transform="translate(470 440)"><g id="cScale"><g id="cBody">
    <rect x="-24" y="-92" width="20" height="92" rx="10" fill="#22263a"/><rect x="4" y="-92" width="20" height="92" rx="10" fill="#22263a"/>
    <ellipse cx="-16" cy="-2" rx="16" ry="7" fill="#eeeae2"/><ellipse cx="16" cy="-2" rx="16" ry="7" fill="#eeeae2"/>
    <g class="arm" id="aL"><g id="aLi" style="transform-box:fill-box;transform-origin:50% 0"><rect x="-52" y="-182" width="18" height="84" rx="9" class="shirt"/><circle cx="-43" cy="-96" r="10" fill="${SKIN}"/></g></g>
    <rect x="-36" y="-190" width="72" height="108" rx="28" class="shirt"/>
    <g class="prop" data-act="corporate"><path d="M0 -186 l-7 8 l7 50 l7 -50 z" fill="#5aa9ff"/></g>
    <rect x="-9" y="-202" width="18" height="16" fill="${SKIN}"/>
    <circle cx="0" cy="-226" r="30" fill="${SKIN}"/>
    <path id="hair" d="M-31 -228 q2 -36 33 -34 q30 0 30 34 q-8 -16 -30 -18 q-20 0 -33 18z" fill="${HAIR}"/>
    <g id="specs" fill="none" stroke="#111" stroke-width="2.5"><circle cx="-11" cy="-228" r="8"/><circle cx="11" cy="-228" r="8"/><path d="M-3 -228 h6"/></g>
    <circle cx="-11" cy="-228" r="2.8" fill="#111"/><circle cx="11" cy="-228" r="2.8" fill="#111"/><path d="M-9 -212 q9 7 18 0" stroke="#111" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <g class="prop" data-act="gym"><rect x="-120" y="-292" width="240" height="7" rx="3" fill="#c9c6bf"/><rect x="-118" y="-312" width="16" height="46" rx="3" fill="#3a3f55"/><rect x="102" y="-312" width="16" height="46" rx="3" fill="#3a3f55"/></g>
    <g class="arm" id="aR"><g id="aRi" style="transform-box:fill-box;transform-origin:50% 0"><rect x="34" y="-182" width="18" height="84" rx="9" class="shirt"/><circle cx="43" cy="-96" r="10" fill="${SKIN}"/>
      <g transform="translate(43 -96)">${Object.entries(handR).map(([k, v]) => `<g class="prop" data-act="${k}">${v}</g>`).join("")}</g></g></g>
  </g></g></g>
  <g id="boy" transform="translate(150 440)" style="cursor:pointer">
    <rect x="-44" y="-50" width="88" height="50" fill="#5b3f26"/><path d="M-44 -34 h88 M-44 -18 h88" stroke="#3f2b19" stroke-width="3"/>
    <rect x="-16" y="-62" width="12" height="40" rx="6" fill="#22263a" transform="rotate(-10 -10 -60)"/><rect x="4" y="-62" width="12" height="40" rx="6" fill="#22263a" transform="rotate(10 10 -60)"/>
    <g class="arm" id="bL"><rect x="-30" y="-100" width="11" height="40" rx="5.5" fill="#ffb547"/></g>
    <g class="arm" id="bR"><rect x="19" y="-100" width="11" height="40" rx="5.5" fill="#ffb547"/></g>
    <rect x="-21" y="-104" width="42" height="52" rx="16" fill="#ffb547"/>
    <rect x="-5" y="-86" width="10" height="10" fill="#5aa9ff" transform="rotate(45 0 -81)" class="glow"/>
    <circle cx="0" cy="-124" r="25" fill="${SKIN}"/>
    <path d="M-25 -126 q0 -28 25 -26 q25 0 25 26 q-10 -12 -25 -13 q-14 0 -25 13z" fill="${HAIR}"/>
    <g id="bFace" fill="#111" stroke="#111" stroke-linecap="round"></g>
    <g fill="none" stroke="#2a2a2a" stroke-width="2"><circle cx="-8" cy="-127" r="8"/><circle cx="8" cy="-127" r="8"/><path d="M0 -127 h0"/></g>
  </g>`;

  const card = $("#card"), bubble = $("#bubble");
  const scroller = $("#scroller");
  scroller.style.height = `calc(${CH.length * 60}vh + 100vh)`;
  let cur = -1;
  const setArm = (el, deg) => { el.style.transform = `rotate(${deg}deg)`; };
  const apply = (i) => {
    if (i === cur) return; const c = CH[i], first = cur === -1; cur = i;
    const doSwap = () => {
      $("#c-years").textContent = c.years; $("#c-title").textContent = c.title; $("#c-diary").textContent = c.diary;
      bubble.textContent = c.boy.line; card.classList.remove("swap"); bubble.classList.remove("swap");
    };
    if (first) doSwap(); else { card.classList.add("swap"); bubble.classList.add("swap"); setTimeout(doSwap, 220); }
    $("#bgYear").textContent = c.years.length > 5 ? c.years.slice(0, 4) : c.years;
    svg.querySelectorAll(".prop").forEach((p) => p.classList.toggle("on", p.dataset.act === c.act));
    const [l, r, body, ra, la] = pose[c.act];
    setArm($("#aL"), l); setArm($("#aR"), r);
    $("#cBody").setAttribute("class", body); $("#aRi").setAttribute("class", ra); $("#aLi").setAttribute("class", la);
    $("#cScale").setAttribute("transform", `scale(${c.age})`);
    svg.querySelectorAll(".shirt").forEach((s) => s.setAttribute("fill", shirts[i % shirts.length]));
    $("#specs").style.display = i <= 3 ? "" : "none";           // specs until college
    $("#hair").style.display = i >= 8 && i <= 9 ? "none" : "";  // the 2025 shaved-head era
    $("#bFace").innerHTML = boyFaces[c.boy.face] || boyFaces.wonder;
    const [bl, br] = boyArms[c.boy.face] || [12, -12];
    setArm($("#bL"), bl); setArm($("#bR"), br);
    $("#twin-cta").classList.toggle("show", c.act === "twin");
  };
  const onScroll = () => {
    const r = scroller.getBoundingClientRect(), span = scroller.offsetHeight - innerHeight;
    const p = Math.min(.999, Math.max(0, -r.top / span));
    apply(Math.floor(p * CH.length));
  };
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); apply(0); onScroll();
  const toTwin = () => { $("#twin").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); setTimeout(() => $("#chat-in").focus({ preventScroll: true }), 600); };
  $("#boy").addEventListener("click", toTwin);
})();

/* ================= DIGITAL TWIN CHAT ================= */
(() => {
  const T = window.TWIN, log = $("#log"), form = $("#chat-form"), inp = $("#chat-in");
  const history = [];
  let api = true; // tries /api/twin first; falls back to the local brain if it isn't deployed
  const add = (who, text) => { const d = document.createElement("div"); d.className = "msg " + who; d.textContent = text; log.append(d); log.scrollTop = log.scrollHeight; return d; };
  const local = (q) => { const s = q.toLowerCase(); const hit = T.intents.find((it) => it.k.some((k) => s.includes(k))); return hit ? hit.a : T.fallback; };
  const ask = async (q) => {
    add("me", q); history.push({ role: "user", content: q });
    const typing = add("twin typing", "typing…");
    let reply = null;
    if (api) {
      try {
        const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 15000);
        const r = await fetch("/api/twin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-12) }), signal: ctl.signal });
        clearTimeout(to);
        if (r.ok) reply = (await r.json()).reply; else { api = false; $("#twin-note").hidden = false; }
      } catch { api = false; $("#twin-note").hidden = false; }
    }
    if (!reply) { await new Promise((r) => setTimeout(r, 500 + Math.random() * 500)); reply = local(q); }
    typing.remove(); add("twin", reply); history.push({ role: "assistant", content: reply });
  };
  add("twin", T.greeting);
  // Probe the brain without spending a call: an empty message gets 400 when the key is set, 503 when it isn't.
  fetch("/api/twin", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{\"messages\":[]}" })
    .then((r) => { if (r.status !== 400) throw 0; })
    .catch(() => { api = false; $("#twin-note").hidden = false; });
  const chips = ["What is KraftX?", "Tell me about Robocon", "Roast me"];
  $("#chips").innerHTML = chips.map((c) => `<button type="button">${c}</button>`).join("");
  $("#chips").addEventListener("click", (e) => { if (e.target.tagName === "BUTTON") ask(e.target.textContent); });
  form.addEventListener("submit", (e) => { e.preventDefault(); const q = inp.value.trim(); if (!q) return; inp.value = ""; ask(q); });
})();

/* ================= PROJECTS ================= */
$("#proj").innerHTML = window.PROJECTS.map((p) => `<article>
  <div class="meta"><span>${p.kind}</span><span>${p.year}</span></div>
  <h3>${p.name}</h3><p>${p.blurb}</p>
  ${p.href ? `<a class="go" href="${p.href}" target="_blank" rel="noopener">Visit →</a>` : ""}
</article>`).join("");
})();
