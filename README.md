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

  <img src="https://github.com/user-attachments/assets/5bec8d81-5ca1-4924-b899-357cf15a2af0" width="300"/>
  <img src="https://github.com/user-attachments/assets/6eed5112-6cfc-4773-80bb-ab734829a443" width="300"/>
  <img src="https://github.com/user-attachments/assets/daf93958-12b9-4e62-a4b6-46bf61c2be73" width="300"/>
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
