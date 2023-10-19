
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import Offer from '../../pages/offer/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';

 type AppProps = {
   offers: number;
 }

function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={ <Main offers={ offers } /> }
        />
        <Route
          path={ AppRoute.Favorites }
          element={
            <PrivateRoute authorizationStatus={ AuthorizationStatus.NoAuth }>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={ AppRoute.Login }
          element={ <Login /> }
        />
        <Route path={ AppRoute.Offer }>
          <Route
            path=':id'
            element={ <Offer /> }
          />
        </Route>
        <Route
          path='*'
          element={ <PageNotFound /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
