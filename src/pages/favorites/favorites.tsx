import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';

import Header from '../../components/header/header';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { getFavorites } from '../../store/favorites-data/selectors';
import { getFetchingStatusFavorites } from '../../store/favorites-data/selectors';
import Loader from '../../components/loader/loader';
import FavoritesOffers from '../../components/favorites-offers/favorites-offers';
import FavoritesOffersEmpty from '../../components/favorites-offers-empty/favorites-offers-empty';
import { fetchFavoritesAction } from '../../store/api-action';
import { Offers } from '../../types/offer';
import { getAuthorizationStatus } from '../../store/user-data/selectors';

const getFavoritesByCity = (favorites: Offers[]) => favorites.reduce<{[key: string]: Offers[]}>((acc, current) => {
  const city = current.city.name;

  if (!(city in acc)) {
    acc[city] = [];
  }
  acc[city].push(current);

  return acc;
}, {});

function Favorites(): JSX.Element {

  const favorites = useAppSelector(getFavorites);
  const fetchingStatus = useAppSelector(getFetchingStatusFavorites);
  const favoriteByCity = getFavoritesByCity(favorites);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isEmpty = favorites.length === 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

  if (fetchingStatus === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <div className={classNames('page', {['page--favorites-empty']: isEmpty})}>
      <Helmet>
        <title>{ '6 cities - Favorites' }</title>
      </Helmet>
      <Header/>
      <main
        className={classNames('page__main', 'page__main--favorites', {['page__main--favorites-empty']: isEmpty})}
      >
        {isEmpty ?
          <FavoritesOffersEmpty /> :
          <FavoritesOffers
            offers={Object.entries(favoriteByCity)}
          />}
      </main>
      <footer className="footer container">
        <Link to={ AppRoute.Main } className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
