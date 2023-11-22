
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import OfferPage from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-router/history-router.tsx';
import browserHistory from '../../browser-history';

import { AppRoute } from '../../const';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={ browserHistory }>
        <Routes>
          <Route
            index
            element={
              <Main/>
            }
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute
                authorizationStatus={ isAuthorizationStatus }
                redirectTo={ AppRoute.Login }
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={ AppRoute.Login }
            element={ <Login /> }
          />
          <Route
            path={`${AppRoute.Offer }:id`}
            element={
              <OfferPage />
            }
          />
          <Route
            path={ AppRoute.NotFound }
            element={ <PageNotFound /> }
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
