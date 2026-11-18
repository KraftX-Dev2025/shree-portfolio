(() => {
const $ = (s) => document.querySelector(s);
const board = $("#board"), layer = $("#layer"), wires = $("#wires");
const KEY = "shree-board-v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const st = Object.assign({ pos: {}, mine: [], links: [], plus: {} }, load());
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} };

const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 1600); };

/* ---- seed layout: each cluster lays its notes out in two columns ---- */
const notes = {};
const counts = {};
for (const t of window.THOUGHTS) {
  const c = window.CLUSTERS[t.c], i = (counts[t.c] = (counts[t.c] || 0) + 1) - 1;
  notes[t.id] = { ...t, x: c.x + (i % 2) * 260, y: c.y + 70 + Math.floor(i / 2) * 200 };
}
for (const m of st.mine) notes[m.id] = { ...m, c: "you" };
for (const [id, p] of Object.entries(st.pos)) if (notes[id]) [notes[id].x, notes[id].y] = p;

for (const [k, c] of Object.entries(window.CLUSTERS)) {
  const el = document.createElement("div"); el.className = "cl"; el.textContent = c.label; el.style.left = c.x + "px"; el.style.top = c.y + "px"; layer.append(el);
  const s = document.createElement("span"); s.className = "c-" + k; s.textContent = c.label; $("#legend").append(s);
}

const els = {};
const render = (n) => {
  const el = document.createElement("div");
  el.className = "note c-" + n.c + (n.c === "you" ? " mine" : ""); el.dataset.id = n.id;
  el.style.transform = `rotate(${((n.id.charCodeAt(n.id.length - 1) % 5) - 2) * .8}deg)`;
  el.innerHTML = `<p></p><div class="ft"><span class="who"></span><button type="button" class="pl">♥ resonates</button></div><span class="h" title="Drag onto another note to connect"></span>${n.c === "you" ? '<button class="x" type="button" aria-label="Remove">×</button>' : ""}`;
  el.querySelector("p").textContent = n.text;
  el.querySelector(".who").textContent = n.c === "you" ? (n.name ? "— " + n.name : "— you") : n.date;
  el.querySelector(".pl").classList.toggle("on", !!st.plus[n.id]);
  place(el, n); layer.append(el); els[n.id] = el;
};
const place = (el, n) => { el.style.left = n.x + "px"; el.style.top = n.y + "px"; };
Object.values(notes).forEach(render);

/* ---- wires ---- */
const center = (id) => { const n = notes[id], el = els[id]; return [n.x + el.offsetWidth / 2, n.y + el.offsetHeight / 2]; };
const curve = ([x1, y1], [x2, y2]) => { const mx = (x1 + x2) / 2; return `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`; };
let live = null;
const drawWires = () => {
  const seed = window.LINKS.filter(([a, b]) => notes[a] && notes[b]).map(([a, b]) => `<path class="seed" d="${curve(center(a), center(b))}"/>`);
  const mine = st.links.filter(([a, b]) => notes[a] && notes[b]).map(([a, b], i) => `<path class="mine" data-i="${i}" d="${curve(center(a), center(b))}"><title>Click to remove</title></path>`);
  wires.innerHTML = seed.join("") + mine.join("") + (live ? `<path class="live" d="${curve(live.from, live.to)}"/>` : "");
};
wires.addEventListener("click", (e) => { const i = e.target.dataset?.i; if (i == null) return; st.links.splice(+i, 1); save(); drawWires(); toast("Connection removed"); });

