# Bookmark Manager

A full-stack Bookmark Manager web application built with **Node.js, Express, and Next.js**.  
The application allows users to create, search, filter, edit, and delete bookmarks through a RESTful API and a responsive frontend.

This project was completed as part of a timed technical assessment, with a focus on **correctness, clean architecture, and speed of delivery**.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- CORS
- In-memory datastore (seeded)

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Fetch API

---

## 🧠 Architecture

The project follows a **client-server architecture** with clear separation of concerns:

client → Next.js frontend
server → Express REST API


The frontend communicates with the backend via HTTP requests.

---

## ✅ Features

### Core Requirements
- Full CRUD operations for bookmarks
- REST API with proper HTTP status codes
- Tag-based filtering (`?tag=value`)
- Real-time search by title or URL
- Inline editing
- Delete with confirmation
- Seed data included

### Validation
Server-side validation ensures:

- Valid URL format
- Required fields enforced
- Title length ≤ 200 characters
- Description length ≤ 500 characters
- Maximum of 5 tags per bookmark

Invalid requests return appropriate `400` responses.

### Error Handling
API errors are surfaced to the user to improve reliability and user experience.

---

## 📡 API Endpoints

### Get All Bookmarks

GET /bookmarks


Optional filtering:

GET /bookmarks?tag=frontend


---

### Create Bookmark

POST /bookmarks


**Request Body**
```json
{
  "url": "https://example.com",
  "title": "Example",
  "description": "Optional",
  "tags": ["learning", "frontend"]
}

Responses

    201 — Created

    400 — Validation error

Update Bookmark

PUT /bookmarks/:id

Responses

    200 — Updated

    404 — Not found

Delete Bookmark

DELETE /bookmarks/:id

Responses

    204 — No Content

    404 — Not found
```
⚙️ Setup Instructions
1️⃣ Clone the repository
```
git clone https://github.com/SyedJunaidAli1/bookmark-assignment-server
cd bookmark-assignmnet-server
```
Backend Setup
```
cd server
npm install
npm run dev
```
Server runs on:

http://localhost:5000

Frontend Setup

Create an environment file inside the client folder:
```
client/.env.local

Add:

NEXT_PUBLIC_API_URL=http://localhost:5000
```
Then run:
```
cd client
npm install
npm run dev
```
Frontend runs on:
```
http://localhost:3000
```
🌱 Seed Data

The application includes preloaded bookmarks so the interface is populated on first launch.

Note:
Data is stored in memory and resets whenever the server restarts.

This approach was intentionally chosen to prioritize simplicity and development speed within the assessment timeframe.
🎯 Design Decisions
In-Memory Datastore

An in-memory store was used instead of a database to:

    Reduce setup complexity

    Focus on API correctness

    Deliver within strict time constraints

Separate Client & Server

Maintaining two independent processes mirrors real-world production architecture and improves scalability.
Server-Side Validation

Validation is enforced on the backend to ensure data integrity and prevent invalid submissions.
🔍 Health Check

GET /health

Returns:

OK

⏱️ Time Spent

Approximately 1.5 – 2 hours.
🤖 AI Tools Used
