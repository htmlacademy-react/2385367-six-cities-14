
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';
import { Offers } from '../../types/offer';

import { AppRoute, AuthorizationStatus } from '../../const';

 type AppProps = {
   offers: Offers;
 }

function App({ offers }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Main
                offers={ offers }
              />
            }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute
                authorizationStatus={ AuthorizationStatus.Auth }
                redirectTo={ AppRoute.Login }
              >
                <Favorites offers={ offers } />
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
            path={`${AppRoute.Offer }:id`}
            element={ <Offer offers={ offers }/> }
          />
          <Route
            path={ AppRoute.NotFound }
            element={ <PageNotFound /> }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
