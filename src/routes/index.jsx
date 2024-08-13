import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayout from "../container/mainLayout";
import NewsApi from "../container/newsApi";
import GuardianApi from "../container/guardianApi";
import NewYorkTimes from "../container/newYorkTimes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="main_layout" replace />,
  },
  {
    path: "main_layout",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="news-api" replace />,
      },
      {
        path: "news-api",
        element: <NewsApi />,
      },
      {
        path: "guardian",
        element: <GuardianApi />,
      },
      {
        path: "new-york-times",
        element: <NewYorkTimes />,
      },
    ],
  },
]);

export default router;
