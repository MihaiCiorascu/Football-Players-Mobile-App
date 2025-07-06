# ⚽ Football Players App

This is a full-stack React + Next.js + SQLite application for managing football player data. The frontend supports complete CRUD operations, statistics tracking and visual data insights, while the backend exposes a REST API with validation, real-time updates via WebSockets, offline support and file upload handling.


## 📦 Tech Stack

- **Frontend**: React, Next.js, CSS Modules
- **Backend**: Next.js API Routes, Node.js, WebSockets(Socket.io)
- **Database**: SqLite (primary), with support for PostgreSQL
- **State Management**: Context API
- **Authentication**: NextAuth.js, JWT, bcryptjs
- **Styling**: CSS Modules
- **Charts**: Chart.js, React-Chartjs-2
- **Routing**: next/navigation
- **Testing**: Jest, NYC (Istanbul)
- **Real-time Communication**: Socket.io
- **Security**: Two-factor authentication (speakeasy), QR Code generation

## 🛠 Frontend Features

<div style="display: flex; align-items: flex-start; gap: 24px;">

<div>

- Create, Read, Update, Delete players  
  - Each new player starts with default images, a 5.0 rating and 0 goals  
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


## 🧩 Backend Features

- **REST API**:  
  - `POST`, `GET`, `PATCH`, `DELETE`  
  - Filter and sort entities  

- **Validation**:  
  - Server-side checks for `POST` and `PATCH` requests  

- **Unit Tests**:  
  - Ensures backend operations work as expected  

- **Offline Support**:  
  - Detects network or server issues  
  - Caches operations locally and syncs when back online  

- **File Upload**:  
  - Supports large uploads (e.g. videos) to/from server  

- **Endless Scrolling**:  
  - Sliding window pagination for large datasets  

- **Live Updates**:  
  - Backend thread generates new entities  
  - WebSockets push updates to UI and charts in real time  


## 🎨 Design

The UI was originally designed by me in [Figma](https://www.figma.com/design/gFgzgzcHgK07pRY4wt3b97/Football-Players-App?node-id=0-1&t=KsiWAzRSOygmfIyv-0) to guide the frontend development.


## 📁 Structure Overview

- app/ - Next.js app router pages

- components/ – UI components like PlayerCard, Charts, Stats

- context/ – Global PlayerContext

- public/ – Static assets like player images

- server/ - WebSocket server

  
## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development servers:
```bash
# Start both Next.js and WebSocket servers
npm run start:all

# Or start them separately
npm run dev          # Next.js server
node server.js       # WebSocket server
```
