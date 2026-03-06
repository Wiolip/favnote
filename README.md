Markdown

# 🚀 FavNotes – Modern MERN Dashboard

[**🌐 View Live Demo**] [favnotes.vercel.app] (https://favnote.vercel.app)

A professional, high-performance note-taking application built with **React 18**, **Redux**, and **Styled-components**.

A professional, high-performance note-taking application built with **React 18**, **Redux**, and **Styled-components**. The project follows **Atomic Design** principles and is fully integrated with a **MongoDB** database.

## ✨ Key Features

- **Full Auth System**: Secure login and registration flow using `Formik` and `Redux Thunk`.
- **Dynamic Layouts**: Content-aware UI that automatically switches themes (colors & icons) between Notes, Twitters, and Articles.
- **Advanced Routing**: Dynamic details views and protected navigation using `react-router-dom` v6.
- **State Management**: Centralized store with `Redux` handling asynchronous API calls via `Thunk`.
- **Data Persistence**: Real-time CRUD operations connected to a **MongoDB Atlas** database.

## 🎨 Styling Architecture (CSS-in-JS)

This project utilizes a sophisticated styling system to ensure modularity and scalability:

- **Styled-components**: Complete encapsulation of styles within React components.
- **Dynamic Theming**: Global `ThemeProvider` that reacts to the current `pageType` (Yellow for Notes, Grey for X-post , Green for Articles).
- **Props-driven UI**: Components dynamically adapt their appearance based on passed props (e.g., active states, colors).
- **Atomic Design**: Organized structure of ui elements, common and layout .

## 🛠️ Tech Stack

- **Frontend**: React 18 (Hooks), **Styled-components** (CSS-in-JS), Prop-types.
- **State**: Redux, Redux Thunk, Axios.
- **Forms**: Formik + Yup validation.
- **Routing**: React Router v6.
- **Backend & DB**: Node.js/Express, **MongoDB Atlas**.
- **Build Tool**: Vite (Lightning-fast HMR).

## 📂 Project Structure

```text

├── _backend/           # Node.js/Express server (handles API & DB connection)
│     └── server.js     # Entry point for the backend
├── src/                # Frontend application (React)
│     ├── assets/       # Static assets (icons, fonts, images)
│     ├── components/   # Atomic UI components (Atoms, Molecules, Organisms)
│     ├── routes/       # Route configuration & protected routes
│     ├── store/        # Redux state: slices, actions & thunks
│     ├── theme/        # Styled-components global styles & mainTheme
│     ├── views/        # Main pages (Notes, Articles, Twitters)
│     └── template/     # Layout templates for Auth and User pages


```

## 🚀 Getting Started

```

Make sure you have Node.js installed on your machine

1/ Clone the repository

git clone [https://github.com/wiolip/favnotes.git](https://github.com/wiolip/favnotes.git)
Install dependencies

2/ Backend Setup (Database & API)

# Navigate to the backend folder
cd _backend

# Install backend dependencies
npm install

# Start the server
node server.js

Note: The server will start on http://localhost:9000. Ensure this port is free.


3/ Frontend Setup

# Navigate to the root directory
cd ..

# Install frontend dependencies
npm install

# Run the development server
npm run dev

```

## 📝 Recent Milestones

✅ Refactored from Class Components/Context to Modern Redux Hooks (useSelector, useDispatch).

✅ Implemented CSS-in-JS dynamic coloring system.

✅ Fixed navigation issues with React Router v6.

✅ Automated date formatting for new entries.

⏳ Next Step: Real-time Search functionality.

Created with ❤️ by a Modern React Developer.
