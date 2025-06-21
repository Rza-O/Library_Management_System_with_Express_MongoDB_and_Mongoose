# 📚 Library Management System

A full-featured RESTful Library Management System built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. It supports core functionalities such as book management, borrowing system with availability tracking, data aggregation, and flexible querying.

---
## 🔗 Live Link
- https://library-management-system-eight-ruddy.vercel.app/

## 📽️ Video 
- https://drive.google.com/file/d/1TYLrJk6GBHx4_4z3IiWMMNHSQIGc86DT/view?usp=sharing

## 🚀 Features

- 🔐 **Schema Validation** with Mongoose & TypeScript
- 🔄 **Business Logic Enforcement**:
  - Auto-update availability on borrow
  - Prevent borrowing more than available
- 🧠 **Instance Method** to deduct book copies and update availability
- ⚙️ **Middleware Hook** to handle availability during book creation/update
- 📊 **Aggregation Pipeline** to summarize borrowed books
- 🔍 **Advanced Querying**: filter, sort, and limit books
- ✅ **Robust Error Handling** with clear success & failure responses
- 📦 **RESTful API** architecture with versioning support

---

## 🧱 Tech Stack

- **Backend**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Mongoose schema validation
- **Tooling**: ts-node-dev, dotenv, nodemon, ESLint

---

## 📁 Project Structure

```plaintext
src/
├── app.ts                  # Express setup and configuration
    ├── routes/             # 
    ├── models/             # Mongoose models and interfaces
    ├── controllers/        # Business logic & API routes for books and borrowing
    ├── interfaces/         # TypeScript interfaces
├── server.ts               # Application entry point
├── app.ts                  # Application entry point

```
---

## 📦 API Endpoints

### 1. **Books**

#### ➕ Create Book  
`POST /api/books`

#### 📚 Get All Books  
`GET /api/books`  
Supports query:  
`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### 🔍 Get Book by ID  
`GET /api/books/:bookId`

#### ✏️ Update Book  
`PUT /api/books/:bookId`

#### ❌ Delete Book  
`DELETE /api/books/:bookId`

---

### 2. **Borrow**

#### 📥 Borrow a Book  
`POST /api/borrow`  
Business Logic:
- Checks availability and quantity
- Deducts quantity
- Auto-disables availability if copies run out
- Saves borrow record

#### 📊 Borrowed Books Summary  
`GET /api/borrow`  
Returns:
```json
[
  {
    "book": {
      "title": "1984",
      "isbn": "9780451524935"
    },
    "totalQuantity": 5
  }
]

```

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Prerequisites

- **Node.js**: Version >= 18
- **MongoDB**: Either MongoDB Atlas or a local MongoDB instance

### 2️⃣ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
2. Create a .env file in the project root based on .env.example

    ```bash
   MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
   ```
3. Install dependencies
    ```bash
    npm install
4. Start the development server
    ```bash
    npm run dev

## ⚙️ Developer Notes
- 📦 Borrowing Logic: Enforces atomic business logic using instance methods for reliable transactions.
- 📈 Aggregation Pipeline: Efficiently summarizes borrowing statistics for quick insights.
- 🧪 Testing: Easily testable using tools like Postman or ThunderClient.
- 📌 Scalability: Designed with modularity and scalability in mind for future enhancements.

## 🧩 Future Improvements
- Implement user authentication using JWT.

- Develop an admin panel with dashboards for better management.

- Add a "return book" feature.

- Introduce due date reminders via email notifications.

- Set up CI/CD pipelines and improve testing coverage.








