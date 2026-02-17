# Primetrade.ai – Scalable Full-Stack Web Application

A modern, secure and scalable full-stack web application built as part of the Frontend Developer Intern Assignment.

## This project demonstrates:

* 🔐 **Secure JWT Authentication**
* 🛡 **Backend Security Best Practices**
* 📊 **Protected Dashboard with CRUD**
* ☁ **Cloudinary Image Upload Integration**
* 🎨 **Modern UI with Tailwind + shadcn**
* 📦 **Scalable Project Architecture**

---

## 🔗 Live Architecture Overview

`Client (React)  →  Express API (Cloudinary (Image/file Storage))) →  MongoDB`
                  

---

## 🛠 Tech Stack

### 🖥 Frontend

* React.js (Vite)
* React Router DOM
* TailwindCSS
* Axios (Custom instance)
* Context API (Auth management)
* Client-side validation (Zod)
* Toast notifications

### ⚙ Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt (Password Hashing)
* Multer (File Upload)
* Cloudinary (Image Storage)
* Custom Error Handling Middleware
* Async Handler Utility

---

## 📂 Project Structure (Scalable & Modular)

### Backend Architecture

`server/src`

* `controllers`      → Business logic
* `models`           → Mongoose schemas
* `routes`           → Route definitions
* `middlewares`      → Auth, multer
* `utils`            → Reusable helpers
* `db`               → Database connection
* `constants.js`     → Centralized constants
* `app.js`           → Express app setup

**Why This Is Scalable?**

* Separation of concerns
* Modular routing
* Middleware-based security
* Centralized error handling
* Utility abstraction (Cloudinary, asyncHandler, API responses)

### Frontend Architecture

`client/src`

* `api`              → All API calls
* `components`       → Reusable UI
* `context`          → Global Auth state
* `hooks`            → Custom hooks
* `pages`            → Route level views
* `utils`            → Validation schemas
* `App.jsx`          → Route configuration

**Why This Is Production Ready?**

* ProtectedRoute abstraction
* Centralized Axios instance
* AuthContext for global state
* Component separation

---

## 🔐 Authentication Flow

* **Registration:** Password hashed using bcrypt and stored securely in MongoDB.
* **Login:** JWT Access Token and Refresh Token generated.
* **Security:** JWT middleware validation, route-level protection, and environment-based secrets.

---

## 📊 Dashboard Features

* 🔐 Protected access (Login required)
* 👤 User profile fetch from backend
* 📝 CRUD operations on Posts
* 🔍 Search functionality & Status filter (Draft / Published)
* 🚪 Secure logout flow

---

## ☁ Cloudinary Integration (Extra Feature)

Implemented beyond assignment requirements to demonstrate real-world readiness:

* Image upload support for posts via Multer.
* Cloud-based storage using Cloudinary (No local storage dependency).
* Secure cloud URL storage in database.

---

## 🎨 UI/UX Improvements

* ✅ **Toast Notifications:** Success & error feedback for improved UX.
* ✅ **shadcn/ui Components:** Accessible and consistent modern design.
* ✅ **Pagination:** Scalable backend support for `page` and `limit`.
* ✅ **Search & Filter System:** Efficient MongoDB querying by title or status.

---

## 🚀 How to Run Locally

### Backend

1. `cd server`
2. `npm install`
3. `npm run dev`

**Create .env:**

```env
PORT=
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

### Frontend

1. `cd client`
2. `npm install`
3. `npm run dev`

---

## 📈 Scalability Strategy (Production Plan)

In a production environment, the following would be implemented:

* Refresh token rotation & HTTP-only cookies.
* Rate limiting and Role-based access control (RBAC).
* Redis caching layer and Docker containerization.
* CI/CD pipelines and centralized logging (Winston).

---

## 📬 API Documentation

Core APIs:

* `POST /api/users/register`
* `POST /api/users/login`
* `GET /api/users/profile`
* `POST /api/posts`
* `GET /api/posts`
* `PUT /api/posts/:id`
* `DELETE /api/posts/:id`

---

## 🧠 Engineering Decisions

* **JWT:** Stateless authentication improves scalability.
* **Modular Backend:** Allows easy horizontal scaling.
* **Cloudinary:** Production-grade image handling.
* **Context API:** Lightweight global auth state management.

---
