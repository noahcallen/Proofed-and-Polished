# 📚 Proofed and Polished

**Proofed and Polished** is a role-based book tracking platform tailored for copyeditors and administrative users. It allows secure tracking of editing projects, including financial and production metrics such as hours worked, word count, hourly rate, and invoiced amounts. The app was designed with clarity, usability, and data transparency in mind.

---

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React Bootstrap**
- **Tailwind CSS** (via `globals.css`)
- **Firebase Realtime Database** (for user and book data)
- **Firebase Auth**
- **Netlify** (deployment)
- **React Icons**

---

## 🧠 Features

### 🔐 Authentication & Roles

- Firebase Authentication controls access.
- Admin users have full CRUD access.
- VA users have limited edit permissions (only update image, Amazon link, and post dates).

### 📖 Book Management

- Admin users can:
  - Create, edit, and delete books.
  - Track editing services (Proof, Copyedit, Line Edit).
  - Input financials like hours, hourly rate, invoiced amount.
  - Auto-calculate WPH and rate per word.
  - Post completed books to Facebook and Website.

- VA users can:
  - View limited book data.
  - Edit post dates and Amazon link.
  - Cannot modify sensitive data like finances.

### 💾 Data Fields Tracked

- Title, Author, Genre, Sub-Genre
- Date Completed
- Word Count
- Hours Worked
- Hourly Rate
- Invoiced Amount
- WPH (Words per Hour)
- Rate per Word
- Amazon Link
- Posted to Facebook
- Posted to Website

### 🖼️ UI/UX

- Responsive design using a combination of Tailwind and Bootstrap.
- Icons are grouped in a stylized pill container on the navbar.
- All data views and forms are styled within a soft gray background card.
- Book list and form views include scrollable areas and consistent spacing for readability.

---

## 🌐 Live Deployment & 🎥 Video Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/858ea93d-1c95-45d6-880a-a79e3e1e57ba/deploy-status)](https://app.netlify.com/sites/proofedandpolished/deploys)
- 🔗 **Live Site**: [Visit Proofed and Polished](proofedandpolished.netlify.app)
- 🎬 **Loom Demo**: [Watch Walkthrough on Loom](https://www.loom.com/share/5eb78a28d2dd4067a75f52fd460aa949?sid=957db5f3-0372-43fb-9ddd-377e48c32efe)

Explore the platform live or check out the demo to see how the roles, book tracking, and editing tools all come together in real-time.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js
- Firebase project with Realtime DB + Auth enabled
- `.env.local` file with all required `NEXT_PUBLIC_FIREBASE_*` keys

### 🧪 Install & Run

```bash
npm install
npm run dev
```

### 🔒 Environment Variables Example

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_db_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

### 💡 Inspiration

Built as a freelance capstone project to digitize and streamline the manual tracking process for editing work. Designed to feel familiar to users accustomed to spreadsheets while providing the scalability of a web app.
