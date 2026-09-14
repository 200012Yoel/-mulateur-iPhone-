
    "use strict";
    /* Détection : sommes-nous dans l'iframe de l'émulateur ? */
    if (window.self !== window.top) {
      document.documentElement.classList.add("embedded");
    }
    /* ============================================================
       DONNÉES
       ============================================================ */
    const GOOGLE_G = `<svg viewBox="0 0 48 48" width="100%" height="100%"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.8l7.8 6.1C12.3 14 17.6 9.5 24 9.5z" /><path fill="#4285F4" d="M46.6 24.6c0-1.6-.2-3.2-.5-4.6H24v9.1h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.2-10.1 7.2-17.5z" /><path fill="#FBBC05" d="M10.4 28.4a14.6 14.6 0 0 1 0-9.3l-7.8-6.1a23.6 23.6 0 0 0 0 21.5z" /><path fill="#34A853" d="M24 47.5c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.4 0-11.7-4.5-13.6-10.4l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5z" /></svg>`;

    const SUGGESTION_CARDS = [
      { t: "Saraya - Assistant IA de développement", d: "hands-achievements-glossary-cheese.trycloudflare.com", w: "La semaine dernière", bg: "#2c2c2e", ico: { type: "letter", v: "S", bg: "#48484a" }, q: "Saraya assistant" },
      { t: "iPhone 16 prends 512 giga", d: "google.com", w: "Aujourd’hui", bg: "#a63a2c", ico: { type: "google" }, search: true, q: "iPhone 16 prends 512 giga" },
      { t: "Local agent – Applications sur Google Play", d: "play.google.com", w: "La semaine dernière", bg: "#2c8296", ico: { type: "art" }, q: "Local agent Google Play" },
      { t: "À propos des batteries et performances de l’iPhone", d: "support.apple.com", w: "Aujourd’hui", bg: "#dedee0", light: true, ico: { type: "apple" }, q: "batterie iPhone performances support Apple" },
      { t: "Tellama — modèles GGUF locaux", d: "tellama.app", w: "La semaine dernière", bg: "#14413a", ico: { type: "letter", v: "T", bg: "#0d2e29" }, q: "Tellama GGUF Android" },
      { t: "Partitions musique HaTikvah", d: "imslp.org", w: "Il y a deux semaines", bg: "#3a3a3c", ico: { type: "letter", v: "♪", bg: "#5a5a5c" }, q: "partitions HaTikvah piano" }
    ];

    const HISTORY = [
      {
        day: "vendredi 24 juillet", items: [
          { t: "Google Play Closed Testing | Professional Testers", d: "testerscommunity.com", w: "il y a 3 semaines" },
          { t: "MapLibre GL JS — Documentation", d: "maplibre.org", w: "il y a 3 semaines" }]
      },
      {
        day: "mercredi 22 juillet", items: [
          { t: "iPhone 16 prends 512 giga - Recherche Google", d: "google.com", w: "il y a 3 semaines" }]
      },
      {
        day: "mardi 21 juillet", items: [
          { t: "partitions musique Juif לב דוד - Recherche Google", d: "google.com", w: "il y a 3 semaines" },
          { t: "À propos des batteries et performances de l’iPhone", d: "support.apple.com", w: "il y a 3 semaines" }]
      },
      {
        day: "lundi 20 juillet", items: [
          { t: "Local agent – Applications sur Google Play", d: "play.google.com", w: "il y a 3 semaines" }]
      },
      {
        day: "vendredi 17 juillet", items: [
          { t: "Ollama — Download", d: "ollama.com", w: "il y a 4 semaines" }]
      },
      {
        day: "mercredi 15 juillet", items: [
          { t: "Web Audio API — MDN", d: "developer.mozilla.org", w: "il y a 4 semaines" }]
      },
      { day: "lundi 13 juillet", items: [{ t: "Canvas 2D — perspective tunnel", d: "stackoverflow.com", w: "il y a 4 semaines" }] },
      { day: "dimanche 12 juillet", items: [{ t: "RATP — Matériel roulant MF 01", d: "fr.wikipedia.org", w: "il y a 4 semaines" }] },
      { day: "vendredi 10 juillet", items: [{ t: "Tellama - GGUF local", d: "play.google.com", w: "il y a un mois" }] },
      { day: "jeudi 9 juillet", items: [{ t: "Apple Design Resources", d: "developer.apple.com", w: "il y a un mois" }] },
      { day: "mercredi 8 juillet", items: [{ t: "glassmorphism CSS backdrop-filter", d: "css-tricks.com", w: "il y a un mois" }] }
    ];

    const BOOKMARKS = [
      { t: "Favoris", d: "12 éléments" },
      { t: "Apple Developer", d: "developer.apple.com" },
      { t: "MDN Web Docs", d: "developer.mozilla.org" },
      { t: "Google", d: "google.com" },
      { t: "Historique de lecture", d: "3 éléments" }
    ];

    /* corpus de complétions style Google */
    const CORPUS = ["google traduction", "google maps", "google play", "google traduction anglais français", "google drive", "google agenda",
      "météo paris", "météo demain", "actualités", "youtube", "facebook", "leboncoin", "chatgpt", "claude ai", "anthropic",
      "iphone 16 prix", "iphone 16 pro max", "ios 26 nouveautés", "apple store", "macbook air m4",
      "paris metro plan", "ratp horaires", "sncf connect", "vélib", "navigo",
      "recette crêpes", "recette poulet curry", "recette pain maison",
      "javascript map", "css backdrop-filter", "html canvas tutorial", "web audio api", "maplibre gl js", "three js documentation",
      "ollama models", "gguf quantization", "llama cpp", "python tkinter", "react hooks",
      "hatikvah paroles", "partitions piano gratuites", "solfège débutant", "piano tiles",
      "traduction anglais français", "conjugaison prendre", "synonyme important", "définition résilience"];
    const SUFFIXES = ["traduction", "maps", "play", "france", "2026", "avis", "prix", "gratuit", "en ligne", "pdf", "horaires", "wikipedia", "définition", "tutoriel"];

    /* ============================================================
       ÉTAT
       ============================================================ */
    const S = {
      privateMode: true,
      tabs: { priv: [], norm: [] },
      active: { priv: null, norm: null },
      pane: "start",
      query: "",
      view: "browser"
    };
    let uid = 1;
    const $ = s => document.querySelector(s);
    const $$ = s => [...document.querySelectorAll(s)];
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    function bucket() { return S.privateMode ? "priv" : "norm"; }
    function tabs() { return S.tabs[bucket()]; }
    function activeTab() { return tabs().find(t => t.id === S.active[bucket()]) || tabs()[0]; }

    function newTab() {
      const t = { id: uid++, kind: "start", title: "Page de démarrage", query: "", url: "", results: null, state: "idle", history: [] };
      tabs().push(t); S.active[bucket()] = t.id; return t;
    }

    /* ============================================================
       MISE À L'ÉCHELLE / HORLOGE
       ============================================================ */
    function fit() {
      const stage = $("#stage");
      if (stage) stage.style.transform = "none";
      renderTabs();
    }
    addEventListener("resize", fit);
    addEventListener("orientationchange", () => setTimeout(fit, 120));
    if (window.visualViewport) window.visualViewport.addEventListener("resize", fit);

    function tick() {
      const d = new Date();
      const clockEl = $("#clock");
      if (clockEl) clockEl.textContent = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    }
    setInterval(tick, 10000);

    /* ============================================================
       PAGE DE DÉMARRAGE
       ============================================================ */
    function cardIcon(ico) {
      if (ico.type === "google") return `<div class="ico" style="background:transparent;box-shadow:none"><div style="width:46px;height:46px">${GOOGLE_G}</div></div>`;
      if (ico.type === "art") return `<div class="ico" style="background:linear-gradient(140deg,#9fd8e8,#2b6c8a 45%,#e8d9a8 70%,#1d4b63);position:relative">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.55),transparent 45%)"></div>
      <span style="position:absolute;bottom:3px;left:0;right:0;text-align:center;font-size:5.5px;font-weight:700;letter-spacing:.4px;color:#fff">LOCAL AGENT</span></div>`;
      if (ico.type === "apple") return `<div class="shot" style="background:#fff;padding:5px;flex-direction:column;align-items:flex-start;color:#000;border-radius:8px">
      <div style="width:20px;height:20px;border-radius:5px;background:#1e8bff;display:flex;align-items:center;justify-content:center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M3 21l3-1 12-12-2-2L4 18z"/><circle cx="19.5" cy="4.5" r="2.4"/></svg></div>
      <div style="font-size:7.5px;font-weight:700;margin-top:5px">Pièces et réparation</div>
      <div style="font-size:5.6px;line-height:1.35;color:#333;margin-top:2px">L’historique des pièces et des réparations est collecté par Apple, et indique les informations sur le statut de cet iPhone, ainsi que des détails concernant ses réparations.</div>
      <div style="font-size:5.6px;color:#1e6fff;margin-top:1px">En savoir plus…</div></div>`;
      return `<div class="ico" style="background:${ico.bg}">${ico.v}</div>`;
    }
    function renderCards() {
      const cardsEl = $("#cards");
      if (!cardsEl) return;
      cardsEl.innerHTML = SUGGESTION_CARDS.map((c, i) => `
    <button class="card ${c.light ? "light" : ""}" data-card="${i}" style="background:${c.bg}">
      <div class="thumbzone">${cardIcon(c.ico)}</div>
      <div class="meta">
        <div class="t">${c.search ? `<svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="flex-shrink:0"><circle cx="7.6" cy="7.6" r="5.6" /><path d="M11.8 11.8 16.4 16.4" /></svg>` : ""}<span style="overflow:hidden;text-overflow:ellipsis">${esc(c.t)}</span></div>
        <div class="d">${esc(c.d)}</div>
        <div class="w">${esc(c.w)}</div>
      </div>
    </button>`).join("");
      $$("#cards .card").forEach(b => b.onclick = () => {
        const c = SUGGESTION_CARDS[+b.dataset.card];
        runSearch(c.q);
      });
    }

    function renderHistory() {
      const histEl = $("#historyRows");
      if (!histEl) return;
      histEl.innerHTML = HISTORY.map((g, i) => `
    <button class="row" data-day="${i}">
      <div class="lbl">${esc(g.day)}</div>
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="#636366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5 7 7.5l-5.5 6"/></svg>
    </button>`).join("");
      $$("#historyRows .row").forEach(b => b.onclick = () => {
        const g = HISTORY[+b.dataset.day];
        $("#historyRows").innerHTML = `<button class="row" id="backDays"><div class="lft">
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="#0a84ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)"><path d="M1.5 1.5 7 7.5l-5.5 6"/></svg>
        <div class="txt"><div class="lbl" style="color:#0a84ff">${esc(g.day)}</div></div></div></button>` +
          g.items.map(it => `<button class="row hitem" data-q="${esc(it.t)}"><div class="lft">
        <svg width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#8e8e93" stroke-width="1.8"><circle cx="13" cy="13" r="9.6"/><path d="M13 7.3V13l-4.6 3" stroke-linecap="round"/></svg>
        <div class="txt"><div class="lbl">${esc(it.t)}</div><div class="sub">${esc(it.d)} · Consultation : ${esc(it.w)}</div></div></div></button>`).join("");
        const backBtn = $("#backDays");
        if (backBtn) backBtn.onclick = renderHistory;
        $$(".hitem").forEach(x => x.onclick = () => runSearch(x.dataset.q.replace(/ - Recherche Google$/, "")));
      });
    }

    function renderBookmarks() {
      const marksEl = $("#marksRows");
      if (!marksEl) return;
      marksEl.innerHTML = BOOKMARKS.map(b => `
    <button class="row"><div class="lft">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3h12v18l-6-5-6 5z"/></svg>
      <div class="txt"><div class="lbl">${esc(b.t)}</div><div class="sub">${esc(b.d)}</div></div></div>
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" stroke="#636366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5 7 7.5l-5.5 6"/></svg>
    </button>`).join("");
    }

    /* ============================================================
       NAVIGATION ENTRE PANNEAUX
       ============================================================ */
    function showPane(p) {
      if (!p) return;
      S.pane = p;
      const t = activeTab();
      if (p !== "web" && t) { t.kind = "start"; }
      $$(".pane").forEach(x => x.classList.remove("on"));
      const map = { start: "#paneStart", marks: "#paneMarks", reading: "#paneReading", history: "#paneHistory", web: "#paneWeb" };
      const sel = map[p];
      if (sel && $(sel)) $(sel).classList.add("on");
      const seg = $("#segbar");
      if (seg) seg.style.display = p === "web" ? "none" : "flex";
      $$("#segbar button").forEach(b => b.classList.toggle("sel", b.dataset.pane === p));
      const scr = $("#scroller");
      if (scr) scr.scrollTop = 0;
      updateAddress();
    }
    const segEl = $("#segbar");
    if (segEl) {
      segEl.onclick = (e) => {
        const btn = e.target.closest("button[data-pane]");
        if (btn && btn.dataset.pane) showPane(btn.dataset.pane);
      };
    }
    $$("#segbar button").forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        showPane(b.dataset.pane);
      };
    });

    function updateAddress() {
      const t = activeTab();
      const el = $("#addressText");
      const back = $("#btnBack");
      if (t && t.kind === "web" && t.query) {
        if (el) { el.textContent = t.query; el.classList.add("filled"); }
        if (back) back.classList.remove("dim");
      } else {
        if (el) { el.textContent = "Rechercher ou saisir une adresse"; el.classList.remove("filled"); }
        if (back) back.classList.add("dim");
      }
    }

    /* ============================================================
       RECHERCHE — suggestions
       ============================================================ */
    const sugCache = new Map();
    let sugTimer = null, sugAbort = null;
    function scheduleSuggest(q) {
      clearTimeout(sugTimer);
      const key = q.trim().toLowerCase();
      if (key.length < 2 || sugCache.has(key)) return;
      sugTimer = setTimeout(async () => {
        try {
          if (sugAbort) sugAbort.abort();
          sugAbort = new AbortController();
          const res = await fetch("https://api.duckduckgo.com/?q=" + encodeURIComponent(q) + "&format=json&no_html=1&skip_disambig=1");
          if (res.ok) {
            const data = await res.json();
            const arr = [];
            if (data.Heading) arr.push(data.Heading);
            (data.RelatedTopics || []).forEach(r => { if (r.Text) arr.push(r.Text.split(" - ")[0]); });
            if (arr.length) sugCache.set(key, arr.slice(0, 6));
          }
          if (S.query.trim().toLowerCase() === key && S.view === "search") renderSuggestions();
        } catch { }
      }, 420);
    }

    function buildSuggestions(q) {
      const ql = q.toLowerCase().trim();
      const out = [];
      if (!ql) return out;
      const seen = new Set([ql]);
      (sugCache.get(ql) || []).forEach(c => { const v = c.trim(); if (v && !seen.has(v.toLowerCase())) { seen.add(v.toLowerCase()); out.push(v); } });
      CORPUS.forEach(c => { if (c.startsWith(ql) && !seen.has(c)) { seen.add(c); out.push(c); } });
      if (out.length < 4) {
        const words = ql.split(/\s+/);
        const last = words[words.length - 1];
        CORPUS.forEach(c => { if (out.length < 6 && c.includes(last) && last.length > 2 && !seen.has(c)) { seen.add(c); out.push(c); } });
      }
      SUFFIXES.forEach(s => { if (out.length < 5 && !seen.has(ql + " " + s)) { seen.add(ql + " " + s); out.push(ql + " " + s); } });
      return out.slice(0, 5);
    }
    function historyMatches(q) {
      const ql = q.toLowerCase().trim(); if (!ql) return [];
      const all = [];
      HISTORY.forEach(g => g.items.forEach(it => all.push(it)));
      return all.filter(it => (it.t + " " + it.d).toLowerCase().includes(ql)).slice(0, 4);
    }

    function renderSuggestions() {
      const q = S.query;
      const box = $("#sugScroll");
      if (!box) return;
      if (!q.trim()) {
        box.innerHTML = `<div class="sughead">Signets, historique et onglets</div>` +
          HISTORY.slice(0, 4).flatMap(g => g.items).slice(0, 5).map(it => hRow(it)).join("");
      } else {
        const sug = buildSuggestions(q);
        const hist = historyMatches(q);
        let html = `<div class="sughead">Suggestions Google</div>`;
        html += sugRow(q, q, true);
        sug.forEach(s => html += sugRow(q, s, false));
        if (hist.length) html += `<div class="sughead" style="padding-top:22px">Signets, historique et onglets</div>` + hist.map(hRow).join("");
        box.innerHTML = html;
      }
      box.querySelectorAll("[data-go]").forEach(b => b.onclick = () => runSearch(b.dataset.go));
      box.querySelectorAll("[data-fill]").forEach(b => b.onclick = e => { e.stopPropagation(); setQuery(b.dataset.fill + " "); });
      box.scrollTop = 0;
    }
    function sugRow(q, full, exact) {
      const rest = full.toLowerCase().startsWith(q.toLowerCase()) ? full.slice(q.length) : "";
      const head = rest ? esc(q) : esc(full);
      return `<div class="sugrow" data-go="${esc(full)}">
    <svg width="26" height="26" viewBox="0 0 18 18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" style="flex-shrink:0"><circle cx="7.6" cy="7.6" r="5.6"/><path d="M11.8 11.8 16.4 16.4"/></svg>
    <div class="txt">${head}<i>${esc(rest)}</i></div>
    ${exact ? "" : `<button class="fillbtn" data-fill="${esc(full)}">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#8e8e93" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 3.5 3.5 12.5M3.5 12.5V6M3.5 12.5H10"/></svg></button>`}
  </div>`;
    }
    function hRow(it) {
      return `<div class="sugrow" data-go="${esc(it.t.replace(/ - Recherche Google$/, ""))}">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#8e8e93" stroke-width="1.7" style="flex-shrink:0"><circle cx="13" cy="13" r="9.6"/><path d="M13 7.3V13l-4.6 3" stroke-linecap="round"/></svg>
    <div class="txt"><div class="t1" style="overflow:hidden;text-overflow:ellipsis">${esc(it.t)}</div>
    <div class="t2">${esc(it.d)} · Consultation : ${esc(it.w)}</div></div>
  </div>`;
    }

    function setQuery(v) {
      S.query = v;
      const typed = $("#typed");
      if (typed) typed.textContent = v;
      renderSuggestions();
      scheduleSuggest(v);
    }
    function openSearch(prefill) {
      S.view = "search";
      const vSearch = $("#viewSearch");
      if (vSearch) vSearch.classList.add("on", "fade-in");
      setQuery(prefill || "");
    }
    function closeSearch() {
      S.view = "browser";
      const vSearch = $("#viewSearch");
      if (vSearch) vSearch.classList.remove("on", "fade-in");
    }

    /* ============================================================
       CLAVIER AZERTY
       ============================================================ */
    const K1 = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"];
    const K2 = ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"];
    const K3 = ["w", "x", "c", "v", "b", "n", "'"];
    const N1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const N2 = ["-", "/", ":", ";", "(", ")", "€", "&", "@", "\""];
    const N3 = [".", ",", "?", "!", "'"];
    let shift = false, numeric = false;

    function keyboard() {
      const row1 = numeric ? N1 : K1, row2 = numeric ? N2 : K2, row3 = numeric ? N3 : K3;
      const lbl = c => (!numeric && shift) ? c.toUpperCase() : c;
      const shiftIcon = `<svg width="21" height="21" viewBox="0 0 24 24" fill="${shift ? "#000" : "none"}" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3 3 12h4.5v7h9v-7H21z" /></svg>`;
      const delIcon = `<svg width="25" height="19" viewBox="0 0 26 20" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"><path d="M8.4 2h14a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 22.4 18h-14L1.4 10z" /><path d="M13 7l6 6M19 7l-6 6" stroke-linecap="round" /></svg>`;
      const kbdEl = $("#kbd");
      if (!kbdEl) return;
      kbdEl.innerHTML = `
        <div class="krow">${row1.map(c => `<button class="key" data-k="${c}">${lbl(c)}</button>`).join("")}</div>
     <div class="krow">${row2.map(c => `<button class="key" data-k="${c}">${lbl(c)}</button>`).join("")}</div>
     <div class="krow">
       <button class="key wide ${shift ? "" : ""}" data-act="shift" style="${shift ? "background:#fff" : ""}">${shiftIcon}</button>
       ${row3.map(c => `<button class="key" data-k="${c}">${lbl(c)}</button>`).join("")}
       <button class="key wide" data-act="del">${delIcon}</button>
     </div>
     <div class="krow">
       <button class="key num" data-act="num">${numeric ? "ABC" : "123"}</button>
       <button class="key emo" data-act="emoji"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><circle cx="12" cy="12" r="9.4"/><circle cx="8.6" cy="10" r=".9" fill="#fff"/><circle cx="15.4" cy="10" r=".9" fill="#fff"/><path d="M8 14.6a5 5 0 0 0 8 0" stroke-linecap="round"/></svg></button>
       <button class="key spc" data-k=" "></button>
       <button class="key dot" data-k=".">.</button>
       <button class="key ret" data-act="go"><svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h19M14 2l7 7-7 7"/></svg></button>
     </div>
     <div class="kbot">
       <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><circle cx="12" cy="12" r="9.6"/><ellipse cx="12" cy="12" rx="4.2" ry="9.6"/><path d="M2.6 9h18.8M2.6 15h18.8"/></svg>
       <svg width="22" height="26" viewBox="0 0 14 19" fill="#fff"><rect x="4" y="0" width="6" height="10.6" rx="3"/><path d="M1.4 8.2v1.4a5.6 5.6 0 0 0 11.2 0V8.2" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M7 15.2V18" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>
     </div>`;
      $$("#kbd .key").forEach(k => {
        k.addEventListener("click", () => {
          if (k.dataset.k !== undefined) {
            let c = k.dataset.k;
            if (!numeric && shift) c = c.toUpperCase();
            setQuery(S.query + c);
            if (shift) { shift = false; keyboard(); }
          } else {
            const a = k.dataset.act;
            if (a === "shift") { shift = !shift; keyboard(); }
            else if (a === "del") { setQuery(S.query.slice(0, -1)); }
            else if (a === "num") { numeric = !numeric; shift = false; keyboard(); }
            else if (a === "go") { if (S.query.trim()) runSearch(S.query.trim()); }
            else if (a === "emoji") { setQuery(S.query + "🙂"); }
          }
        });
      });
    }

    addEventListener("keydown", e => {
      if (S.view !== "search") return;
      if (e.key === "Enter") { e.preventDefault(); if (S.query.trim()) runSearch(S.query.trim()); }
      else if (e.key === "Backspace") { e.preventDefault(); setQuery(S.query.slice(0, -1)); }
      else if (e.key === "Escape") { closeSearch(); }
      else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) { e.preventDefault(); setQuery(S.query + e.key); }
    });

    /* ============================================================
       RECHERCHE RÉELLE (web) + rendu page Google / Site Web
       ============================================================ */
    function domainOf(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return String(u || ""); } }

    async function realSearch(q, signal) {
      try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`);
        if (res.ok) {
          const data = await res.json();
          const results = [];
          if (data.AbstractURL) {
            results.push({
              url: data.AbstractURL,
              title: data.Heading || q,
              snippet: data.AbstractText || `Informations et résultats de recherche pour ${q}.`,
              domain: domainOf(data.AbstractURL)
            });
          }
          (data.RelatedTopics || []).forEach(item => {
            if (item.FirstURL && item.Text) {
              results.push({
                url: item.FirstURL,
                title: item.Text.split(" - ")[0] || item.Text.substring(0, 40),
                snippet: item.Text,
                domain: domainOf(item.FirstURL)
              });
            }
          });
          if (results.length > 0) {
            return {
              answer: data.AbstractText ? data.AbstractText.substring(0, 250) : `Résultats pour "${q}"`,
              results: results.slice(0, 6),
              related: [`${q} actu`, `${q} définition`, `${q} fr`, `site officiel ${q}`]
            };
          }
        }
      } catch (e) { }

      return {
        answer: `Résultats de recherche pour "${q}". Explorez les sites principaux ci-dessous.`,
        results: [
          { url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(q)}`, title: `${q} — Wikipédia`, snippet: `Définition, histoire et détails complets sur ${q} en français.`, domain: "fr.wikipedia.org" },
          { url: `https://www.google.com/search?q=${encodeURIComponent(q)}`, title: `${q} - Recherche Google`, snippet: `Retrouvez les dernières actualités, images et vidéos sur ${q}.`, domain: "google.com" },
          { url: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`, title: `${q} sur YouTube`, snippet: `Vidéos et reportages concernant ${q}.`, domain: "youtube.com" }
        ],
        related: [`${q} 2026`, `${q} avis`, `comment utiliser ${q}`, `${q} prix`]
      };
    }

    function googleShell(q, body) {
      return `
          <div class="ghead">
            <div class="glogo">Google</div>
            <div class="r">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8eaed" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3a6 6 0 0 1 6 6v4l2 3H4l2-3V9a6 6 0 0 1 6-6z" /><path d="M9.6 19a2.5 2.5 0 0 0 4.8 0" /></svg>
              <div class="avatar">M</div>
            </div>
          </div>
          <div class="gsearch">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="#9aa0a6" stroke-width="2" stroke-linecap="round"><circle cx="7.6" cy="7.6" r="5.6" /><path d="M11.8 11.8 16.4 16.4" /></svg>
            <div class="q">${esc(q)}</div>
            <svg width="17" height="22" viewBox="0 0 14 19" fill="#e8eaed"><rect x="4" y="0" width="6" height="10.6" rx="3" /><path d="M1.4 8.2v1.4a5.6 5.6 0 0 0 11.2 0V8.2" fill="none" stroke="#e8eaed" stroke-width="1.6" stroke-linecap="round" /><path d="M7 15.2V18" stroke="#e8eaed" stroke-width="1.6" stroke-linecap="round" /></svg>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#e8eaed" stroke-width="1.7"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3.2" /></svg>
          </div>
          <div class="gtabs"><span>Mode IA</span><span class="a">Tous</span><span>Images</span><span>Vidéos</span><span>Actualités</span><span>Vi…</span></div>
          ${body}`;
    }

    function resultsHTML(t) {
      let body = "";
      if (t.state === "loading") {
        body = `<div class="gload"><div class="spin"></div>Recherche sur le web…</div>`;
      } else if (t.state === "error") {
        body = `<div class="gerr"><b>La recherche a échoué</b>${esc(t.error || "")}
      <br><br><button class="retry" data-retry="${esc(t.query)}">Réessayer</button></div>`;
      } else if (t.results) {
        const R = t.results;
        const chips = (R.related || []).slice(0, 6);
        const overview = R.answer ? `<div class="aio">
            <div class="aiohead">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#8ab4f8"><path d="M12 2l2.1 5.9L20 10l-5.9 2.1L12 18l-2.1-5.9L4 10l5.9-2.1z" /><path d="M18.5 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" /></svg>
              Aperçu IA</div>
            <p>${esc(R.answer)}</p></div>` : "";
        body = (chips.length ? `<div class="gchips">${chips.map(c => `<b data-chip="${esc(c)}">${esc(c)}</b>`).join("")}</div>` : "") +
          `<div class="gres">` + overview + (R.results || []).map(r => {
            const d = r.domain || domainOf(r.url || "");
            const name = d.split(".")[0].replace(/^\w/, m => m.toUpperCase());
            return `<a class="gitem" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
                <div class="src"><div class="fav"><img src="https://www.google.com/s2/favicons?sz=64&domain=${esc(d)}" alt="" onerror="this.remove()"><span>${esc((d[0] || "?").toUpperCase())}</span></div>
                  <div><div class="site">${esc(name)}</div>
                    <div class="url">${esc(r.url || d)}</div></div></div>
                <h3>${esc(r.title || "")}</h3>
                ${r.snippet ? `<p>${esc(r.snippet)}</p>` : ""}
              </a>`;
          }).join("") + `</div>`;
      }
      return googleShell(t.query, body);
    }
    function renderResults(t) {
      const gpage = $("#gpage");
      if (!gpage) return;
      gpage.innerHTML = resultsHTML(t);
      const retry = gpage.querySelector("[data-retry]");
      if (retry) retry.onclick = () => runSearch(retry.dataset.retry);
      gpage.querySelectorAll("[data-chip]").forEach(c => c.onclick = () => runSearch(c.dataset.chip));
    }

    function progress(p, on) {
      const el = $("#progress");
      if (!el) return;
      el.classList.toggle("on", on);
      el.style.width = p + "%";
    }

    async function runSearch(q) {
      q = q.trim(); if (!q) return;
      closeSearch();
      let t = activeTab() || newTab();
      if (t.query && t.kind === "web") t.history.push(t.query);
      t.kind = "web"; t.query = q; t.title = q + " - Recherche Google"; t.state = "loading"; t.results = null;
      showPane("web");
      renderResults(t);
      updateAddress();
      progress(15, true);
      let p = 15;
      const timer = setInterval(() => { p = Math.min(88, p + 9); progress(p, true); }, 260);
      try {
        let data = await realSearch(q);
        t.results = data; t.state = "done";
      } catch (err) {
        t.state = "error"; t.error = "La recherche n’a pas abouti (" + err.message + ").";
      }
      clearInterval(timer);
      progress(100, true);
      setTimeout(() => progress(0, false), 320);
      if (activeTab() === t && S.pane === "web") renderResults(t);
    }

    /* ============================================================
       ONGLETS
       ============================================================ */
    function capture(t) {
      if (!t) return;
      const scr = $("#scroller");
      if (scr) {
        t.snapHTML = scr.innerHTML;
        t.snapScroll = scr.scrollTop;
      }
    }
    function snapOf(t) {
      if (t.snapHTML != null) return t;
      t.snapScroll = 0;
      const seg = $("#segbar"), pStart = $("#paneStart");
      t.snapHTML = t.kind === "web"
        ? `<div class="pane on" style="padding-top:0"><div class="gpage">${resultsHTML(t)}</div></div>`
        : (seg ? seg.outerHTML : "") + (pStart ? pStart.outerHTML : "");
      return t;
    }
    function snapNode(t) {
      snapOf(t);
      return `<div class="in-scroll" style="padding-top:var(--sb);margin-top:${-(t.snapScroll || 0)}px">${t.snapHTML}</div>`;
    }

    function screenEl() { return document.querySelector(".screen"); }
    function scaleFactor() {
      const el = screenEl();
      if (!el) return 1;
      return el.getBoundingClientRect().width / el.offsetWidth;
    }
    function rectIn(el) {
      const s = scaleFactor(), scr = screenEl(), sr = scr ? scr.getBoundingClientRect() : { left: 0, top: 0 }, r = el.getBoundingClientRect();
      return { x: (r.left - sr.left) / s, y: (r.top - sr.top) / s, w: r.width / s, h: r.height / s };
    }
    function fullRect() { const el = screenEl(); return { x: 0, y: 0, w: el ? el.offsetWidth : window.innerWidth, h: el ? el.offsetHeight : window.innerHeight }; }

    function flip(t, from, to, rFrom, rTo, done) {
      const mask = document.createElement("div");
      mask.className = "flipmask";
      const SW = fullRect().w;
      mask.style.left = from.x + "px"; mask.style.top = from.y + "px";
      mask.style.width = from.w + "px"; mask.style.height = from.h + "px";
      mask.style.borderRadius = rFrom + "px";
      const inner = document.createElement("div");
      inner.className = "in";
      inner.style.transform = "scale(" + (from.w / SW) + ")";
      inner.innerHTML = snapNode(t);
      mask.appendChild(inner);
      const scr = screenEl();
      if (scr) scr.appendChild(mask);
      const ease = "cubic-bezier(.32,.72,0,1)", dur = 380;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        mask.style.transition = `left ${dur}ms ${ease}, top ${dur}ms ${ease}, width ${dur}ms ${ease}, height ${dur}ms ${ease}, border-radius ${dur}ms ${ease}`;
        inner.style.transition = `transform ${dur}ms ${ease}`;
        mask.style.left = to.x + "px"; mask.style.top = to.y + "px";
        mask.style.width = to.w + "px"; mask.style.height = to.h + "px";
        mask.style.borderRadius = rTo + "px";
        inner.style.transform = "scale(" + (to.w / SW) + ")";
      }));
      setTimeout(() => { mask.remove(); done && done(); }, dur + 30);
    }

    function tabFavicon(t) {
      if (t.kind === "web") return `<div class="f"><div style="width:16px;height:16px">${GOOGLE_G}</div></div>`;
      return `<svg width="20" height="20" viewBox="0 0 26 26" fill="#fff"><rect x="3" y="3" width="5.4" height="5.4" rx="1.3" /><rect x="10.3" y="3" width="5.4" height="5.4" rx="1.3" /><rect x="17.6" y="3" width="5.4" height="5.4" rx="1.3" /><rect x="3" y="10.3" width="5.4" height="5.4" rx="1.3" /><rect x="10.3" y="10.3" width="5.4" height="5.4" rx="1.3" /><rect x="17.6" y="17.6" width="5.4" height="5.4" rx="1.3" /><rect x="3" y="17.6" width="5.4" height="5.4" rx="1.3" /><rect x="10.3" y="17.6" width="5.4" height="5.4" rx="1.3" /><rect x="17.6" y="17.6" width="5.4" height="5.4" rx="1.3" /></svg>`;
    }

    function updateSegSwitch() {
      const n = S.tabs.norm.length;
      const segNorm = $("#segNormal");
      if (segNorm) segNorm.textContent = n ? (n + " onglet" + (n > 1 ? "s" : "")) : "Normal";
    }

    function renderTabs() {
      const grid = $("#tabGrid");
      if (!grid) return;
      const list = tabs();
      if (!list.length) {
        grid.className = "tabgrid one";
        grid.style.display = "block";
        grid.innerHTML = S.privateMode ? `
            <div class="tabempty">
              <svg width="76" height="90" viewBox="0 0 76 90" fill="#8e8e93">
                <rect x="16" y="20" width="11.5" height="34" rx="5.75" />
                <rect x="29.5" y="9" width="11.5" height="45" rx="5.75" />
                <rect x="43" y="12" width="11.5" height="42" rx="5.75" />
                <rect x="56.5" y="22" width="11.5" height="32" rx="5.75" />
                <rect x="3" y="38" width="11.5" height="30" rx="5.75" transform="rotate(22 8.75 53)" />
                <path d="M16 42h52v14c0 18-11.6 29-26 29S16 74 16 56z" />
              </svg>
              <h2>Navigation privée</h2>
              <p>La navigation privée apporte des protections supplémentaires pour votre confidentialité dans les onglets. Une fois un onglet fermé, Safari ne consignera ni les pages que vous avez consultées, ni l’historique de vos recherches, ni vos informations de remplissage automatique.</p>
            </div>` : `
            <div class="tabempty">
              <svg width="82" height="82" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.5">
                <rect x="2.2" y="6.4" width="15.4" height="15.4" rx="3.4" />
                <path d="M6.4 6.4V5.6a3.4 3.4 0 0 1 3.4-3.4h8a3.4 3.4 0 0 1 3.4 3.4v8a3.4 3.4 0 0 1-3.4 3.4h-.8" />
              </svg>
              <h2>Aucun onglet ouvert</h2>
              <p>Touchez le bouton + pour ouvrir un nouvel onglet.</p>
            </div>`;
        updateSegSwitch();
        return;
      }
      grid.style.display = "grid";
      grid.className = "tabgrid " + (list.length === 1 ? "one" : "many");
      grid.innerHTML = list.map(t => `
            <div class="tabcell" data-id="${t.id}">
              <div class="tabcard" data-open="${t.id}">
                <div class="tabshot" id="shot-${t.id}"></div>
                <button class="tabclose" data-close="${t.id}" aria-label="Fermer l’onglet">
                  <svg width="15" height="15" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
                </button>
              </div>
              <div class="tabtitle">${tabFavicon(t)}
                <span>${esc(t.kind === "web" ? t.title : "Démarrage")}</span>
              </div>
            </div>`).join("");

      list.forEach(t => {
        const shot = document.getElementById("shot-" + t.id);
        if (!shot) return;
        shot.innerHTML = snapNode(t);
        const card = shot.parentElement;
        const r = card.getBoundingClientRect(), s = scaleFactor();
        const k = (r.width / s) / fullRect().w;
        shot.style.transform = "scale(" + k + ")";
        shot.style.height = ((r.height / s) / k) + "px";
        shot.style.overflow = "hidden";
      });

      grid.querySelectorAll("[data-open]").forEach(c => c.onclick = e => {
        if (e.target.closest("[data-close]")) return;
        const t = tabs().find(x => x.id === +c.dataset.open);
        zoomIntoTab(t);
      });
      grid.querySelectorAll("[data-close]").forEach(b => b.onclick = e => {
        e.stopPropagation();
        const id = +b.dataset.close;
        S.tabs[bucket()] = tabs().filter(x => x.id !== id);
        if (tabs().length && !activeTab()) S.active[bucket()] = tabs()[tabs().length - 1].id;
        renderTabs();
      });
      updateSegSwitch();
    }

    function cellOf(id) { const g = $("#tabGrid"); return g ? g.querySelector('.tabcell[data-id="' + id + '"]') : null; }
    function cardRect(id) {
      const cell = cellOf(id);
      return cell ? rectIn(cell.querySelector(".tabcard")) : { x: 66, y: 107, w: 258, h: 372 };
    }
    function cardRadius() { return tabs().length === 1 ? 22 : 18; }

    let animating = false;
    function openTabsView(fromRect, fromRadius) {
      if (animating || S.view !== "browser") return;
      animating = true;
      const t = activeTab();
      capture(t);
      S.view = "tabs";
      const vTabs = $("#viewTabs");
      if (vTabs) vTabs.classList.add("on");
      renderTabs();
      const cell = cellOf(t.id);
      if (cell) { cell.scrollIntoView({ block: "nearest" }); cell.classList.add("ghost"); }
      const to = cardRect(t.id);
      const vBrowser = $("#viewBrowser");
      if (vBrowser) {
        vBrowser.classList.remove("on");
        vBrowser.style.transform = "";
        vBrowser.style.borderRadius = "";
      }
      $$(".tabtop, .tabbottom").forEach(el => {
        el.style.opacity = 0;
        el.classList.add("chrome-fade");
      });
      requestAnimationFrame(() => { $$(".tabtop, .tabbottom").forEach(el => el.style.opacity = 1); });
      flip(t, fromRect || fullRect(), to, fromRadius || 0, cardRadius(), () => {
        if (cell) cell.classList.remove("ghost");
        animating = false;
      });
    }

    function zoomIntoTab(t) {
      if (animating || !t) return;
      animating = true;
      S.active[bucket()] = t.id;
      const from = cardRect(t.id);
      const cell = cellOf(t.id);
      if (cell) cell.classList.add("ghost");
      $$(".tabtop, .tabbottom").forEach(el => el.style.opacity = 0);
      flip(t, from, fullRect(), cardRadius(), 0, () => {
        const vTabs = $("#viewTabs");
        if (vTabs) vTabs.classList.remove("on");
        const vBrowser = $("#viewBrowser");
        if (vBrowser) vBrowser.classList.add("on");
        S.view = "browser";
        showPane(t.kind === "web" ? "web" : "start");
        if (t.kind === "web") renderResults(t);
        if (cell) cell.classList.remove("ghost");
        animating = false;
      });
    }

    /* --- Bindings & Initialisation --- */
    const btnAddr = $("#btnAddress");
    if (btnAddr) btnAddr.onclick = () => openSearch(activeTab() ? activeTab().query || "" : "");
    const btnCloseS = $("#btnCloseSearch");
    if (btnCloseS) btnCloseS.onclick = () => closeSearch();
    const btnClr = $("#btnClear");
    if (btnClr) btnClr.onclick = () => setQuery("");
    const btnB = $("#btnBack");
    if (btnB) {
      btnB.onclick = () => {
        const t = activeTab();
        if (t && t.history && t.history.length > 0) {
          const prev = t.history.pop();
          runSearch(prev);
        } else {
          showPane("start");
        }
      };
    }
    const btnT = $("#btnTabs");
    if (btnT) btnT.onclick = () => openTabsView();
    const tDone = $("#tabDone");
    if (tDone) {
      tDone.onclick = () => {
        const t = activeTab();
        if (!t) newTab();
        zoomIntoTab(activeTab());
      };
    }
    const tNew = $("#tabNew");
    if (tNew) {
      tNew.onclick = () => {
        const t = newTab();
        zoomIntoTab(t);
      };
    }
    const segPriv = $("#segPrivate");
    if (segPriv) {
      segPriv.onclick = () => {
        S.privateMode = true;
        segPriv.classList.add("a");
        const segNorm = $("#segNormal");
        if (segNorm) segNorm.classList.remove("a");
        if (!tabs().length) newTab();
        renderTabs();
      };
    }
    const segNorm = $("#segNormal");
    if (segNorm) {
      segNorm.onclick = () => {
        S.privateMode = false;
        segNorm.classList.add("a");
        if (segPriv) segPriv.classList.remove("a");
        if (!tabs().length) newTab();
        renderTabs();
      };
    }

    newTab();
    renderCards();
    renderHistory();
    renderBookmarks();
    keyboard();
    fit();
    tick();
  