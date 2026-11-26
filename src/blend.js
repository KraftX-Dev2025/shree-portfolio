/* Blend: shree.os behaviour on top of the editorial site. Runs on every page.
   Status bar (clock + twin online state) in the nav, the typed whoami line, the ls -l view toggle for
   selected work, and the twin's dotted core. */
(() => {
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* status bar: clock and twin state, tucked between the brand and the links */
  const navWrap = $(".nav .wrap");
  if (navWrap) {
    const st = document.createElement("span"); st.className = "stat";
    st.innerHTML = `<span id="bl-clock">--:--</span><span><span class="dot" id="bl-dot">●</span> <span id="bl-state">online</span></span>`;
    navWrap.insertBefore(st, navWrap.querySelector("ul"));
    const tick = () => { const c = $("#bl-clock"); if (c) c.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); };
    tick(); setInterval(tick, 20000);
    fetch("/api/twin", { method: "POST", headers: { "Content-Type": "application/json" }, body: '{"messages":[]}' })
      .then((r) => { if (r.status !== 400) throw 0; $("#bl-state").textContent = "twin online"; })
      .catch(() => { $("#bl-state").textContent = "twin scripted"; $("#bl-dot").classList.add("off"); });
  }

  /* typed prompt */
  const w = $("#wtype");
  if (w) { const t = w.dataset.type || ""; if (reduce) w.textContent = t; else { let i = 0; const step = () => { w.textContent = t.slice(0, ++i); if (i < t.length) setTimeout(step, 90 + Math.random() * 80); }; setTimeout(step, 600); } }

  /* selected work: grid or ls -l */
  const proj = $("#proj"), view = $(".view");
  if (proj && view) {
    const set = (v) => { proj.classList.toggle("ls", v === "ls"); view.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === v))); try { localStorage.setItem("bl-view", v); } catch {} };
    view.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) set(b.dataset.v); });
    let saved = null; try { saved = localStorage.getItem("bl-view"); } catch {}
    if (saved) set(saved);
  }

  /* the twin's dotted core */
  const cv = $("#sphere");
  if (cv) {
    const G = window.GRAPH || []; const nc = $("#nodeCount"); if (nc) nc.textContent = G.length;
    const x = cv.getContext("2d"), pts = [], N = 520, golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i; pts.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
    let W = 0, H = 0, a = 0, visible = true;
    const size = () => { const d = devicePixelRatio || 1, b = cv.getBoundingClientRect(); W = cv.width = Math.max(1, b.width * d); H = cv.height = Math.max(1, b.height * d); };
    size(); addEventListener("resize", size);
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);
    const draw = () => {
      if (visible) {
        x.clearRect(0, 0, W, H); const R = Math.min(W, H) * .44, cx = W / 2, cy = H / 2, ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(.35), st = Math.sin(.35), d = devicePixelRatio || 1;
        for (const [px, py, pz] of pts) { const x1 = px * ca + pz * sa, z1 = -px * sa + pz * ca, y2 = py * ct - z1 * st, z2 = py * st + z1 * ct, s = (z2 + 1.4) / 2.4;
          x.globalAlpha = .12 + s * .8; x.fillStyle = z2 > .55 ? "#9b8cff" : "#eeeae2"; x.fillRect(cx + x1 * R, cy + y2 * R, (1 + s) * d * .8, (1 + s) * d * .8); }
        x.globalAlpha = 1; a += .005;
      }
      if (!reduce) requestAnimationFrame(draw);
    };
    draw();
  }
})();
