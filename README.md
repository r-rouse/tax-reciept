# Federal Tax Receipt Generator

A lightweight, client-side web application that visualizes how **your federal income taxes** are allocated across major spending categories. It’s intended to be used **as a website** (no install required), but you can also run it locally for development or exploration.

> ⚖️ Educational tool only. Uses public budget data and simplified assumptions. Individual tax outcomes vary.

---

## 🌐 Live Site

TBD

---

## ✨ What it does

- Enter your salary → see an **estimated federal income tax** and where those dollars go
- **Line-item breakdown** with dollars & share by category
- **Charts** (Pie & Bar) via Chart.js
- Year selector (e.g., 2020–2023)
- Data is defined in a simple `data.js` file so you can update/extend categories and years
- (Optional) A **“General-revenues only”** view that excludes Social Security & Medicare (payroll-tax funded) to show where **income/corporate taxes** go

---

## 🧱 Tech / Architecture

- **Pure static site** — no backend, no build step required
- **Files:** `index.html`, `styles.css`, `data.js`, `script.js`, `favicon.svg`
- **Charts:** [Chart.js CDN]
- All calculations happen **in the browser**; user inputs aren’t sent to a server

