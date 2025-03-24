# ⚽ Football Players App

This will be a full-stack React Native + Next.js + SQLite application for managing football player data. Currently, there is only the frontend in React, which supports complete CRUD operations, statistics tracking and visual data insights.

## 🛠 Features

| Feature List | App Preview |
|--------------|-------------|
| - Create, Read, Update, Delete players  <br> - Search and filter by player name  <br> - Rating-based badge colors:  <br> &nbsp;&nbsp;&nbsp;&nbsp;- 🔵 Blue: 9.0+  <br> &nbsp;&nbsp;&nbsp;&nbsp;- 🟢 Green: 8.0–8.9  <br> &nbsp;&nbsp;&nbsp;&nbsp;- 🟡 Yellow: 6.0–7.9  <br> &nbsp;&nbsp;&nbsp;&nbsp;- 🔴 Red: <6.0  <br> - 👑 for highest-rated player, 🤡 for lowest  <br> - Charts: <br> &nbsp;&nbsp;&nbsp;&nbsp;- Player count per position  <br> &nbsp;&nbsp;&nbsp;&nbsp;- Rating category distribution  <br> &nbsp;&nbsp;&nbsp;&nbsp;- Age range distribution  <br> - Pagination on the full player list | ![Screenshot 2025-03-24 180135](https://github.com/user-attachments/assets/68ee7d02-8c6b-44ff-860c-1599aeb5fce1) |


## 📦 Tech Stack

- **Frontend**: React, Next.js
- **State Management**: Context API
- **Styling**: CSS Modules
- **Charts**: Recharts (or Chart.js)
- **Routing**: next/navigation

## 📁 Structure Overview

- components/ – UI components like PlayerCard, Charts, Stats

- context/ – Global PlayerContext

- pages/ – All application pages (main view, full list, stats preview)

- public/ – Static assets like player images

  
## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 in your browser.

## 📝 Notes
Built for university assignment submission.

.gitignore is configured to exclude node_modules, .next, logs, and other unnecessary files.
