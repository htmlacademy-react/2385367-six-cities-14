
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';

import { AppRoute, AuthorizationStatus } from '../../const';

 type AppProps = {
   offers: number;
 }

function App({ offers }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={ <Main offers={ offers } /> }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute
                authorizationStatus={ AuthorizationStatus.NoAuth }
                redirectTo={ AppRoute.Login }
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={ AppRoute.Login }
            element={
              <PrivateRoute
                authorizationStatus={ AuthorizationStatus.Auth }
                redirectTo={ AppRoute.Main }
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={ AppRoute.Offer }
            element={ <Offer /> }
          />
          <Route
            path='*'
            element={ <PageNotFound /> }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
