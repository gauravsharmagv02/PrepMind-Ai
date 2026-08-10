# PrepMind AI — Placement Preparation Platform

PrepMind AI is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to help students prepare for campus placements, technical interviews, coding rounds, aptitude diagnostics, and ATS resume scanning.

## 📁 Project Architecture

The application maintains a clean separation between frontend and backend services:

```
project-root/
│
├── frontend/             # React.js SPA (React Router, Lucide Icons, Axios, Chart.js)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── .env.example
│
├── backend/              # Node.js + Express.js + MongoDB REST API Service
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

This application runs in two independent terminal windows:

### Terminal 1: Backend REST API (`http://localhost:5000`)

```bash
cd backend
npm install
npm start
```

### Terminal 2: Frontend React Portal (`http://localhost:3000`)

```bash
cd frontend
npm install
npm start
```

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/prepmindai
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration (`frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api
PORT=3000
BROWSER=none
CI=true
```

---

## ✨ Key Features

- **User-Specific Dynamic Dashboard**: Real-time weighted placement readiness calculator, AI performance diagnosis, interactive 7-day study plan, and recent activity log backed by MongoDB.
- **LeetCode-Style Coding Practice**: Multi-language support (JavaScript, Python, C++, Java) with clean starter templates, test case execution, and AI code analysis.
- **Aptitude & Reasoning Diagnostics**: Timed quantitative, logical reasoning, and verbal tests with detailed explanations.
- **AI ATS Resume Analyzer**: Plain text and file upload parser with ATS match score, keyword recommendations, and formatting feedback.
- **AI Mock Interview Simulator**: HR behavioral & technical question evaluations measuring confidence, communication, and correctness.
- **Performance Analytics**: Skill competency radar charts and weekly activity tracking powered by Chart.js.
- **AI Career Recommendations**: Demanded skills, missing skill gaps, preparation roadmaps, and hiring company insights.
