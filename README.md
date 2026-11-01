# Automation Lab — Selenium & Playwright Playground

A React + Vite starter project for teaching browser automation. The app includes interactive practice modules and starter code examples for Selenium Java and Playwright JavaScript.

## Included modules

- Text inputs: text, email, password, textarea, disabled and read-only fields
- Dropdowns: single select, multi-select, checkboxes and radio buttons
- Date & time: date, time, datetime-local and month
- Buttons: click, double-click, right-click and hover
- Drag and drop: draggable item, drop zone and range slider
- Browser: JavaScript alert, confirm, prompt and new tab link
- Iframes: embedded practice frame
- Links: internal and external links
- Tables: searchable and sortable data table
- Dynamic elements: delayed content and visibility toggle
- File upload: choose a local file and display its filename
- Shadow DOM: introductory simulated component (replace with a real custom element in the next iteration)

## Requirements

- Node.js 20. or later (Node.js 20 LTS recommended)
- npm
- VS Code (recommended)

## Run locally

1. Extract the ZIP file.
2. Open the `automation-lab` folder in VS Code.
3. Open the integrated terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Create a production build

```bash
npm run build
npm run preview
```

The production website is generated in the `dist` folder.

## Project structure

```text
automation-lab/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Important notes

- This first version is a frontend practice playground. It does not include student accounts, a backend, course payments, progress tracking or a video library yet.
- Selenium examples are Java snippets. Playwright examples use JavaScript with Playwright Test style.
- Code examples use `https://your-lab-url/` as a placeholder. Replace it with your deployed practice page URL and add the relevant setup/imports before executing.
- Browser alert/confirm/prompt demos intentionally open native browser dialogs.
- File upload is local to the browser session; no file is sent to a server.
- The iframe is embedded using `srcDoc`, so its contents are local to the page.
- The Shadow DOM exercise is labelled as a simulation. It is not yet a true open shadow root. A real custom element will be added in a follow-up iteration.
- The external fonts are loaded from Google Fonts. If offline, the app falls back to system sans-serif fonts.

## Suggested next steps

1. Add real Shadow DOM custom element.
2. Add more advanced locators and deliberately challenging DOM structures.
3. Add Selenium and Playwright full runnable project templates.
4. Add video lessons and course pages.
5. Add student login, progress tracking and admin content management.
6. Add payments only after the learning content and audience are validated.
