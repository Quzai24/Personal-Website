# Personal Portfolio — Avijit Singh

## Project Description

This is a lightweight personal portfolio website showcasing Avijit Singh's projects, art, and contact information. The main page has a sidebar from which you can click on to make minipages that you can drag and interact. In the Art Page you can open some of my artwork and in a drawing workspace try to recreate images side-by-side, undo strokes, and export their work.

## Key Features

- Gallery of artworks and animations
- Click any artwork (`.pic`) to open a drawing popup (original image + drawing canvas)
- Drawing tools: draw with mouse/touch, and clear, undo
- Small movable mini-pages for sections like Education, Skill, etc.
- CSS Animations for waves

## User Personas & Stories

- Persona: Classmate — "Maya"
  - Goal: Looking for friends in the class.
  - Story: Maya looks at the people in the class GitHub, and looks at pages to find potential friends.

- Persona: Hiring Manager — "Jordan"
  - Goal: Quickly review an applicant's skills and relevant projects.
  - Story: Jordan navigates to the Projects and About sections, opens an Education minipage to view credentials, and emails the candidate after reviewing the portfolio.

- Persona: Fellow Developer — "Liam"
  - Goal: Inspect implementation details and reuse components.
  - Story: Liam clones the repository, runs a local server, inspects `js/art.js` for the drawing popup implementation, and adapts the minipage pattern for his own site.

## Build & Run (from Git)

1. Clone the repo:

```bash
git clone https://github.com/Quzai24/Personal-Website
cd "Personal Web Page"
```

2. Start a local static server (recommended) and open the site in your browser.

Windows (Python):

```powershell http.server
```

Then open http://localhost:8000 in your browser. You can open `index.html` directly (file://) but some features (like loading modules or images with CORS) work best over HTTP.

## Project Structure

- `index.html` — Main landing page and navigation
- `art.html` — Art gallery page with drawing feature
- `css/` — Stylesheets
  - `main.css` — Site-wide styling
  - `art.css` — Art page + drawing popup styles
- `js/` — JavaScript
  - `main.js` — Site logic and minipage behavior
  - `art.js` — Drawing popup, canvas logic, undo/save
- `source_images/` — Images, icons, and media
- `package.json`, `eslint.config.mjs`, etc. — tooling and metadata (if present)

