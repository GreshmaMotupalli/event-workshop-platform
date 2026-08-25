# Event & Workshop Platform

A full-stack web application for discovering, creating, and managing events and workshops. Users can register for events, while organizers can create, edit, and manage their own events.

## 🚀 Features

### Authentication

* User registration
* User login
* Logout
* Role-based functionality for attendees and organizers

### Events

* View all available events
* View event details
* Search events
* Filter events
* Organizer can create events
* Organizer can edit events
* Organizer can delete events
* Organizer can view their own events

### Event Registration

* Attendees can register for events
* Users can view their registered events
* Prevent duplicate registrations

### Dashboard

* User dashboard
* Organizer event management
* Attendee registration management

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Redux Toolkit
* Material UI (MUI)
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* PostgreSQL

### Development Tools

* Git & GitHub
* Postman
* pgAdmin

## 📁 Project Structure

```text
event-workshop-platform/
│
├── backend/
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── package.json
│   │   └── server.js
│   │
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── theme.js
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```


## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd event-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the Vite development URL, usually:

```text
http://localhost:5173
```

## 🗄️ Database

The application uses PostgreSQL for storing:

* Users
* Events
* Event registrations

Make sure PostgreSQL is installed and running before starting the backend.

## 🔑 User Roles
Attendee

Attendees can:

* Browse available events
* Search and filter events
* View event details
* Register for events
* View their registered events
* Organizer

Organizers can:

* Browse available events
* Search and filter events
* View event details
* Create events
* Edit their own events
* Delete their own events
* View their created events
* Register for other organizers' events
* View their registered events
## 🔌 API Overview

### Authentication APIs

| Method | Endpoint             | Authentication | Description         |
| ------ | -------------------- | -------------- | ------------------- |
| POST   | `/api/auth/register` | No             | Register a new user |
| POST   | `/api/auth/login`    | No             | Login user          |

### Event APIs

| Method | Endpoint                | Authentication | Description                                   |
| ------ | ----------------------- | -------------- | --------------------------------------------- |
| GET    | `/api/events`           | No             | Get all events                                |
| GET    | `/api/events/:id`       | No             | Get a specific event                          |
| POST   | `/api/events`           | Yes            | Create a new event                            |
| GET    | `/api/events/my-events` | Yes            | Get events created by the logged-in organizer |
| PUT    | `/api/events/:id`       | Yes            | Update an event                               |
| DELETE | `/api/events/:id`       | Yes            | Delete an event                               |

### Registration APIs

| Method | Endpoint                                 | Authentication | Description                                 |
| ------ | ---------------------------------------- | -------------- | ------------------------------------------- |
| POST   | `/api/registrations/events/:id/register` | Yes            | Register for an event                       |
| GET    | `/api/registrations/my-events`           | Yes            | Get events registered by the logged-in user |

### Authentication

Protected endpoints require a valid authentication token.

The token is sent using the `Authorization` header:

```http
Authorization: Bearer <token>
```


## 🖥️ Application Pages

* Login
* Register
* Events
* Event Details
* Dashboard
* My Registrations
* My Events
* Create Event
* Edit Event

## 📸 Screenshots

Add screenshots of the application here.

### Login
<img width="941" height="437" alt="image" src="https://github.com/user-attachments/assets/f4586ba6-d8e1-477c-aed0-8bdb94ce7cf2" />

### Attendee Events
<img width="947" height="437" alt="image" src="https://github.com/user-attachments/assets/20d1b65f-af0e-409f-98b3-58d62ea8bcd9" />

### Attendee Event Details
<img width="937" height="414" alt="image" src="https://github.com/user-attachments/assets/cdb53fa0-b8fa-49fb-a817-7e3624c2e712" />

### Attendee Dashboard
<img width="939" height="430" alt="image" src="https://github.com/user-attachments/assets/80dba3d1-b64a-4933-8fc6-d61ac083c03b" />

### Attendee MyRegistrations
<img width="936" height="425" alt="image" src="https://github.com/user-attachments/assets/a71da915-2070-4d53-bce3-446285a7a3ef" />

### Organizer Events
<img width="935" height="444" alt="image" src="https://github.com/user-attachments/assets/8a32f104-7f5f-4953-94e5-1d8741d850c1" />

### Organizer Event Details
<img width="917" height="410" alt="image" src="https://github.com/user-attachments/assets/40248f7e-38d4-4f9d-b72c-5d669e28b40e" />

### Organizer Dashboard
<img width="938" height="379" alt="image" src="https://github.com/user-attachments/assets/64919d87-5e27-4d7c-b872-3207d7bf6964" />

### Organizer My Events
<img width="929" height="401" alt="image" src="https://github.com/user-attachments/assets/e8f420b0-9595-465f-80cd-c8d6a605d549" />

### Edit Event
<img width="923" height="427" alt="image" src="https://github.com/user-attachments/assets/def2deee-100c-4106-86b9-5c1cf5f72b0a" />


```

## 🔒 Environment Variables

Do not commit your `.env` file to GitHub.

Example `.env`:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Add `.env` to `.gitignore`:

```text
.env
node_modules/
dist/
```

## 🎯 Future Improvements

* Email notifications
* Event image uploads
* Pagination
* Advanced event filtering
* Event categories
* Organizer profiles
* Event reminders
* Deployment

## 👩‍💻 Author

**Greshma**

Full-Stack Event & Workshop Platform built using React, Node.js, Express, and PostgreSQL.
