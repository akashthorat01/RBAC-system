# Role-Based Access Control (RBAC) System

Welcome to the RBAC System! This is a complete full-stack application demonstrating authentication, authorization, and role management.

## ✨ Features
- **User Authentication**: Secure login and registration.
- **Role-Based Access**: Role assignment (Admin, User) governing what users can see and do.
- **Secure Backend**: Spring Boot backend with JWT-based stateless authentication.
- **Modern Frontend**: React + Vite + Tailwind CSS for a fast, responsive user interface.
- **H2 Database**: Lightweight database for immediate local setup.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Axios, React Router.
- **Backend**: Java, Spring Boot, Spring Security, JWT, Maven.
- **Database**: H2 In-Memory Database / File-based.

## ⚙️ Running Locally

### 1. Start the Backend
```bash
cd backend
./mvnw spring-boot:run
```
The backend API will be available at `http://localhost:8080`.

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.
