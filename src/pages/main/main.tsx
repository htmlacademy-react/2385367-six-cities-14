import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Offer } from '../../types/offer.ts';
import { AppRoute } from '../../const.ts';
import OfferList from '../../components/offer-list/offer-list.tsx';
import Map from '../../components/map/map.tsx';
import CityList from '../../components/city-list/city-list.tsx';
import PlaceSort from '../../components/place-sort/place-sort.tsx';
import Header from '../../components/header/header.tsx';
import { useAppSelector } from '../../hooks/index.ts';

function Main(): JSX.Element {

  const activeCity = useAppSelector((state) => state.city);
  const sortOffersByCityName = useAppSelector((state) => state.sortOffersByCityName);

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );
  const handleItemMouseEnter = (id: string) => {
    const currentPoint = sortOffersByCityName.find((item) => item.id === id);
    setSelectedPoint(currentPoint);
  };
  const handleItemMouseLeave = () => {
    setSelectedPoint(undefined);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{ '6 cities - Main Page' }</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList
              currentCity={ activeCity.name }
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{ sortOffersByCityName.length } places to stay in { activeCity.name }</b>
              <PlaceSort
                currentCity={ activeCity.name }
              />
              <OfferList
                offers={ sortOffersByCityName }
                type = 'cities'
                onItemMouseEnter={ handleItemMouseEnter }
                onItemMouseLeave={ handleItemMouseLeave }
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={ activeCity }
                points={ sortOffersByCityName }
                selectedPoint={ selectedPoint }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Main;
