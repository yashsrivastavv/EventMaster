# Planit - Event Planning App

## 🚀 Project Overview
Planit is a web application that allows users to create, view, and manage events efficiently. It features an intuitive UI and a seamless backend to handle event creation and retrieval.

## 📂 Project Structure
```
📦 project-root
├── 📂 client     # Frontend - Next.js + TypeScript
├── 📂 server     # Backend - Express.js
├── 📂 shared     # Common types & schemas
```

## 🎯 Key Features
- Create events with details like name, date, time, location, and guest list
- View and filter events based on duration and status
- In-memory database for local development

## 🛠️ Tech Stack
- **Frontend:** React (Next.js) with TypeScript
- **Backend:** Express.js
- **Database:** PostgreSQL
- **UI Components:** ShadCN UI
- **Validation:** Zod
- **Routing:** Wouter

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yashsrivastavv/EventMaster
cd EventMaster
```

### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Install shadcn (forgot to add in package.json :'))
```sh
npx shadcn@latest init
```

### 4️⃣ Start the Development Server
```sh
npm run dev
```

## 📡 API Endpoints
The backend provides the following endpoints:

| Method | Endpoint         | Description                   |
|--------|-----------------|-------------------------------|
| POST   | `/api/events`   | Create a new event           |
| GET    | `/api/events`   | List events with filters     |
| GET    | `/api/events/:id` | Get details of a specific event |

## 📌 Frontend Pages
- **Home (`/`)**: Displays the main "Planit" branding with options to create or view events.
- **Create Event (`/create-event`)**: A form to input event details.
- **Events (`/events`)**: Displays all events with filtering options.

