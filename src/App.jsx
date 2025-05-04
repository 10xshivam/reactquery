import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { FetchOld } from './pages/FetchOld';
import { FetchRQ } from './pages/FetchRQ';
import { FetchIndv } from './pages/FetchIndv';
import { InfiniteScroll } from './pages/InfiniteScroll';
import { MainLayout } from './components/layout/MainLayout';
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroll />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

