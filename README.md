
# 📌 Mini User Management System

## 📖 Project Overview & Purpose

The **Mini User Management System** is a full-stack web application designed to manage users with secure authentication, role-based access control (RBAC), and administrative functionalities.
It allows users to register, log in, manage their profiles, and enables admins to manage users efficiently.

This project demonstrates **real-world backend authentication**, **JWT security**, and **modern React frontend practices**, making it suitable for learning, interviews, and production-level understanding.

---

## 🛠 Tech Stack Used

### Frontend

* React.js (Vite)
* Material UI (MUI)
* React Router DOM
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt

### Tools & Platforms

* Postman (API testing)
* Swagger / OpenAPI (API documentation)
* Vercel (Frontend deployment)
* Render / Railway (Backend deployment)

---

## ⚙️ Setup Instructions

### 📁 Clone the Repository

```bash
git clone <repository-url>
cd Mini-User-Management-System
```

---

### ▶️ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

### ▶️ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## 🔐 Environment Variables

### Frontend (`Frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`Backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_user_management
JWT_SECRET=change-me-to-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
```
NOTE :- All the values for the Env varibles are just Examples not real values replace with your own values

⚠️ **Do not commit `.env` files to GitHub**

---

## 🚀 Deployment Instructions

### Frontend Deployment (Vercel)

Deployed frontend URL:

https://mini-user-management-system-delta.vercel.app/

1. Push frontend code to GitHub
2. Go to **Vercel Dashboard**
3. Import GitHub repository
4. Set environment variable:

 ```
  VITE_API_URL=<backend-url>/api
 ```
5. Deploy 🚀

---

### Backend Deployment (Railway)

Deployed backend URL:

https://mini-user-management-system-production.up.railway.app

1. Push backend code to GitHub
2. Create a new Railway service (root directory: `Backend/`)
3. Add environment variables in Railway dashboard
4. Set start command:

   ```bash
   npm start
   ```
5. Deploy 🚀

---

## 🔑 API Documentation

### 🔹 Authentication APIs

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/api/auth/signup` | Register new user |
| POST   | `/api/auth/login`  | Login user        |
| GET    | `/api/auth/me`     | Get current user  |
| POST   | `/api/auth/logout` | Logout user       |

#### Example – Login Request

```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```

#### Example – Login Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here"
  }
}
```

---

### 🔹 User APIs

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| GET    | `/api/users/me`                 | Get logged-in user |
| PUT    | `/api/users/me`                 | Update profile     |
| PUT    | `/api/users/me/change-password` | Change password    |

---

### 🔹 Admin APIs

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/users`                | Get all users (Admin only) |
| PATCH  | `/api/users/:id/activate`   | Activate user              |
| PATCH  | `/api/users/:id/deactivate` | Deactivate user            |

---

## Documentation

### ✅ Postman Collection

Postman supports importing OpenAPI specs. Import `Backend/openapi.yaml` into Postman to generate a collection.

Shared collection link:

https://my-team-7869.postman.co/workspace/Personal-Workspace~75875260-af63-406e-8008-4388879f7de2/collection/37748553-f0590815-b85a-4868-b1cd-22b259037767?action=share&creator=37748553

---

### Example – Get my profile

```bash
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer <jwt-token>"
```

### Example – Admin list users (page 1)

```bash
curl "http://localhost:5000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer <admin-jwt-token>"
```

---

## 🔒 Security Features

* JWT-based authentication
* Role-based access control (Admin/User)
* Password hashing using bcrypt
* Protected routes on frontend & backend
* Token invalidation on logout

---

## 👨‍💻 Author

**Salman**
Full Stack Web Developer (Student)

---


