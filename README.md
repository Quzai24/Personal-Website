# Personal Portfolio — Avijit Singh

## Demos

Live Page: https://quzai24.github.io/Personal-Website/

Video Demo: https://youtu.be/h5bexGi9hSo

## Project Description

This is a lightweight personal portfolio website showcasing Avijit Singh's projects, art, and contact information. The main page has a sidebar from which you can click on to make minipages that you can drag and interact with. In the Art Page you can open some of my artwork and in a drawing workspace try to recreate images side-by-side. 
This was also created for my <a href="https://johnguerra.co/classes/webDevelopment_online_spring_2026/">Web Development Class (CS 5610)</a> at Northeastern.

SVGs Provided by sgvrepo.com under Public Domain License or MIT License

## Key Features

- Gallery of artworks and animations
- Click any artwork (`.pic`) to open a drawing popup (original image + drawing canvas)
- Drawing tools: draw with mouse/touch, and clear, undo
- Small movable mini-pages for sections like Education, Skill, etc.
- CSS Animations for waves

## Build & Run (from Git)

1. Clone the repo:

```bash
git clone https://github.com/Quzai24/Personal-Website
```

2. Start a local static server (recommended) and open the site in your browser.

Windows (Python):

powershell
```
cd <this project path>/Personal-Website
http-server
```

Then open http://127.0.0.1:8080 in your browser.

## Project Structure

- `index.html` — Main landing page and navigation
- `art.html` — Art gallery page with drawing feature
- `css/` — Stylesheets
  - `main.css` — Site-wide styling
  - `art.css` — Art page + drawing popup styles
- `js/` — JavaScript
  - `main.js` — Site logic and minipage behavior
  - `art.js` — Drawing popup, canvas logic, undo

- `source_images/` — Images, icons, and media
- `package.json`, `eslint.config.mjs`, etc. — tooling and metadata (if present)

## Screenshots

<img width="2560" height="1300" alt="Screenshot Of The Main Page" src="https://github.com/user-attachments/assets/96f87365-3184-4084-a3b2-65996f879c1e" />
The home page with some CSS Animation
<img width="2560" height="1300" alt="Screenshot Of the Main Page with the minipages" src="https://github.com/user-attachments/assets/6fb88407-994e-42fc-90b4-9ef07e32bbab" />
The home page with all the minipages activated and moved around a little
<img width="2560" height="1300" alt="Screenshot of the Art Page" src="https://github.com/user-attachments/assets/2a6def1f-bf65-4db8-8873-3bb3e4669c97" />
The Art Page with a Gallery of Drawings that I have created
<img width="2560" height="1300" alt="Screenshot of the Art Page with the Draw along" src="https://github.com/user-attachments/assets/a4776e92-2da7-4991-9ff7-0616d71306aa" />
The Draw along popup that was made with the help of GPT-5 mini
<img width="2560" height="1300" alt="Screenshot of the Projects Page" src="https://github.com/user-attachments/assets/6581008e-18e4-4855-a9e5-2a9ab146ae3f" />
The Projects page

## WireFrames
<img width="1920" height="1080" alt="Art Page Wireframe" src="https://github.com/user-attachments/assets/84e38f83-a15d-4dee-ae2f-2719ac9f375c" />
<img width="1920" height="1080" alt="Main Page Wireframe" src="https://github.com/user-attachments/assets/faebe9a7-2e3b-4c75-973b-7a009a1044f9" />
<img width="1920" height="1080" alt="Project Page Wireframe" src="https://github.com/user-attachments/assets/fdbe53d0-8497-40ba-a0c0-4454e37be229" />