/* ---- camera ---- */
let cam = { x: 0, y: 0, k: 1 };
const applyCam = () => { layer.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})`; board.style.backgroundPosition = `${cam.x}px ${cam.y}px`; board.style.backgroundSize = `${28 * cam.k}px ${28 * cam.k}px`; };
const fit = () => {
  const xs = Object.values(notes).map((n) => n.x), ys = Object.values(notes).map((n) => n.y);
  const minX = Math.min(...xs) - 40, minY = Math.min(...ys) - 90, maxX = Math.max(...xs) + 280, maxY = Math.max(...ys) + 220;
  const W = board.clientWidth, H = board.clientHeight;
  const left = !$("#intro").hidden && W > 900 ? 390 : 0, Wa = W - left;
  cam.k = Math.min(1, Math.max(.3, Math.min(Wa / (maxX - minX), (H - 80) / (maxY - minY))));
  cam.x = left + (Wa - (maxX - minX) * cam.k) / 2 - minX * cam.k; cam.y = (H - 80 - (maxY - minY) * cam.k) / 2 - minY * cam.k + 10;
  applyCam();
};
const zoomAt = (f, sx, sy) => { const k = Math.min(2, Math.max(.25, cam.k * f)); cam.x = sx - (sx - cam.x) * (k / cam.k); cam.y = sy - (sy - cam.y) * (k / cam.k); cam.k = k; applyCam(); };
const world = (e) => { const r = board.getBoundingClientRect(); return [(e.clientX - r.left - cam.x) / cam.k, (e.clientY - r.top - cam.y) / cam.k]; };

/* ---- pointer handling: pan, drag note, drag wire ---- */
let mode = null;
board.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button, .bar, .intro, a")) return;
  const noteEl = e.target.closest(".note");
  board.setPointerCapture(e.pointerId);
  if (e.target.classList.contains("h")) { const id = noteEl.dataset.id; mode = { t: "wire", id }; live = { from: center(id), to: world(e) }; }
  else if (noteEl) { const n = notes[noteEl.dataset.id], [wx, wy] = world(e); mode = { t: "note", n, dx: wx - n.x, dy: wy - n.y }; layer.append(noteEl); }
  else { mode = { t: "pan", sx: e.clientX, sy: e.clientY, cx: cam.x, cy: cam.y }; board.classList.add("panning"); }
});
let hoverTarget = null;
board.addEventListener("pointermove", (e) => {
  if (!mode) return;
  if (mode.t === "pan") { cam.x = mode.cx + e.clientX - mode.sx; cam.y = mode.cy + e.clientY - mode.sy; applyCam(); }
  else if (mode.t === "note") { const [wx, wy] = world(e); mode.n.x = wx - mode.dx; mode.n.y = wy - mode.dy; place(els[mode.n.id], mode.n); drawWires(); }
  else if (mode.t === "wire") {
    live.to = world(e); drawWires();
    const under = document.elementsFromPoint(e.clientX, e.clientY).find((x) => x.classList?.contains("note"));
    const tid = under && under.dataset.id !== mode.id ? under.dataset.id : null;
    if (hoverTarget !== tid) { hoverTarget && els[hoverTarget]?.classList.remove("target"); hoverTarget = tid; tid && els[tid].classList.add("target"); }
  }
});
const end = () => {
  if (!mode) return;
  if (mode.t === "note") { st.pos[mode.n.id] = [Math.round(mode.n.x), Math.round(mode.n.y)]; const m = st.mine.find((x) => x.id === mode.n.id); if (m) { m.x = mode.n.x; m.y = mode.n.y; } save(); }
  if (mode.t === "wire") {
    if (hoverTarget) {
      const a = mode.id, b = hoverTarget, dup = [...window.LINKS, ...st.links].some(([x, y]) => (x === a && y === b) || (x === b && y === a));
      if (!dup) { st.links.push([a, b]); save(); toast("Thoughts connected"); } else toast("Already connected");
      els[hoverTarget].classList.remove("target");
    }
    hoverTarget = null; live = null; drawWires();
  }
  mode = null; board.classList.remove("panning");
};
board.addEventListener("pointerup", end); board.addEventListener("pointercancel", end);
board.addEventListener("wheel", (e) => { e.preventDefault(); const r = board.getBoundingClientRect();
  // pinch / ctrl+wheel / a chunky mouse-wheel notch zooms; smooth trackpad scroll pans
  const mouseWheel = e.deltaX === 0 && (e.deltaMode === 1 || Math.abs(e.deltaY) >= 50);
  if (e.ctrlKey || e.metaKey || mouseWheel) zoomAt(e.deltaY < 0 ? 1.1 : .9, e.clientX - r.left, e.clientY - r.top);
  else { cam.x -= e.deltaX; cam.y -= e.deltaY; applyCam(); } }, { passive: false });

/* ---- note buttons ---- */
layer.addEventListener("click", (e) => {
  const el = e.target.closest(".note"); if (!el) return; const id = el.dataset.id;
  if (e.target.classList.contains("pl")) { st.plus[id] = !st.plus[id]; e.target.classList.toggle("on", st.plus[id]); save(); if (st.plus[id]) toast("Resonated"); }
  if (e.target.classList.contains("x")) { st.mine = st.mine.filter((m) => m.id !== id); st.links = st.links.filter(([a, b]) => a !== id && b !== id); delete st.pos[id]; delete notes[id]; el.remove(); save(); drawWires(); toast("Removed"); }
});

/* ---- toolbar ---- */
const dlg = $("#dlg");
$("#add").onclick = () => { $("#add-text").value = ""; dlg.showModal(); $("#add-text").focus(); };
$("#add-cancel").onclick = () => dlg.close();
$("#add-form").addEventListener("submit", (e) => {
  e.preventDefault(); const text = $("#add-text").value.trim(); if (!text) return;
  const W = board.clientWidth, H = board.clientHeight;
  const n = { id: "u" + Date.now().toString(36), text, name: $("#add-name").value.trim(), x: (W / 2 - cam.x) / cam.k - 115, y: (H / 2 - cam.y) / cam.k - 60 };
  st.mine.push(n); notes[n.id] = { ...n, c: "you" }; render(notes[n.id]); save(); dlg.close(); drawWires();
  toast("Pinned. Drag its ◆ onto a thought it connects to.");
});
$("#zin").onclick = () => zoomAt(1.2, board.clientWidth / 2, board.clientHeight / 2);
$("#zout").onclick = () => zoomAt(1 / 1.2, board.clientWidth / 2, board.clientHeight / 2);
$("#fit").onclick = fit;
$("#clear").onclick = () => { for (const m of st.mine) { els[m.id]?.remove(); delete notes[m.id]; } st.mine = []; st.links = []; st.plus = {}; st.pos = {}; save(); location.reload(); };
$("#intro-x").onclick = () => { $("#intro").hidden = true; fit(); };

requestAnimationFrame(() => { drawWires(); fit(); });
addEventListener("resize", fit);
})();
