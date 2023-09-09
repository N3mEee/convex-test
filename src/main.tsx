import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Game from './Game.tsx';
import { Id } from "../convex/_generated/dataModel";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: ":gameId" as Id<"games">,
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexProvider>
  </React.StrictMode>
)
