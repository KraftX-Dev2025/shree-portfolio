/* shree.os: fills the panes from data.js / ventures.js, draws the particle sphere, runs the terminal twin. */
(() => {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* clock */
  const tick = () => { $("#clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };
  tick(); setInterval(tick, 20000);

  /* stats as ASCII bars, counted from the projects data */
  const V = window.VENTURES || [], inds = new Set(V.map((v) => v.industry)).size;
  const rows = [["products", V.length, 54], ["industries", inds, 54], ["client builds", V.filter((v) => v.type === "client").length, 54], ["on stage (min)", 19, 54]];
  $("#stats").innerHTML = rows.map(([k, n, max]) => { const w = Math.max(1, Math.round((n / max) * 28)); return `${k.padEnd(15, " ")} <span class="bar-fill">${"█".repeat(w)}</span>${"░".repeat(28 - w)} ${n}`; }).join("\n");

  /* featured projects as ls -l */
  $("#ls").innerHTML = (window.PROJECTS || []).map((p) => `<a href="${esc(p.href || "projects.html")}"${p.href ? ' target="_blank" rel="noopener"' : ""}>
    <span class="nm">${esc(p.name)}</span><span class="dim yr">${esc(p.year)}</span><span class="bl dim">${esc(p.blurb)}</span><span class="dim">${p.href ? "↗" : "·"}</span></a>`).join("");

  /* story as git log */
  const hash = (s) => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h.toString(16).slice(0, 7); };
  $("#log").innerHTML = (window.CHAPTERS || []).map((c) => `<li><span class="h">${hash(c.title)}</span><span class="y">${esc(c.years)}</span><span class="t">${esc(c.title)}</span><span class="d">${esc(c.diary)}</span></li>`).join("");

  /* memory as tree */
  const G = window.GRAPH || [], tops = G.filter((n) => n.parent === "shree");
  const count = (id) => G.filter((n) => n.parent === id).reduce((s, n) => s + 1 + count(n.id), 0);
  $("#tree").innerHTML = "~/memory\n" + tops.map((n, i) => `${i === tops.length - 1 ? "└──" : "├──"} <span class="n">${esc(n.label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"))}/</span>  <span class="dim">${count(n.id)} items</span>`).join("\n")
    + `\n\n<span class="dim">${tops.length} directories, ${G.length - 1} memories</span>`;
  $("#nodeCount").textContent = G.length;

  /* rotating dotted sphere (the twin's core) */
  const cv = $("#sphere"), x = cv.getContext("2d"); let W, H, pts = [];
  const N = 900, golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i; pts.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
  const size = () => { const d = devicePixelRatio || 1, b = cv.getBoundingClientRect(); W = cv.width = b.width * d; H = cv.height = b.height * d; };
  size(); addEventListener("resize", size);
  let a = 0;
  const draw = () => {
    x.clearRect(0, 0, W, H); const R = Math.min(W, H) * .42, cx = W / 2, cy = H / 2, ca = Math.cos(a), sa = Math.sin(a), tilt = .35, ct = Math.cos(tilt), st = Math.sin(tilt);
    for (const [px, py, pz] of pts) {
      const x1 = px * ca + pz * sa, z1 = -px * sa + pz * ca, y2 = py * ct - z1 * st, z2 = py * st + z1 * ct;
      const s = (z2 + 1.4) / 2.4; x.globalAlpha = .15 + s * .75; x.fillStyle = z2 > .55 ? "#b48ff0" : "#e8e6e1";
      x.fillRect(cx + x1 * R, cy + y2 * R, 1.2 * s * (devicePixelRatio || 1) + .4, 1.2 * s * (devicePixelRatio || 1) + .4);
    }
    x.globalAlpha = 1; a += .004; if (!reduce) requestAnimationFrame(draw);
  };
  draw();

  /* the twin, terminal style (same brain: /api/twin, scripted answers as fallback) */
  const T = window.TWIN, chat = $("#chat"), input = $("#ci"), hist = []; let api = true;
  const say = (who, t) => { const p = document.createElement("p"); p.className = who; p.textContent = t; chat.append(p); chat.scrollTop = chat.scrollHeight; return p; };
  const local = (q) => { const s = q.toLowerCase(); const hit = T.intents.find((it) => it.k.some((k) => s.includes(k))); return hit ? hit.a : T.fallback; };
  const ask = async (q) => {
    say("u", q); hist.push({ role: "user", content: q }); const wait = say("t", "…"); let reply = null;
    if (api) { try { const r = await fetch("/api/twin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: hist.slice(-8) }) });
      if (r.ok || r.status === 429) reply = (await r.json()).reply; else { api = false; $("#tstat").textContent = "scripted"; } } catch { api = false; $("#tstat").textContent = "scripted"; } }
    if (!reply) reply = local(q);
    wait.remove(); say("t", reply); hist.push({ role: "assistant", content: reply });
  };
  say("t", T.greeting);
  fetch("/api/twin", { method: "POST", headers: { "Content-Type": "application/json" }, body: '{"messages":[]}' })
    .then((r) => { $("#tstat").textContent = r.status === 400 ? "live · claude" : "scripted"; if (r.status !== 400) api = false; }).catch(() => { api = false; $("#tstat").textContent = "scripted"; });
  $("#cf").addEventListener("submit", (e) => { e.preventDefault(); const q = input.value.trim(); if (!q) return; input.value = ""; ask(q); });
  document.querySelector(".twin .chips").addEventListener("click", (e) => { if (e.target.tagName === "BUTTON") ask(e.target.textContent === "the walking robot" ? "Tell me about Robocon" : e.target.textContent); });

  /* highlight the workspace tab for the pane in view */
  const tabs = [...document.querySelectorAll(".ws a[href^='#']")];
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) tabs.forEach((t) => t.classList.toggle("on", t.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-40% 0px -55% 0px" });
  tabs.forEach((t) => { const el = document.querySelector(t.getAttribute("href")); if (el) io.observe(el); });
})();
