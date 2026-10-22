# MERN Employee Management System

A full-stack Employee Management System built with MongoDB, Express.js, React, and Node.js. The application provides an interface for administrators to manage employee records through an authenticated backend API.

## Features

- Admin login and authentication using JSON Web Tokens (JWT)
- Create, view, update, and delete employee records
- Search employees by name
- Filter employees by department
- Paginated employee list with five records per page
- Employee status management: Active and Inactive
- Backend validation and error handling
- Password hashing for the administrator account

## Technology Stack

**Frontend**
- React
- Vite
- React Router
- Tailwind CSS
- Lucide React icons

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
employee-management-system/
├── client/                  # React frontend
│   ├── src/
│   │   ├── Components/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
├── server/                  # Express backend
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── createAdmin.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB, either locally or through MongoDB Atlas
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd employee-management-system
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL of your GitHub repository.

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open a second terminal from the project root and run:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a local `.env` file inside the `server/` directory. Use `server/.env.example` as a reference.

Configure these variables with your own values:

```dotenv
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
```

**Security:** Do not commit your `.env` file, database credentials, administrator password, or JWT secret.

### 5. Create the initial administrator

From the `server/` directory, run:

```bash
node createAdmin.js
```

The script creates an administrator account using the configured environment variables if an admin account does not already exist.

### 6. Start the backend

From the `server/` directory, run:

```bash
node server.js
```

The backend listens on port `5000` and connects to the configured MongoDB database.

### 7. Start the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available Frontend Scripts

Run these commands from the `client/` directory:

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the frontend for production |
| `npm run lint` | Runs ESLint checks |
| `npm run preview` | Previews the production build locally |

## API Overview

The backend currently exposes these routes:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/test` | Checks that the API responds |
| `POST` | `/api/auth/login` | Authenticates a user |
| `GET` | `/api/employees` | Retrieves employee records |
| `POST` | `/api/employees` | Creates an employee |
| `PUT` | `/api/employees/:id` | Updates an employee |
| `DELETE` | `/api/employees/:id` | Deletes an employee |

Employee endpoints require a valid authentication token. The login endpoint is implemented through the authentication router.

## Current Project Status

This is a learning and portfolio project. It is designed to demonstrate full-stack development concepts, including React state management, REST API integration, authentication, database operations, validation, and error handling.

The documented commands describe the current local development setup. Production deployment and additional production-hardening measures may be needed before using the application in a real business environment.
