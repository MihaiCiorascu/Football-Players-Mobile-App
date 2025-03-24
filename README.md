# ⚽ Football Players App

This is a full-stack React + Next.js application for managing football player data. It supports complete CRUD operations, statistics tracking, and visual data insights.

## 🛠 Features

- ✅ Create, Read, Update, Delete players
- ✅ Search and filter by player name
- ✅ Rating-based badge colors:
  - 🔵 Blue: 9.0+
  - 🟢 Green: 8.0–8.9
  - 🟡 Yellow: 6.0–7.9
  - 🔴 Red: <6.0
- ✅ 👑 for highest-rated player, 🤡 for lowest
- ✅ Charts (Gold Tier):
  - Player count per position
  - Rating category distribution
  - Age range distribution
- ✅ Pagination on the full player list

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
