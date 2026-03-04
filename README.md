Markdown

# 🚀 FavNotes – Modern MERN Dashboard

A professional, high-performance note-taking application built with **React 18**, **Redux**, and **Styled-components**. The project follows **Atomic Design** principles and is fully integrated with a **MongoDB** database.

[Image of MERN stack architecture diagram]

## ✨ Key Features

- **Full Auth System**: Secure login and registration flow using `Formik` and `Redux Thunk`.
- **Dynamic Layouts**: Content-aware UI that automatically switches themes (colors & icons) between Notes, Twitters, and Articles.
- **Advanced Routing**: Dynamic details views and protected navigation using `react-router-dom` v6.
- **State Management**: Centralized store with `Redux` handling asynchronous API calls via `Thunk`.
- **Data Persistence**: Real-time CRUD operations connected to a **MongoDB Atlas** database.

## 🎨 Styling Architecture (CSS-in-JS)

This project utilizes a sophisticated styling system to ensure modularity and scalability:

- **Styled-components**: Complete encapsulation of styles within React components.
- **Dynamic Theming**: Global `ThemeProvider` that reacts to the current `pageType` (Yellow for Notes, Blue for Twitter, Orange for Articles).
- **Props-driven UI**: Components dynamically adapt their appearance based on passed props (e.g., active states, colors).
- **Atomic Design**: Organized structure of Atoms, Molecules, and Organisms.

## 🛠️ Tech Stack

- **Frontend**: React 18 (Hooks), **Styled-components** (CSS-in-JS), Prop-types.
- **State**: Redux, Redux Thunk, Axios.
- **Forms**: Formik + Yup validation.
- **Routing**: React Router v6.
- **Backend & DB**: Node.js/Express, **MongoDB Atlas**.
- **Build Tool**: Vite (Lightning-fast HMR).

## 📂 Project Structure

```text
src/
  ├── assets/          # Icons, fonts, and images
  ├── components/      # Atomic UI components (Styled-components)
  ├── routes/          # Centralized route definitions
  ├── store/           # Redux logic: reducers, actions & thunks
  ├── theme/           # Global styles and mainTheme (CSS-in-JS)
  ├── views/           # Full page views (Notes, Articles, Twitters)
  └── template/        # Layout wrappers (MainTemplate, AuthTemplate)


```

## 🚀 Getting Started

Clone the repository

```
Bash
git clone [https://github.com/wiolip/favnotes.git](https://github.com/wiolip/favnotes.git)
Install dependencies

Bash
npm install
Setup Environment
Ensure your backend API (MongoDB/Express) is running on http://localhost:9000.

Run the development server

Bash
npm run dev
```

## 📝 Recent Milestones

✅ Refactored from Class Components/Context to Modern Redux Hooks (useSelector, useDispatch).

✅ Implemented CSS-in-JS dynamic coloring system.

✅ Fixed navigation issues with React Router v6.

✅ Automated date formatting for new entries.

⏳ Next Step: Real-time Search functionality.

Created with ❤️ by a Modern React Developer.
