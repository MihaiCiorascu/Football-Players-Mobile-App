# ⚽ Football Players App

This is a full-stack React Native + Next.js + SQLite application for managing football player data. The frontend supports complete CRUD operations, statistics tracking and visual data insights, while the backend exposes a REST API with validation, real-time updates via WebSockets, offline support and file upload handling.


## 📦 Tech Stack

- **Frontend**: React, Next.js, CSS Modules
- **Backend**: Next.js, WebSockets
- **Database**: SqLite
- **State Management**: Context API
- **Styling**: CSS Modules
- **Charts**: Chart.js, React-Chartjs-2
- **Routing**: next/navigation
- **Testing**: Jest, NYC (Istanbul)

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

3. Open http://localhost:3000 in your browser

## Deployment to AWS Elastic Beanstalk

### Prerequisites
1. Install the AWS CLI
2. Install the EB CLI
3. Configure AWS credentials

### Deployment Steps

1. Initialize EB CLI in your project:
```bash
eb init
```

2. Create an environment:
```bash
eb create production-environment
```

3. Deploy your application:
```bash
eb deploy
```

### Environment Variables
Make sure to set the following environment variables in the AWS Elastic Beanstalk environment:
- `NODE_ENV=production`
- `PORT=8081`
- Any other environment-specific variables your application needs

### Monitoring
- Access logs: `eb logs`
- SSH into instance: `eb ssh`
- Open application: `eb open`

### Database
The application uses SQLite. For production, consider migrating to a managed database service like Amazon RDS.
