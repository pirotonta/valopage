import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Details from './pages/Details/Details.jsx';
import Favoritos from './pages/Favoritos/Favoritos.jsx';
import { ROUTES } from './const/routes.js';

const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: <Home />,
  },
  {
    path: ROUTES.Details,
    element: <Details />,
  },
  {
    path: ROUTES.Favoritos,
    element: <Favoritos />,
  },
]);

function App() {

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;