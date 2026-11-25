/* Project tracker: renders index.html and project.html from window.TRACKER (data/projects.js). */
(function () {
  "use strict";

  const DATA = window.TRACKER;
  const OWNER = DATA.owner;
  const DAY = 86400000;

  // ------------------------------------------------------------------ i18n
  const UI = {
    fr: {
      tagline: "Faire revivre des jeux : portages PC natifs, serveurs de remplacement, et surtout le retour du jeu en réseau.",
      projects: "Projets", withDownload: "Avec téléchargement", publicRepos: "Dépôts publics",
      merged: "Contributions fusionnées en amont", milestones: "Jalons",
      timeline: "Chronologie", timelineHint: "Chaque point est un jalon ; ◆ une release, ○ une contribution fusionnée en amont.",
      all: "Tous", recent: "Dernières avancées", today: "aujourd'hui",
      kind: { port: "Portage / recompilation", server: "Serveur de remplacement", reimpl: "Réimplémentation", tool: "Outil", upcoming: "À venir" },
      kindShort: { port: "Portages", server: "Serveurs", reimpl: "Réimplémentations", tool: "Outils", upcoming: "À venir" },
      status: { release: "Téléchargeable", active: "En cours", planned: "En préparation" },
      details: "Détails", github: "GitHub", lastActivity: "Dernière activité", started: "Commencé", active: "Actif",
      stage: "Étape", stagesTitle: "Avancement", works: "Ce qui marche", next: "Prochaines étapes",
      history: "Historique", basedOn: "Basé sur", contributions: "Contributions en amont",
      repos: "Dépôts", latestRelease: "Dernière release", lastPush: "Dernier push", stars: "étoiles",
      noRepo: "Pas encore de dépôt public : cette page suit l'avancement.",
      back: "Tous les projets", notFound: "Projet introuvable.", gallery: "Captures",
      state: { done: "fait", partial: "en partie", todo: "à faire" },
      prState: { merged: "fusionnée", open: "ouverte", closed: "fermée" },
      liveRelease: "Release", updated: "Mis à jour le",
      disclaimer: "Aucun contenu de jeu n'est distribué ici : chaque projet demande votre propre copie du jeu. Projets de fans, sans lien avec les éditeurs ni les marques citées.",
      noStages: "Pas encore d'étapes définies.", progress: "avancement"
    },
    en: {
      tagline: "Bringing games back: native PC ports, replacement servers, and above all network play restored.",
      projects: "Projects", withDownload: "With a download", publicRepos: "Public repositories",
      merged: "Contributions merged upstream", milestones: "Milestones",
      timeline: "Timeline", timelineHint: "Each dot is a milestone; ◆ a release, ○ a contribution merged upstream.",
      all: "All", recent: "Latest progress", today: "today",
      kind: { port: "Port / recompilation", server: "Replacement server", reimpl: "Reimplementation", tool: "Tool", upcoming: "Upcoming" },
      kindShort: { port: "Ports", server: "Servers", reimpl: "Reimplementations", tool: "Tools", upcoming: "Upcoming" },
      status: { release: "Downloadable", active: "In progress", planned: "In preparation" },
      details: "Details", github: "GitHub", lastActivity: "Last activity", started: "Started", active: "Active",
      stage: "Stage", stagesTitle: "Progress", works: "What works", next: "Next steps",
      history: "History", basedOn: "Built on", contributions: "Upstream contributions",
      repos: "Repositories", latestRelease: "Latest release", lastPush: "Last push", stars: "stars",
      noRepo: "No public repository yet: this page follows the progress.",
      back: "All projects", notFound: "Project not found.", gallery: "Screenshots",
      state: { done: "done", partial: "partly", todo: "to do" },
      prState: { merged: "merged", open: "open", closed: "closed" },
      liveRelease: "Release", updated: "Updated on",
      disclaimer: "No game content is distributed here: every project needs your own copy of the game. Fan projects, not affiliated with the publishers or the trademarks mentioned.",
      noStages: "No stages defined yet.", progress: "progress"
    }
  };

  let lang = localStorage.getItem("lang") || ((navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en");
  const ui = () => UI[lang];
  const t = (v) => (v == null ? "" : typeof v === "string" ? v : v[lang] || v.fr || v.en || "");

  // ------------------------------------------------------------------ helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : String(c));
    return el;
  }
  const svgNS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, ...children) {
    const el = document.createElementNS(svgNS, tag);
    for (const [k, v] of Object.entries(attrs || {})) if (v != null) el.setAttribute(k, v);
    for (const c of children.flat()) if (c != null) el.append(c.nodeType ? c : String(c));
    return el;
  }

  const parse = (d) => new Date(d + (d.length === 10 ? "T12:00:00" : ""));
  const locale = () => (lang === "fr" ? "fr-FR" : "en-GB");
  const fmtDate = (d, opts = { day: "numeric", month: "short", year: "numeric" }) =>
    parse(d).toLocaleDateString(locale(), opts);
  function rel(d) {
    const days = Math.round((Date.now() - parse(d).getTime()) / DAY);
    if (days <= 0) return ui().today;
    const rtf = new Intl.RelativeTimeFormat(locale(), { numeric: "auto" });
    if (days < 30) return rtf.format(-days, "day");
    if (days < 365) return rtf.format(-Math.round(days / 30), "month");
    return rtf.format(-Math.round(days / 365), "year");
  }
  const isoDay = (iso) => iso.slice(0, 10);

  function progress(p) {
    if (!p.stages.length) return 0;
    const v = p.stages.reduce((a, st) => a + (st.state === "done" ? 1 : st.state === "partial" ? 0.5 : 0), 0);
    return v / p.stages.length;
  }
  function currentStage(p) {
    return p.stages.find((st) => st.state !== "done") || p.stages[p.stages.length - 1];
  }
  const ownedRepos = (p) => (p.repos || []).filter((r) => r.repo.split("/")[0] === OWNER);
  const projectUrl = (p) => "project.html?id=" + encodeURIComponent(p.id);

  // ------------------------------------------------------------------ live GitHub data (cached, optional)
  const CACHE_MS = 30 * 60 * 1000;
  async function gh(path) {
    const key = "gh:" + path;
    try {
      const c = JSON.parse(localStorage.getItem(key) || "null");
      if (c && Date.now() - c.at < CACHE_MS) return c.data;
    } catch (_) { /* ignore */ }
    try {
      const r = await fetch("https://api.github.com/" + path, { headers: { Accept: "application/vnd.github+json" } });
      if (!r.ok) return null;
      const data = await r.json();
      try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), data })); } catch (_) { /* quota */ }
      return data;
    } catch (_) { return null; }
  }

  /** Raises p.lastActivity from the owner's repositories' last push. */
  async function liveActivity(p) {
    let best = p.lastActivity;
    for (const r of ownedRepos(p)) {
      const info = await gh("repos/" + r.repo);
      if (info && info.pushed_at && isoDay(info.pushed_at) > best) best = isoDay(info.pushed_at);
    }
    return best;
  }

  // ------------------------------------------------------------------ shared chrome
  function renderChrome() {
    document.documentElement.lang = lang;
    const btn = $("#lang-toggle");
    if (btn) {
      btn.textContent = lang === "fr" ? "EN" : "FR";
      btn.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
      btn.onclick = () => { lang = lang === "fr" ? "en" : "fr"; localStorage.setItem("lang", lang); render(); };
    }
    const foot = $("#footer");
    if (foot) {
      foot.replaceChildren(
        h("p", {}, ui().disclaimer),
        h("p", { class: "muted" }, ui().updated + " " + fmtDate(DATA.updated) + " · ",
          h("a", { href: "https://github.com/" + OWNER }, "github.com/" + OWNER))
      );
    }
  }

  function badge(cls, text) { return h("span", { class: "badge " + cls }, text); }
  function kindBadge(p) { return badge("kind-" + p.kind, ui().kind[p.kind]); }
  function statusBadge(p) { return badge("status-" + p.status, ui().status[p.status]); }

  function segBar(p, big) {
    const bar = h("div", { class: "segbar" + (big ? " big" : ""), role: "img",
      "aria-label": ui().progress + " " + Math.round(progress(p) * 100) + " %" });
    for (const st of p.stages) bar.append(h("span", { class: "seg " + st.state, title: t(st.label) + " — " + ui().state[st.state] }));
    if (!p.stages.length) bar.append(h("span", { class: "seg todo" }));
    return bar;
  }

  // ------------------------------------------------------------------ index page
  let filter = "all";

  function sortedProjects() {
    return [...DATA.projects].sort((a, b) =>
      (a.status === "planned") - (b.status === "planned") || b.lastActivity.localeCompare(a.lastActivity));
  }

  function renderIndex() {
    $("#tagline").textContent = ui().tagline;
    const projects = sortedProjects();

    // stats
    const ownRepos = new Set(projects.flatMap((p) => ownedRepos(p).map((r) => r.repo)));
    const mergedCount = projects.reduce((a, p) => a + (p.contributions || []).filter((c) => c.state === "merged").length, 0);
    const msCount = projects.reduce((a, p) => a + p.milestones.length, 0);
    const stats = [
      [projects.length, ui().projects],
      [projects.filter((p) => p.status === "release").length, ui().withDownload],
      [ownRepos.size, ui().publicRepos],
      [mergedCount, ui().merged],
      [msCount, ui().milestones]
    ];
    $("#stats").replaceChildren(...stats.map(([n, l]) => h("div", { class: "stat" }, h("b", {}, n), h("span", {}, l))));

    // timeline
    $("#timeline-title").textContent = ui().timeline;
    $("#timeline-hint").textContent = ui().timelineHint;
    renderTimeline($("#timeline"), projects);

    // filters
    const kinds = ["all", ...["port", "server", "reimpl", "tool", "upcoming"].filter((k) => projects.some((p) => p.kind === k))];
    $("#filters").replaceChildren(...kinds.map((k) => h("button", {
      class: "chip" + (filter === k ? " on" : "") + (k !== "all" ? " kind-" + k : ""),
      "aria-pressed": filter === k ? "true" : "false",
      onclick: () => { filter = k; renderIndex(); }
    }, k === "all" ? ui().all : ui().kindShort[k],
      h("small", {}, k === "all" ? projects.length : projects.filter((p) => p.kind === k).length))));

    // cards
    const grid = $("#cards");
    grid.replaceChildren(...projects.filter((p) => filter === "all" || p.kind === filter).map(card));

    // recent feed
    $("#recent-title").textContent = ui().recent;
    const feed = projects.flatMap((p) => p.milestones.map((m) => ({ p, m })))
      .sort((a, b) => b.m.date.localeCompare(a.m.date)).slice(0, 12);
    $("#recent").replaceChildren(...feed.map(({ p, m }) => h("li", { class: "kind-" + p.kind },
      h("time", { datetime: m.date }, fmtDate(m.date, { day: "numeric", month: "short" })),
      h("div", {},
        h("a", { href: projectUrl(p), class: "feed-project" }, p.title),
        m.type ? h("span", { class: "mtype " + m.type }, m.type === "release" ? "release" : "upstream") : null,
        h("p", {}, t(m.text))))));
  }

  function card(p) {
    const stage = currentStage(p);
    const primary = (p.repos || [])[0];
    const lastEl = h("span", { class: "last", title: ui().lastActivity + " : " + fmtDate(p.lastActivity) }, ui().active + " ", h("b", {}, rel(p.lastActivity)));
    liveActivity(p).then((d) => { if (d !== p.lastActivity) { p.lastActivity = d; lastEl.querySelector("b").textContent = rel(d); } });

    return h("article", { class: "card kind-" + p.kind + (p.status === "planned" ? " planned" : "") },
      h("div", { class: "card-top" },
        p.icon ? h("img", { class: "card-icon", src: p.icon, alt: "", width: 28, height: 28, loading: "lazy" }) : null,
        h("div", { class: "card-meta" }, p.platform + (p.year ? " · " + p.year : "")),
        statusBadge(p)),
      h("h3", {}, h("a", { href: projectUrl(p), class: "stretched" }, p.title)),
      h("p", { class: "subtitle" }, t(p.subtitle)),
      h("p", { class: "summary" }, t(p.summary)),
      p.stages.length ? h("div", { class: "card-progress" },
        segBar(p),
        h("div", { class: "stage-now" },
          h("span", { class: "dot " + stage.state }),
          (stage.state === "done" ? "" : ui().stage + " : ") + t(stage.label))) : null,
      h("div", { class: "card-foot" },
        kindBadge(p),
        lastEl,
        primary ? h("a", { class: "btn-gh", href: "https://github.com/" + primary.repo, title: primary.repo }, ghIcon(), ui().github) : null));
  }

  function ghIcon() {
    return s("svg", { viewBox: "0 0 16 16", width: 14, height: 14, "aria-hidden": "true" },
      s("path", { fill: "currentColor", d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" }));
  }

  // ------------------------------------------------------------------ timeline (swimlanes)
  function renderTimeline(host, projects) {
    const rows = projects;
    const starts = rows.map((p) => parse(p.started).getTime());
    const t0 = new Date(Math.min(...starts)); t0.setDate(1); t0.setHours(0, 0, 0, 0);
    const end = new Date(Math.max(Date.now(), ...rows.map((p) => parse(p.lastActivity).getTime())) + 6 * DAY);
    const LABEL = 210, W = 1000, ROW = 30, TOP = 30, PAD = 12;
    const H = TOP + rows.length * ROW + 8;
    const x = (d) => LABEL + PAD + ((d - t0) / (end - t0)) * (W - LABEL - PAD * 2);

    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "tl", role: "img", "aria-label": ui().timeline, preserveAspectRatio: "xMinYMin meet" });

    // month grid
    const m = new Date(t0);
    while (m < end) {
      const xm = x(m.getTime());
      svg.append(s("line", { x1: xm, x2: xm, y1: TOP - 8, y2: H, class: "tl-grid" }));
      svg.append(s("text", { x: xm + 5, y: TOP - 14, class: "tl-month" },
        m.toLocaleDateString(locale(), { month: "long" })));
      m.setMonth(m.getMonth() + 1);
    }
    // week ticks
    for (let w = t0.getTime(); w < end.getTime(); w += 7 * DAY) {
      svg.append(s("line", { x1: x(w), x2: x(w), y1: TOP - 6, y2: TOP - 2, class: "tl-tick" }));
    }
    // today
    const xt = x(Date.now());
    svg.append(s("line", { x1: xt, x2: xt, y1: TOP - 8, y2: H, class: "tl-today" }));
    svg.append(s("text", { x: xt - 4, y: TOP - 14, class: "tl-today-label", "text-anchor": "end" }, ui().today));

    rows.forEach((p, i) => {
      const y = TOP + i * ROW + ROW / 2;
      const g = s("a", { href: projectUrl(p), class: "tl-row kind-" + p.kind });
      g.append(s("rect", { x: 0, y: y - ROW / 2, width: W, height: ROW, class: "tl-hit" }));
      g.append(s("text", { x: LABEL - 6, y: y + 4, "text-anchor": "end", class: "tl-label" }, p.title));
      const xs = x(parse(p.started).getTime()), xe = x(parse(p.lastActivity).getTime());
      g.append(s("line", { x1: xs, x2: Math.max(xe, xs + 2), y1: y, y2: y, class: "tl-span" }));
      for (const ms of p.milestones) {
        const xm = x(parse(ms.date).getTime());
        let mark;
        if (ms.type === "release") mark = s("rect", { x: xm - 5, y: y - 5, width: 10, height: 10, transform: `rotate(45 ${xm} ${y})`, class: "tl-rel" });
        else if (ms.type === "upstream") mark = s("circle", { cx: xm, cy: y, r: 5.5, class: "tl-up" });
        else mark = s("circle", { cx: xm, cy: y, r: 4, class: "tl-dot" });
        mark.append(s("title", {}, fmtDate(ms.date) + " — " + t(ms.text)));
        g.append(mark);
      }
      svg.append(g);
    });

    host.replaceChildren(svg);
    host.scrollLeft = host.scrollWidth; // narrow screens: show the most recent weeks first
  }

  // ------------------------------------------------------------------ project page
  function renderProject() {
    const id = new URLSearchParams(location.search).get("id");
    const p = DATA.projects.find((x) => x.id === id);
    const main = $("#project");
    $("#back").textContent = "← " + ui().back;
    if (!p) { main.replaceChildren(h("p", { class: "empty" }, ui().notFound)); return; }
    document.title = p.title + " — Project Tracker";
    main.className = "project kind-" + p.kind;

    const pct = Math.round(progress(p) * 100);

    const head = h("header", { class: "p-head" },
      h("div", { class: "p-badges" }, kindBadge(p), statusBadge(p), h("span", { class: "card-meta" }, p.platform + (p.year ? " · " + p.year : ""))),
      h("h1", {}, p.icon ? h("img", { class: "p-icon", src: p.icon, alt: "", width: 44, height: 44 }) : null, p.title),
      h("p", { class: "p-sub" }, t(p.subtitle)),
      h("p", { class: "p-summary" }, t(p.summary)),
      h("dl", { class: "p-facts" },
        h("div", {}, h("dt", {}, ui().started), h("dd", {}, fmtDate(p.started))),
        h("div", {}, h("dt", {}, ui().lastActivity), h("dd", { id: "p-last" }, fmtDate(p.lastActivity) + " (" + rel(p.lastActivity) + ")")),
        p.stages.length ? h("div", {}, h("dt", {}, ui().progress), h("dd", {}, pct + " %")) : null));

    liveActivity(p).then((d) => { if (d !== p.lastActivity) { p.lastActivity = d; $("#p-last").textContent = fmtDate(d) + " (" + rel(d) + ")"; } });

    // repos
    const repoBox = h("section", { class: "panel repos" }, h("h2", {}, ui().repos));
    if (p.repos.length) {
      const list = h("ul", { class: "repo-list" });
      for (const r of p.repos) {
        const meta = h("div", { class: "repo-live muted" });
        list.append(h("li", {},
          h("a", { href: "https://github.com/" + r.repo, class: "repo-link" }, ghIcon(), r.repo),
          h("span", { class: "repo-label" }, t(r.label)), meta));
        fillRepoMeta(r.repo, meta);
      }
      repoBox.append(list);
    } else repoBox.append(h("p", { class: "muted" }, ui().noRepo));

    // stages
    const stages = h("section", { class: "panel" }, h("h2", {}, ui().stagesTitle));
    if (p.stages.length) {
      stages.append(segBar(p, true));
      stages.append(h("ol", { class: "stepper" }, p.stages.map((st) =>
        h("li", { class: st.state }, h("span", { class: "dot " + st.state }), h("span", {}, t(st.label)),
          h("small", {}, ui().state[st.state])))));
    } else stages.append(h("p", { class: "muted" }, ui().noStages));

    const lists = h("div", { class: "two" },
      p.works.length ? h("section", { class: "panel" }, h("h2", {}, ui().works), h("ul", { class: "ticks" }, p.works.map((w) => h("li", {}, t(w))))) : null,
      p.next.length ? h("section", { class: "panel" }, h("h2", {}, ui().next), h("ul", { class: "arrows" }, p.next.map((w) => h("li", {}, t(w))))) : null);

    // history
    const hist = h("section", { class: "panel" }, h("h2", {}, ui().history));
    const ol = h("ol", { class: "history" });
    hist.append(ol);
    const drawHistory = (items) => ol.replaceChildren(...items.sort((a, b) => b.date.localeCompare(a.date)).map((m) =>
      h("li", { class: m.type || "" },
        h("time", { datetime: m.date }, fmtDate(m.date)),
        h("div", {}, m.type ? h("span", { class: "mtype " + m.type }, m.type === "release" ? (m.tag ? m.tag.split("@").pop() : "release") : "upstream") : null,
          h("p", {}, m.live ? m.live : t(m.text))))));
    drawHistory([...p.milestones]);
    if (!p.milestones.length) ol.replaceChildren(h("li", { class: "muted" }, "—"));
    liveReleases(p).then((extra) => { if (extra.length) drawHistory([...p.milestones, ...extra]); });

    // gallery
    const gallery = p.screenshots && p.screenshots.length ? h("section", { class: "panel" }, h("h2", {}, ui().gallery),
      h("div", { class: "gallery" }, p.screenshots.map((src) => h("a", { href: src }, h("img", { src, alt: "", loading: "lazy" }))))) : null;

    // credits
    const contribs = (p.contributions || []).length ? h("section", { class: "panel" }, h("h2", {}, ui().contributions),
      h("ul", { class: "prs" }, p.contributions.map((c) => h("li", {},
        h("span", { class: "pr-state " + c.state }, ui().prState[c.state]),
        h("a", { href: c.url }, c.label), " — ", t(c.title))))) : null;
    const credits = (p.upstream || []).length ? h("section", { class: "panel" }, h("h2", {}, ui().basedOn),
      h("ul", { class: "credits" }, p.upstream.map((u) => h("li", {}, h("a", { href: u.url }, u.label), u.note ? " — " + t(u.note) : "")))) : null;

    main.replaceChildren(head, h("div", { class: "p-grid" },
      h("div", { class: "p-main" }, stages, lists, gallery, hist),
      h("aside", { class: "p-side" }, repoBox, contribs, credits)));
  }

  async function fillRepoMeta(repo, el) {
    const [info, rels] = await Promise.all([gh("repos/" + repo), gh("repos/" + repo + "/releases?per_page=1")]);
    const bits = [];
    if (rels && rels[0]) bits.push(h("a", { href: rels[0].html_url }, ui().latestRelease + " : " + rels[0].tag_name), " (" + fmtDate(isoDay(rels[0].published_at)) + ")");
    if (info) {
      if (bits.length) bits.push(" · ");
      bits.push(ui().lastPush + " " + rel(isoDay(info.pushed_at)));
      if (info.stargazers_count) bits.push(" · ★ " + info.stargazers_count);
    }
    el.replaceChildren(...bits);
  }

  /** Releases of the owner's repositories that the data file does not list yet. */
  async function liveReleases(p) {
    // A data milestone's tag is "owner/repo@tag", or a bare tag meaning the project's first repository.
    const first = (p.repos[0] || {}).repo;
    const known = new Set(p.milestones.filter((m) => m.tag).map((m) => (m.tag.includes("@") ? m.tag : first + "@" + m.tag)));
    const out = [];
    for (const r of ownedRepos(p)) {
      const rels = await gh("repos/" + r.repo + "/releases?per_page=30");
      if (!Array.isArray(rels)) continue;
      for (const rl of rels) {
        const key = r.repo + "@" + rl.tag_name;
        if (known.has(key) || rl.draft) continue;
        known.add(key);
        out.push({ date: isoDay(rl.published_at), type: "release", tag: rl.tag_name, live: rl.name || rl.tag_name });
      }
    }
    return out;
  }

  // ------------------------------------------------------------------ boot
  function render() {
    renderChrome();
    if (document.body.dataset.page === "index") renderIndex();
    else renderProject();
  }
  render();
})();
