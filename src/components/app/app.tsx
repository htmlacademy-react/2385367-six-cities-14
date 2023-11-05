
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import OfferPage from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';
import { Offer, City } from '../../types/offer';
import { Review } from '../../types/review';

import { AppRoute, AuthorizationStatus } from '../../const';

 type AppProps = {
   offers: Offer[];
   city: City;
   reviews: Review[];
 }

function App({ offers, city, reviews }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Main
                offers={ offers }
                city = { city }
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
            element={
              <OfferPage
                offers={ offers }
                city = { city }
                reviews = { reviews }
              />
            }
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
