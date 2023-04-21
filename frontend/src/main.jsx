import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Home from './pages/Home/Home.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/register",
        element: <Register />
      },
    ],
  }, 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
