
# Sweety – Blood Glucose Tracker (Backend)

## Project Overview

Sweety is a Blood Glucose Tracking application that allows users to securely record, manage, and monitor their daily blood glucose readings.

This repository contains the backend API built using NestJS, Node.js, and PostgreSQL. It provides user authentication, glucose reading management, and report summary endpoints.

## Technologies Used

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt
- TypeORM / PostgreSQL database integration
- Swagger API Documentation

## Features

- User registration and login.
- Secure password hashing using bcrypt.
- JWT-based authentication.
- User-specific glucose readings.
- Add, view, update, and delete glucose readings.
- Validation of glucose values and reading slots.
- Daily glucose summary.
- Protected API endpoints.
- Swagger API documentation.

## Project Structure

```text
sweety-Backend/
│
├── src/
│   ├── auth/
│   ├── users/
│   ├── readings/
│   ├── reports/
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js
- npm
- PostgreSQL
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/Navyasripuvvada/sweety-Backend.git
```

Navigate to the project directory:

```bash
cd sweety-Backend
```

Install dependencies:

```bash
npm install
```

## Database Setup

1. Open PostgreSQL using pgAdmin.
2. Create a database named:

```sql
CREATE DATABASE sweety_db;
```

3. Configure your PostgreSQL credentials in the `.env` file.

The application uses PostgreSQL to store user accounts and glucose readings.

## Environment Configuration

Create a `.env` file in the backend root directory.

Add the following variables using your own local configuration:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_DATABASE=sweety_db

JWT_SECRET=your_secret_key
```

Refer to `.env.example` for the required environment variables.

**Important:** Never commit your actual `.env` file or expose database credentials and JWT secrets.

## Running the Application

Start the development server:

```bash
npm run start:dev
```

The backend API will run at:

```text
http://localhost:3000
```

## API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api
```

Use Swagger UI to explore and test the available API endpoints.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/:id` | Get user details |

### Glucose Readings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/readings` | Add a glucose reading |
| GET | `/readings` | Get user's readings |
| GET | `/readings?date=YYYY-MM-DD` | Get readings for a specific date |
| PUT | `/readings/:id` | Update a reading |
| DELETE | `/readings/:id` | Delete a reading |

### Reports

| Method | Endpoint | Description |
|---|---|---|
| GET | `/reports/summary` | Get glucose summary |
| GET | `/reports/summary?date=YYYY-MM-DD` | Get summary for a selected date |

## Reading Validation

The application supports four reading slots:

- Morning fasting
- After breakfast
- After lunch
- After dinner

Validation includes:

- Glucose value must be a whole number.
- Glucose value must be between 40 and 600 mg/dL.
- Only one reading is allowed per slot per day.
- A maximum of four readings is allowed per day.
- Future dates are not allowed.

## Authentication

The application uses JWT authentication to protect private API endpoints.

After successful login, the API returns an access token.

Include the token in the Authorization header when accessing protected endpoints:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Passwords are hashed using bcrypt before being stored in the database.

## Testing

Run the backend test suite using:

```bash
npm test
```

Run end-to-end tests using:

```bash
npm run test:e2e
```

## Notes and Assumptions

- Each user can access only their own glucose readings.
- Each day supports a maximum of four readings.
- Each reading belongs to one of the four predefined time slots.
- Glucose values are stored in mg/dL.
- PostgreSQL is used for persistent data storage.
- JWT authentication protects user-specific resources.

## Future Improvements

- Month-to-date and previous-month reports.
- Pagination for reading history.
- Automated backend and frontend tests.
- Glucose trend charts.
- Docker-based deployment.

## Author

Developed as part of the Junior Full Stack Developer – JavaScript & AI technical assignment.
