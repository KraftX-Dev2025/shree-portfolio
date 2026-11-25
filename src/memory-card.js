/* "Download my memory": draws a 1080x1350 personality card from window.PERSONA and saves it as a PNG. */
(() => {
  const btn = document.getElementById("mem-dl");
  if (!btn) return;
  const P = window.PERSONA, S = window.SITE || {};
  const C = { ink: "#07080c", panel: "#10121a", line: "#252839", paper: "#eeeae2", mute: "#8d91a4", blue: "#5aa9ff" };
  const DISPLAY = '"Bricolage Grotesque", "Space Grotesk", system-ui, sans-serif';
  const BODY = '"Inter", system-ui, sans-serif';
  const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';

  const diamond = (x, y, r, fill) => { x0.save(); x0.translate(x, y); x0.rotate(Math.PI / 4); x0.fillStyle = fill; x0.fillRect(-r, -r, r * 2, r * 2); x0.restore(); };
  let x0;

  async function draw() {
    const W = 1080, H = 1350, cv = document.createElement("canvas");
    cv.width = W; cv.height = H; const x = (x0 = cv.getContext("2d"));
    try {
      await Promise.all([`700 150px ${DISPLAY}`, `500 34px ${DISPLAY}`, `400 22px ${MONO}`, `italic 400 26px ${BODY}`].map((f) => document.fonts.load(f)));
      await document.fonts.ready;
    } catch {}

    // background with a faint blue glow
    x.fillStyle = C.ink; x.fillRect(0, 0, W, H);
    const g = x.createRadialGradient(W * .78, H * .42, 0, W * .78, H * .42, 620);
    g.addColorStop(0, "rgba(90,169,255,.10)"); g.addColorStop(1, "rgba(90,169,255,0)");
    x.fillStyle = g; x.fillRect(0, 0, W, H);

    const L = 90;
    x.textBaseline = "alphabetic";
    x.fillStyle = C.mute; x.font = `400 20px ${MONO}`; x.letterSpacing = "4px";
    x.fillText("MEMORY EXPORT · PERSONALITY CHART", L, 120);
    x.letterSpacing = "-6px";
    x.fillStyle = C.paper; x.font = `700 150px ${DISPLAY}`; x.fillText((S.name || "Shree").toUpperCase(), L - 6, 262);
    const nameW = x.measureText((S.name || "Shree").toUpperCase()).width;
    diamond(L + nameW + 26, 236, 13, C.blue);
    x.letterSpacing = "0px";
    x.fillStyle = C.mute; x.font = `400 34px ${DISPLAY}`; x.fillText(S.tagline || "", L, 318);

    // radar
    const cx = W / 2, cy = 655, R = 235, n = P.traits.length, ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, v) => [cx + Math.cos(ang(i)) * R * v, cy + Math.sin(ang(i)) * R * v];
    x.lineWidth = 1; x.strokeStyle = C.line;
    for (let r = 1; r <= 5; r++) { x.beginPath(); for (let i = 0; i <= n; i++) { const [px, py] = pt(i % n, r / 5); i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke(); }
    for (let i = 0; i < n; i++) { const [px, py] = pt(i, 1); x.beginPath(); x.moveTo(cx, cy); x.lineTo(px, py); x.stroke(); }
    x.beginPath(); P.traits.forEach(([, v], i) => { const [px, py] = pt(i, v / 10); i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath();
    x.fillStyle = "rgba(90,169,255,.16)"; x.fill(); x.strokeStyle = C.blue; x.lineWidth = 2; x.stroke();
    P.traits.forEach(([, v], i) => { const [px, py] = pt(i, v / 10); diamond(px, py, 5, C.blue); });
    x.font = `400 20px ${MONO}`; x.letterSpacing = "3px";
    P.traits.forEach(([t, v], i) => {
      const [px, py] = pt(i, 1.2), c = Math.cos(ang(i));
      x.textAlign = Math.abs(c) < .2 ? "center" : c > 0 ? "left" : "right";
      x.fillStyle = C.paper; x.fillText(t.toUpperCase(), px, py + 4);
      x.fillStyle = C.blue; x.fillText(`${v}/10`, px, py + 32);
    });
    x.textAlign = "left"; x.letterSpacing = "0px";

    // core memories
    let y = 1015;
    x.fillStyle = C.mute; x.font = `400 20px ${MONO}`; x.letterSpacing = "4px"; x.fillText("CORE MEMORIES", L, y); x.letterSpacing = "0px";
    x.font = `500 32px ${DISPLAY}`;
    P.core.forEach((m, i) => {
      const col = i % 2, row = Math.floor(i / 2), tx = L + col * 460, ty = y + 62 + row * 52;
      diamond(tx + 6, ty - 10, 5, C.blue); x.fillStyle = C.paper; x.fillText(m, tx + 26, ty);
    });

    // banter footer
    x.strokeStyle = C.line; x.lineWidth = 1; x.beginPath(); x.moveTo(L, 1230); x.lineTo(W - L, 1230); x.stroke();
    x.fillStyle = C.mute; x.font = `italic 400 26px ${BODY}`; x.fillText(P.banter, L, 1280);
    x.font = `400 18px ${MONO}`; x.fillStyle = "#5c6075"; x.fillText(P.url, L, 1316);
    return cv;
  }

  btn.addEventListener("click", async () => {
    const label = btn.textContent; btn.textContent = "Saving…"; btn.disabled = true;
    try {
      const cv = await draw();
      const blob = await new Promise((r) => cv.toBlob(r, "image/png"));
      const url = URL.createObjectURL(blob), a = document.createElement("a");
      if ("download" in a) { a.href = url; a.download = "shree-memory.png"; document.body.append(a); a.click(); a.remove(); }
      else location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      btn.textContent = "Saved to Downloads";
    } catch (e) { btn.textContent = "Couldn't save it, try again"; }
    setTimeout(() => { btn.textContent = label; btn.disabled = false; }, 2600);
  });
})();
