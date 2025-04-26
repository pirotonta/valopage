import { useState } from 'react'
import {Home} from './pages/Home'
import {Details} from './pages/Details'
import {Favoritos} from './pages/Favoritos'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ROUTES} from './const/routes.js'


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.DETAILS,
    element: <Details />,
  },
  {
    path: ROUTES.FAVORITES,
    element: <Favoritos />,
  },
]);


function App() {

  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
