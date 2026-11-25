# Project Tracker

The progress of my game projects: native PC ports, replacement servers, and LAN play restored.

**Site:** https://nynjardin.github.io

## How it works

A static site with no build step: GitHub Pages serves the files as they are.

| File | Role |
|---|---|
| `data/projects.js` | **All the content**: projects, stages, milestones (FR/EN). The only file to edit. |
| `index.html` | Home page: stats, timeline, project cards, latest progress |
| `project.html?id=<id>` | A project's page |
| `assets/app.js` | Rendering, FR/EN switch, live GitHub data |
| `assets/style.css` | Styles (dark and light theme) |

For projects with a public repository, the page also fetches from the GitHub API
(cached for 30 min): the last push, the latest release and the stars. Releases that
`projects.js` does not list yet are added to the project's history automatically.

## Updating

Edit `data/projects.js`, then commit and push. To preview locally, open `index.html`
in a browser (no server needed).

- New milestone: add `{ date, text: { fr, en } }` to the project's `milestones`
  (`type: "release"` with a `tag`, or `type: "upstream"` for a contribution merged upstream).
- Stage passed: change its `state` (`todo` → `partial` → `done`).
- Update `lastActivity` and, at the top of the file, `updated`.

No game content is distributed here.
