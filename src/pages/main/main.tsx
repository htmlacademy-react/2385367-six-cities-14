import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities-empty/cities-empty';
import { CityListMemo as CityList } from '../../components/city-list/city-list';
import { getOffers, getActiveCity } from '../../store/offers-data/selectors';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction, fetchOffersAction } from '../../store/api-action';
import { getFetchingStatusOffers } from '../../store/offers-data/selectors';
import { RequestStatus} from '../../const';
import Loader from '../../components/loader/loader';

function Main(): JSX.Element {

  const activeCity = useAppSelector(getActiveCity);
  const isOffersDataLoading = useAppSelector(getFetchingStatusOffers);
  const offers = useAppSelector(getOffers);
  const isEmptyOffersListByCity = offers.map((offer) => offer.city.name).includes(activeCity.name);
  const isEmpty = offers.length === 0 || !isEmptyOffersListByCity;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (isOffersDataLoading === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{ '6 cities - Main Page' }</title>
      </Helmet>
      <Header/>
      <main className={classNames({
        'page__main page__main--index': true,
        'page__main--index-empty': isEmpty
      })}
      >
        <CityList currentCity={activeCity.name} />

        {isEmpty ?
          <CitiesEmpty /> :
          <Cities
            offers={offers}
            activeCity={activeCity}
          />}
      </main>
    </div>
  );
}
export default Main;
