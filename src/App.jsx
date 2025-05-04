import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Details from './pages/Details/Details.jsx';
import Favoritos from './pages/Favoritos/Favoritos.jsx';

import { ROUTES } from './const/routes.js';

import './i18n';

function ModalRoutingApp() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path={ROUTES.Home} element={<Home />} />
          <Route path={ROUTES.Favoritos} element={<Favoritos />} />
          <Route path={ROUTES.Details} element={<Details />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path={ROUTES.Details} element={<Details />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ModalRoutingApp />
    </BrowserRouter>
  );
}

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { path: ROUTES.Home, element: <Home /> },
//       { path: ROUTES.Details, element: <Details /> },
//       { path: ROUTES.Favoritos, element: <Favoritos /> },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

export default App;