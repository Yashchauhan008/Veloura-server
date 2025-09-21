# 🏆 Veloura-server | Hackathon Winner (2nd Runner-Up)

This repository contains the official backend source code for **Veloura**, a full-stack application developed for a hackathon where it secured the **2nd runner-up** position. The server is built with Node.js and Express, providing a robust and scalable foundation for the React frontend.

---

## ⚙️ Core Technologies
- **Runtime:** **Node.js**
- **Framework:** **Express.js**
- **Database:** **MongoDB** with **Mongoose** for object data modeling (ODM)
- **Authentication:** **JSON Web Tokens (JWT)** for secure, stateless user sessions
- **Middleware:** **CORS** for cross-origin requests, **bcrypt.js** for password hashing
- **Environment Variables:** **dotenv** for managing configuration

---

## ✨ Key Features
- 🔐 **Secure Authentication:** Full user registration and login flow with password hashing and JWT-based authorization.
- 📦 **RESTful API Architecture:** A clean and well-structured set of API endpoints for all CRUD (Create, Read, Update, Delete) operations.
- ⚙️ **Scalable Structure:** Organized into modules (routes, controllers, models) for maintainability and future expansion.
- 🔗 **CORS Enabled:** Properly configured to communicate securely with the React frontend.
- 🛡️ **Data Validation:** Implemented Mongoose schemas to ensure data integrity before it reaches the database.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm / yarn
- MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation & Setup
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/veloura-server.git
    cd veloura-server
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the server:**
    ```sh
    npm start
    ```
    The server will be running on `http://localhost:8080`.

---

## 👨‍💻 Authors
- **Yash Chauhan** ([@yashchauhan008](https://github.com/Yashchauhan008 ))
