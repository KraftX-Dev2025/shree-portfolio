/* Projects page: renders window.VENTURES grouped by window.INDUSTRIES, with industry and type filters. */
(() => {
  const V = window.VENTURES, IND = window.INDUSTRIES;
  const TYPES = { venture: "Venture", client: "Client · KraftX", experiment: "Experiment" };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return "Visit"; } };

  // Industries in the order declared, plus any key used in data but missing from INDUSTRIES.
  const keys = [...new Set([...Object.keys(IND), ...V.map((v) => v.industry)])].filter((k) => V.some((v) => v.industry === k));
  const label = (k) => IND[k] || k;

  const stats = [
    [V.length, "Projects"],
    [V.filter((v) => v.type === "venture").length, "Ventures"],
    [V.filter((v) => v.type === "client").length, "Client builds"],
    [V.filter((v) => v.href).length, "Live now"],
    [keys.length, "Industries"]
  ];
  document.getElementById("stats").innerHTML = stats.map(([n, l]) => `<div><b>${n}</b>${l}</div>`).join("");

  let ind = "all", type = "all";
  try { const h = decodeURIComponent(location.hash.slice(1)); if (keys.includes(h)) ind = h; } catch {}

  const fl = document.getElementById("filters");
  const chip = (k, txt, group, on) => `<button class="chip${k === "sep" ? " sep" : ""}" type="button" data-g="${group}" data-k="${k}" aria-pressed="${on}">${esc(txt)}</button>`;
  function drawFilters() {
    fl.innerHTML = chip("all", "All industries", "ind", ind === "all") + keys.map((k) => chip(k, label(k), "ind", ind === k)).join("")
      + `<span style="flex:none;width:1px;background:var(--line);margin:0 6px"></span>`
      + chip("all", "All types", "type", type === "all") + Object.entries(TYPES).map(([k, t]) => chip(k, t, "type", type === k)).join("");
  }
  fl.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    if (b.dataset.g === "ind") { ind = b.dataset.k; history.replaceState(null, "", ind === "all" ? location.pathname : "#" + ind); }
    else type = b.dataset.k;
    drawFilters(); draw();
  });

  const NET = [["instagram", "Instagram"], ["linkedin", "LinkedIn"], ["x", "X"], ["youtube", "YouTube"], ["facebook", "Facebook"]];
  const socials = (l) => { const a = NET.filter(([k]) => l && l[k]).map(([k, t]) => `<a href="${esc(l[k])}" target="_blank" rel="noopener">${t}</a>`); return a.length ? `<div class="soc">${a.join("<span>·</span>")}</div>` : ""; };
  const card = (v) => `<article class="card">
    <div class="meta">${TYPES[v.type] ? `<span class="type t-${esc(v.type)}">${esc(TYPES[v.type])}</span>` : "<span></span>"}<span>${esc(v.year)}</span></div>
    <h3>${esc(v.name)}</h3>
    <p>${esc(v.blurb)}</p>
    ${v.stack ? `<div class="stack">${esc(v.stack)}</div>` : ""}
    <div class="links">
      ${v.href ? `<a class="go" href="${esc(v.href)}" target="_blank" rel="noopener">${esc(host(v.href))} ↗</a>` : `<span class="soon">Case study soon</span>`}
      ${v.repo ? `<a class="repo" href="${esc(v.repo)}" target="_blank" rel="noopener">Code</a>` : ""}
    </div>
    ${socials(v.links)}
  </article>`;

  const list = document.getElementById("list");
  function draw() {
    const html = keys.filter((k) => ind === "all" || ind === k).map((k) => {
      // Live projects first within each industry.
      const items = V.filter((v) => v.industry === k && (type === "all" || v.type === type)).sort((a, b) => !!b.href - !!a.href);
      if (!items.length) return "";
      return `<section class="ind" id="${esc(k)}"><h2>${esc(label(k))} <small>${items.length}</small></h2><div class="grid">${items.map(card).join("")}</div></section>`;
    }).join("");
    list.innerHTML = html || `<p class="empty">Nothing here yet.</p>`;
  }
  drawFilters(); draw();
})();
