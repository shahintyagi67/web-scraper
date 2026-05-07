# MERN Web Scraper

A full-stack web application that scrapes the top 10 stories from Hacker News, stores them in MongoDB, and provides a premium user interface with authentication and bookmarking capabilities.

## Features

- **Automated Scraping**: Scrapes top 10 Hacker News stories on server start.
- **Manual Trigger**: API endpoint `POST /api/scrape` to refresh data.
- **Authentication**: JWT-based secure registration and login.
- **Bookmarks**: Logged-in users can toggle bookmarks for any story.
- **Pagination**: Browse through stories with a clean pagination interface.
- **Premium UI**: Modern dark-mode design with glassmorphism and animations.

## Tech Stack

- **Frontend**: React (Vite), Axios, React Router, Context API.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Scraper**: Cheerio, Axios.
- **Auth**: JSON Web Tokens (JWT), Bcrypt.js.

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/shahintyagi67/web-scraper.git
cd web-scraper
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/web-scraper
JWT_SECRET=your_jwt_secret_here
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Running the Project

Open two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories` - Fetch all stories (supports `?page=1&limit=10`)
- `GET /api/stories/:id` - Fetch single story
- `POST /api/stories/:id/bookmark` - Toggle bookmark (Auth required)
- `GET /api/stories/bookmarks` - Get user bookmarks (Auth required)

### Scrape
- `POST /api/scrape` - Trigger manual scrape

## Folder Structure

```
├── backend/
│   ├── config/      # DB Connection
│   ├── controllers/ # Request handlers
│   ├── middleware/  # Auth protection
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API endpoints
│   ├── services/    # Scraper logic
│   └── server.js    # Entry point
└── frontend/
    ├── src/
    │   ├── api/     # Axios config
    │   ├── components/
    │   ├── context/ # Global state
    │   ├── pages/
    │   └── App.jsx
```
