import './App.css';
import Home from './Components/Home'
import Login from './Components/Login'
import Calendar from './Components/Calendar'
import Movies from './Components/Movies'
import Maps from './Components/Maps'
import Error from './Components/Error'

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;
