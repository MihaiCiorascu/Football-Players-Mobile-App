# ⚽ Football Players App

This will be a full-stack React Native + Next.js + SQLite application for managing football player data. Currently, there is only the frontend in React, which supports complete CRUD operations, statistics tracking and visual data insights.

## 🛠 Features

<div style="display: flex; align-items: flex-start; gap: 24px;">

<div>

- Create, Read, Update, Delete players  
- Search and filter by player name  
- Rating-based badge colors:  
  - 🔵 Blue: 9.0+  
  - 🟢 Green: 8.0–8.9  
  - 🟡 Yellow: 6.0–7.9  
  - 🔴 Red: <6.0  
- 👑 for highest-rated player, 🤡 for lowest  
- Charts:  
  - Player count per position  
  - Rating category distribution  
  - Age range distribution  
- Pagination on the full player list  

</div>
  **The full players list:**

  <img src="https://github.com/user-attachments/assets/68ee7d02-8c6b-44ff-860c-1599aeb5fce1" width="300"/>

  <br>

  **Charts & Visual Stats:**

  <img src="https://github.com/user-attachments/assets/e9ac9346-996b-4746-9d50-18af3e505f91" width="300"/>
  <img src="https://github.com/user-attachments/assets/d1666104-b87a-4f8d-a5e2-879a469eccde" width="300"/>
  <img src="https://github.com/user-attachments/assets/be79546e-f2c7-4257-9d97-9ed5eff357de" width="300"/>
</div>


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
