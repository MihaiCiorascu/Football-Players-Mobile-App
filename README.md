# ⚽ Football Players App

This will be a full-stack React Native + Next.js + SQLite application for managing football player data. Currently, there is only the frontend in React + Next.js, which supports complete CRUD operations, statistics tracking and visual data insights.

## 🛠 Features

<div style="display: flex; align-items: flex-start; gap: 24px;">

<div>

- Create, Read, Update, Delete players  
  - Each new player starts with default images, a 5.0 rating, and 0 goals  
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

</div>

<br>

  **The full players list**

  <img src="https://github.com/user-attachments/assets/68ee7d02-8c6b-44ff-860c-1599aeb5fce1" width="300"/>

  <br><br>

  **Charts & Live Visual Stats**
  <br>
  *A new 82-year-old Goalkeeper is added every 2 seconds.*
<p align="center">
  <img src="https://github.com/user-attachments/assets/bef9dd9d-b9de-4845-bfc8-75d70af51d90" width="680"/>
  <br/>
  <img src="https://github.com/user-attachments/assets/1a64413b-6db8-4de9-bbff-87e2551c9421" width="620"/>
  <br/>
  <img src="https://github.com/user-attachments/assets/b2323f98-69e8-4ac6-a732-56f5f3d68f27" width="640"/>
</p>

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
