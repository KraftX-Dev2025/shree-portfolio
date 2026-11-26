/* "Download my memory": a panel with a preview of the bio card (1080x1350 PNG drawn from window.PERSONA)
   and three actions: save the card, copy the "Think like Shree" prompt (src/prompt.txt), or download both as one .md. */
(() => {
  const btn = document.getElementById("mem-dl");
  if (!btn) return;
  const P = window.PERSONA, S = window.SITE || {};
  const C = { ink: "#07080c", line: "#252839", paper: "#eeeae2", mute: "#8d91a4", blue: "#9b8cff", violet: "#b48ff0", deep: "#1a1033" };
  const DISPLAY = '"Bricolage Grotesque", "Space Grotesk", system-ui, sans-serif';
  const BODY = '"Inter", system-ui, sans-serif';
  const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';

  /* ---------- the card ---------- */
  const wrap = (x, text, maxW) => { const words = text.split(" "), lines = []; let cur = "";
    for (const w of words) { const t = cur ? cur + " " + w : w; if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur); return lines; };
  const diamond = (x, cx, cy, r, fill) => { x.save(); x.translate(cx, cy); x.rotate(Math.PI / 4); x.fillStyle = fill; x.fillRect(-r, -r, r * 2, r * 2); x.restore(); };
  function mascot(x, cx, cy, k) { // the twin, small, top-right
    x.save(); x.translate(cx, cy); x.scale(k, k);
    const glow = x.createRadialGradient(0, 0, 0, 0, 0, 90); glow.addColorStop(0, "rgba(139,92,246,.45)"); glow.addColorStop(1, "rgba(139,92,246,0)");
    x.fillStyle = glow; x.fillRect(-100, -100, 200, 200);
    const g = x.createLinearGradient(-42, -51, 42, 51); g.addColorStop(0, "#f0d2f8"); g.addColorStop(.55, C.violet); g.addColorStop(1, "#7d55e6");
    x.fillStyle = "#9f78ec"; x.beginPath(); x.roundRect(-52, -18, 16, 32, 8); x.roundRect(36, -18, 16, 32, 8); x.fill();
    x.fillStyle = g; x.beginPath(); x.roundRect(-42, -51, 84, 102, 40); x.fill();
    for (const ex of [-15, 15]) { x.fillStyle = "#fff"; x.beginPath(); x.ellipse(ex, -11, 9.5, 10.5, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.deep; x.beginPath(); x.arc(ex + 1, -9, 5.4, 0, Math.PI * 2); x.fill(); x.fillStyle = "#fff"; x.beginPath(); x.arc(ex - 1, -11, 1.8, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.violet; x.beginPath(); x.rect(ex - 11, -23, 22, 10); x.fill(); }
    x.strokeStyle = C.deep; x.lineWidth = 4; x.lineCap = "round";
    x.beginPath(); x.moveTo(-25, -27); x.lineTo(-7, -22); x.moveTo(7, -22); x.lineTo(25, -27); x.stroke();
    x.beginPath(); x.moveTo(-16, 9); x.quadraticCurveTo(0, 20, 16, 9); x.stroke();
    x.lineWidth = 2.2; x.beginPath(); x.roundRect(-28, -24, 26, 25, 10); x.roundRect(2, -24, 26, 25, 10); x.stroke();
    diamond(x, 0, 32, 4.5, C.blue); x.restore();
  }
  let cardCache = null;
  async function drawCard() {
    if (cardCache) return cardCache;
    const W = 1080, H = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
    try { await Promise.all([`700 120px ${DISPLAY}`, `500 40px ${DISPLAY}`, `400 26px ${BODY}`, `italic 400 24px ${BODY}`, `400 18px ${MONO}`].map((f) => document.fonts.load(f))); await document.fonts.ready; } catch {}
    x.fillStyle = C.ink; x.fillRect(0, 0, W, H);
    const bg = x.createRadialGradient(W * .85, 180, 0, W * .85, 180, 560); bg.addColorStop(0, "rgba(139,92,246,.14)"); bg.addColorStop(1, "rgba(139,92,246,0)"); x.fillStyle = bg; x.fillRect(0, 0, W, H);
    const L = 88, R = W - 88; let y = 120;
    const eyebrow = (t, yy) => { x.fillStyle = C.mute; x.font = `400 18px ${MONO}`; x.letterSpacing = "4px"; x.fillText(t, L, yy); x.letterSpacing = "0px"; };
    eyebrow("MEMORY EXPORT · BIO", y);
    mascot(x, R - 70, 150, 1.05);
    y += 120; x.fillStyle = C.paper; x.font = `700 120px ${DISPLAY}`; x.letterSpacing = "-5px"; x.fillText((S.name || "Shree").toUpperCase(), L - 4, y);
    const nw = x.measureText((S.name || "Shree").toUpperCase()).width; x.letterSpacing = "0px"; diamond(x, L + nw + 22, y - 20, 11, C.blue);
    y += 60; x.font = `500 34px ${DISPLAY}`; x.fillStyle = C.violet; for (const l of wrap(x, P.archetype, R - L)) { x.fillText(l, L, y); y += 42; }
    y += 16; x.font = `400 24px ${BODY}`; x.fillStyle = "#c9c6bf"; for (const l of wrap(x, P.bio, R - L)) { x.fillText(l, L, y); y += 34; }
    y += 20; x.strokeStyle = C.line; x.lineWidth = 1; x.beginPath(); x.moveTo(L, y); x.lineTo(R, y); x.stroke();
    const colW = (R - L - 48) / 2, col = (title, items, cx) => { let yy = y + 48; x.fillStyle = C.mute; x.font = `400 18px ${MONO}`; x.letterSpacing = "4px"; x.fillText(title, cx, yy); x.letterSpacing = "0px"; yy += 38;
      x.font = `400 22px ${BODY}`; for (const it of items) { const ls = wrap(x, it, colW - 28); diamond(x, cx + 6, yy - 8, 4.5, C.blue); x.fillStyle = C.paper; ls.forEach((l, i) => x.fillText(l, cx + 26, yy + i * 29)); yy += ls.length * 29 + 12; } return yy; };
    const yEnd = Math.max(col("HOW HE THINKS", P.thinks, L), col("HOW HE WORKS", P.works, L + colW + 48));
    y = yEnd + 8; x.beginPath(); x.moveTo(L, y); x.lineTo(R, y); x.stroke();
    const qa = (label, text, yy) => { x.fillStyle = C.mute; x.font = `400 18px ${MONO}`; x.letterSpacing = "4px"; x.fillText(label, L, yy); x.letterSpacing = "0px";
      x.fillStyle = C.paper; x.font = `500 26px ${DISPLAY}`; const ls = wrap(x, text, R - L); ls.forEach((l, i) => x.fillText(l, L, yy + 36 + i * 32)); return yy + 36 + ls.length * 32; };
    y = qa("ASK HIM ABOUT", P.askAbout, y + 46); y = qa("DON'T ASK HIM ABOUT", P.dontAsk, y + 26); window.__cardBottom = y;
    x.beginPath(); x.moveTo(L, H - 120); x.lineTo(R, H - 120); x.stroke();
    x.fillStyle = C.mute; x.font = `italic 400 24px ${BODY}`; x.fillText(P.banter, L, H - 74);
    x.font = `400 17px ${MONO}`; x.fillStyle = "#5c6075"; x.fillText(P.url + "/prompt", L, H - 40);
    return (cardCache = cv);
  }

  /* ---------- helpers ---------- */
  const save = (blob, name) => { const url = URL.createObjectURL(blob), a = document.createElement("a");
    if ("download" in a) { a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); } else window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60000); };
  let promptText = null;
  const getPrompt = async () => promptText || (promptText = await (await fetch("prompt.txt", { cache: "no-cache" })).text());
  const bioMd = () => [`# ${S.name || "Shree"}`, "", `*${P.archetype}*`, "", P.bio, "", "## How he thinks", ...P.thinks.map((t) => `- ${t}`), "", "## How he works", ...P.works.map((t) => `- ${t}`), "",
    `**Ask him about:** ${P.askAbout}`, "", `**Don't ask him about:** ${P.dontAsk}`, "", "---", ""].join("\n");
  const flashLabel = (el, t) => { const o = el.dataset.label || (el.dataset.label = el.textContent); el.textContent = t; clearTimeout(el._t); el._t = setTimeout(() => (el.textContent = o), 2000); };

  /* ---------- panel ---------- */
  const css = document.createElement("style");
  css.textContent = `
  #mem-panel { border: 1px solid var(--line); background: var(--panel); color: var(--paper); border-radius: 18px; padding: 0; width: min(880px, calc(100vw - 32px)); max-height: calc(100vh - 48px); }
  #mem-panel::backdrop { background: rgba(7,8,12,.78); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
  #mem-panel .mp { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; padding: 24px; }
  #mem-panel .prev { background: var(--ink); border: 1px solid var(--line); border-radius: 12px; aspect-ratio: 1080 / 1350; display: grid; place-items: center; overflow: hidden; }
  #mem-panel .prev img { width: 100%; height: 100%; object-fit: contain; display: block; }
  #mem-panel .side { display: grid; align-content: start; gap: 14px; }
  #mem-panel h2 { font-size: 30px; font-weight: 500; }
  #mem-panel p { margin: 0; color: var(--mute); font-size: 15px; }
  #mem-panel .acts { display: grid; gap: 10px; margin-top: 8px; }
  #mem-panel .acts .btn { justify-content: space-between; }
  #mem-panel .small { font: 12px var(--mono); color: var(--mute); }
  #mem-panel .small a { color: var(--diamond); }
  #mem-panel .x { position: absolute; top: 12px; right: 14px; background: none; border: 0; color: var(--mute); font: 12px var(--mono); letter-spacing: .1em; text-transform: uppercase; cursor: pointer; padding: 6px; }
  #mem-panel .x:hover { color: var(--paper); }
  @media (max-width: 680px) { #mem-panel .mp { grid-template-columns: 1fr; padding: 44px 18px 18px; gap: 18px; } #mem-panel .prev { max-height: 46vh; aspect-ratio: auto; } #mem-panel .prev img { max-height: 46vh; } }`;
  document.head.append(css);
  const dlg = document.createElement("dialog");
  dlg.id = "mem-panel"; dlg.setAttribute("aria-label", "Download my bio and POV prompt");
  dlg.innerHTML = `<button class="x" type="button" data-close>Close</button><div class="mp">
    <div class="prev"><img id="mem-img" alt="Shree's bio card"></div>
    <div class="side">
      <span class="eyebrow">Memory export</span>
      <h2>My bio, and a prompt that thinks like me.</h2>
      <p>The card is the short version. The prompt goes into ChatGPT, Claude or any assistant and answers from my point of view.</p>
      <div class="acts">
        <button class="btn" type="button" id="mem-png">Download bio (PNG) <span>↓</span></button>
        <button class="btn" type="button" id="mem-copy">Copy POV prompt <span>⧉</span></button>
        <button class="btn primary" type="button" id="mem-md">Download both (.md) <span>↓</span></button>
      </div>
      <span class="small">Shareable prompt: <a href="prompt" target="_blank" rel="noopener">/prompt</a></span>
    </div></div>`;
  document.body.append(dlg);
  const img = dlg.querySelector("#mem-img");
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });

  btn.addEventListener("click", async () => {
    dlg.showModal();
    if (!img.src) { try { img.src = (await drawCard()).toDataURL("image/png"); } catch {} }
    getPrompt().catch(() => {});
  });
  dlg.querySelector("#mem-png").addEventListener("click", async (e) => {
    const b = e.currentTarget; try { const cv = await drawCard(); save(await new Promise((r) => cv.toBlob(r, "image/png")), "shree-bio.png"); flashLabel(b, "Saved to Downloads"); } catch { flashLabel(b, "Couldn't save it, try again"); }
  });
  dlg.querySelector("#mem-copy").addEventListener("click", async (e) => {
    const b = e.currentTarget;
    try { const t = await getPrompt(); await navigator.clipboard.writeText(t); flashLabel(b, "Copied"); }
    catch { try { const t = await getPrompt(), ta = document.createElement("textarea"); ta.value = t; dlg.append(ta); ta.select(); document.execCommand("copy"); ta.remove(); flashLabel(b, "Copied"); } catch { flashLabel(b, "Open /prompt to copy it"); } }
  });
  dlg.querySelector("#mem-md").addEventListener("click", async (e) => {
    const b = e.currentTarget;
    try { const md = bioMd() + "\n" + (await getPrompt()) + "\n\n_" + P.banter + "_\n"; save(new Blob([md], { type: "text/markdown;charset=utf-8" }), "shree-memory.md"); flashLabel(b, "Saved to Downloads"); }
    catch { flashLabel(b, "Couldn't save it, try again"); }
  });
})();
