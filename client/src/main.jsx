import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ViewTasks from "./pages/ViewTasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/viewtasks",
        element: (
          <ProtectedRoute>
            <ViewTasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addtask",
        element: (
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edittask/:id",
        element: (
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
