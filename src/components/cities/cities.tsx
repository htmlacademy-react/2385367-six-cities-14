import { useState, useCallback, useMemo } from 'react';
import {PlaceSortMemo as PlaceSort} from '../place-sort/place-sort';
import { OfferListMemo as OfferList } from '../offer-list/offer-list';
import Map from '../map/map';
import { Offers, City } from '../../types/offer';
import { sorting } from '../../utils/sort';
import { FilterType } from '../../const';

 type CitiesProps = {
  offers: Offers[];
  activeCity: City;
}

function Cities({offers, activeCity}: CitiesProps) {

  const [currentSort, setCurrentSort] = useState(FilterType.Popular);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(
    null
  );

  const sortOffersByCityName = useMemo(() => offers.slice()
    .filter((item) => item.city.name === activeCity.name),
  [activeCity.name, offers]);

  const sortOffersByCategory = useMemo(() => sorting[currentSort](sortOffersByCityName),[currentSort, sortOffersByCityName]);

  const handleChangeSort = useCallback((newSort: string) => {
    setCurrentSort(newSort);
  }, []);

  const handleItemMouseEnter = (id: string) => {
    const currentPoint = sortOffersByCityName.slice().filter((item) => item.id === id);
    setSelectedPoint(currentPoint[0].id);
  };
  const handleItemMouseLeave = () => {
    setSelectedPoint(null);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{ sortOffersByCityName.length } places to stay in { activeCity.name }</b>
          <PlaceSort
            onChange={ handleChangeSort }
          />
          <OfferList
            offers={ sortOffersByCategory }
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
  );
}

export default Cities;
