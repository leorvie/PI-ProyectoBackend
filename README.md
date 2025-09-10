# PI-ProyectoBackend

## Project Overview

PI-ProyectoBackend is a Node.js RESTful API for managing users and tasks. It provides secure authentication, password recovery, and CRUD operations for tasks. The backend is built with Express, MongoDB (via Mongoose), and includes features such as JWT-based authentication, password hashing, and email notifications for password resets.

### Main Features

- User registration and login with secure password hashing
- JWT authentication with httpOnly cookies
- Password recovery via email with single-use, time-limited tokens
- Task creation, listing, updating, and deletion for authenticated users
- Modular code structure for easy maintenance and scalability

---

## Usage Flow

### 1. User Registration

Send a POST request to `/api/v1/register` with:

```json
{
  "name": "John",
  "lastname": "Doe",
  "age": 20,
  "email": "john@example.com",
  "password": "Password123!"
}
```

### 2. User Login

Send a POST request to `/api/v1/login` with:

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

On success, a cookie with the authentication token will be set.

### 3. Password Recovery

#### a) Forgot Password

Send a POST request to `/api/v1/forgot-password` with:

```json
{
  "email": "john@example.com"
}
```

You will receive an email with a reset link.

#### b) Reset Password

Send a POST request to `/api/v1/reset-password` with:

```json
{
  "token": "TOKEN_FROM_EMAIL",
  "password": "NewPassword123!"
}
```

### 4. Create Task

Send a POST request to `/api/v1/tasks/new` (authenticated) with:

```json
{
  "title": "Study",
  "details": "Review notes for the exam"
}
```

### 5. List Tasks

Send a GET request to `/api/v1/tasks` (authenticated) to retrieve all tasks for the logged-in user.
