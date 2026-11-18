# Shree's journey portfolio

Static site, no build tools. Edit `src/`, run `bash build.sh`, deploy `site/` to Vercel.

- `src/data.js` holds all public content: memory graph nodes, timeline chapters, projects, whiteboard thoughts, twin fallback answers.
- Showreel: set `SITE.showreel` in data.js to the video file/URL.
- Home "Things I've shipped": the six highlights in `PROJECTS` in data.js.
- Projects page (`projects.html`): every project lives in `src/ventures.js`. To add one, copy a line in `VENTURES` and edit it. Group by `industry` (a key in `INDUSTRIES`; add a key for a new industry), `type` is venture / client / experiment, `href` is the live link (leave "" if not public yet).
- Digital twin: `api/twin.js` is a Vercel function. Add `ANTHROPIC_API_KEY` in Vercel env vars to turn it on; without it the site uses the scripted answers in data.js.
- Whiteboard: visitor notes and connections are saved in each visitor's browser for now. Making them shared across visitors needs a small database (e.g. Vercel KV).
