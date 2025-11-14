# m1-s1-2025 Project — Fullstack Web Application

A fullstack library management platform built with:

- **NestJS** (backend API)
- **React + TypeScript** (frontend)
- **Ant Design** (UI components)
- **SQLite** (database via TypeORM)
- **REST API**, fully documented

Developed as a team project (4 members) for M1–S1 2025.

---

## 🚀 Project Features

### 📚 Library Features

- **Manage Books**: create, update, delete, list
- **Manage Authors** with full details, photos, biography, nationality
- **View Author Details Page** including all books written by the author
- **Borrow & return system** with availability tracking
- **Dynamic book availability status**

### 🌓 UI Features

- **Hero landing page** with background image
- **"Explore Now" button** routing to Books page
- **Dark mode / Light mode toggle**
- **Responsive design**

---

## 📁 Project Structure

```
|-- nest-api/          # Backend API (NestJS + TypeORM + SQLite)
|-- react-app/         # Frontend React application
|-- README.md
|-- .DS_Store
|-- package-lock.json
```

---

## 🛠️ Getting Started

### Backend — Nest API

```bash
cd nest-api
npm install
npm run start:dev
```

**Database:** SQLite with TypeORM entities.

The backend runs on:
👉 **http://localhost:3000**

### Frontend — React Application

```bash
cd react-app
npm install
npm run dev
```

The frontend runs on:
👉 **http://localhost:5173**

---

## 📖 API Documentation (Postman Collection)

The backend API is fully documented here:

👉 **[Postman Workspace Link](https://junia-webdev.postman.co/workspace/Web-dev-endpoints~9ad2942c-6a44-4e0d-a024-063a63f33a71/collection/29697104-8d147354-95e1-498e-8f52-81adcf86abb2?action=share&creator=29697104&action_performed=google_login&authFlowId=c9f5de63-eae5-4ef1-aac0-36486d54219b#)**

Contains:
- Book endpoints
- Author endpoints
- Borrow/Return logic
- Sales endpoints
- Users (Members, Librarian) endpoints

**Documentation by:** AgyemangDev  **(https://agyemangdev-portfolio.vercel.app)**

---

## ✨ Key Implementations

- **Author Details Page**: fetches author info and maps books into BookModel
- **Homepage Hero Section**: CTA button routing to Books page
- **Borrow / Return Logic**: prevents borrowing out-of-stock books
- **Dark Mode**: global theme toggle with saved preference
- **Responsive UI**: cards for Books, Authors, and Loans

---

## 🤝 Team Acknowledgement

This project was completed by a team of **4 developers**.

Special acknowledgement to **AgyemangDev** for API documentation and README.

---

## 📝 License

This project is developed for educational purposes as part of M1–S1 2025 curriculum.

---

## 🔗 Quick Links

- [Backend API Documentation](#)
- [Frontend Demo](#)
- [Project Requirements](#)

---

**Happy Coding! 📚✨**
