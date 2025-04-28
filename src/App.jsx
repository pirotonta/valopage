import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Details from './pages/Details/Details.jsx';
import Favoritos from './pages/Favoritos/Favoritos.jsx';

import { ROUTES } from './const/routes.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      { path: ROUTES.Details, element: <Details /> },
      { path: ROUTES.Favoritos, element: <Favoritos /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;