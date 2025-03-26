# Sprint 8 - Improcode

Welcome to **Sprint 8 - Improcode!** 🎉

This is a **fullstack app** to save events on a map, view them in a calendar, and analyze them with charts. It’s designed for developers to test, improve, and contribute.

## 🌍 Live Demo

- **Frontend (Vercel):** [Sprint 8 - Improcode](https://sprint-8-improcode.vercel.app/)
- **Backend (Render):** Deployed and running on Render.

---

## 🚀 What it does

- **Map:** Save events on a map using **Mapbox**.
- **Calendar:** Display events in a calendar with **FullCalendar**.
- **Charts:** View event data through **Charts.js**.
- **Fullstack:** Built with **React + TypeScript** (frontend) and **Node.js + Express** (backend).

---

## 🛠️ Tools Used

### **Frontend**
- **React with TypeScript**
- **Tailwind CSS** (for styling)
- **Mapbox** (for map integration)
- **FullCalendar** (for event scheduling)
- **Charts.js** (for data visualization)
- **Installed via npm**

### **Backend**
- **Node.js + Express**
- **TypeScript**
- **Mongoose** (to connect to MongoDB)
- **Nodemon** (for development mode)
- **CORS** (to manage API requests)
- **Dotenv** (to handle secret variables)

---

## 🏗️ How to Install and Run

### **What You Need First**
- **Node.js** (version 18 or higher recommended)
- **Git** (for version control)
- **MongoDB** (Atlas or local instance)
- **Terminal or Command Prompt**

### **Clone the Project**
```sh
git clone https://github.com/LuisAlejandroCortesGalan/Sprint-8-Improcode.git
```

---

## 📡 Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd Sprint-8-Improcode/S-8/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend folder and add:
   ```sh
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   ```
   Replace `<your-mongodb-connection-string>` with your **MongoDB URI**.

4. Start the backend in development mode:
   ```sh
   npm run dev
   ```

### **CORS Notice**
For development, CORS is set to allow all origins (`*`). This is fine for testing but should be restricted in production.

> **Backend is deployed on Render** ✅

---

## 🎨 Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd Sprint-8-Improcode/S-8/front_end
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the app in your browser:
   [http://localhost:5173](http://localhost:5173) (or the port displayed in the terminal).

> **Frontend is deployed on Vercel** ✅

---

## 🎯 Why this Project?
This app is built for developers who want to **test, experiment, and contribute**. Feel free to **check the code, suggest improvements, or report issues**.

---

## 🤝 How to Contribute

1. **Fork the repository.**
2. **Create a new branch:**
   ```sh
   git checkout -b feature/new-thing
   ```
3. **Make your changes and commit:**
   ```sh
   git commit -m "Added new feature"
   ```
4. **Push your branch:**
   ```sh
   git push origin feature/new-thing
   ```
5. **Open a Pull Request.**

---

## ⚠️ Troubleshooting
If anything goes wrong or you have questions, **open an issue** in the repository.

---

### Thanks for trying **Sprint 8 - Improcode!** 🚀
