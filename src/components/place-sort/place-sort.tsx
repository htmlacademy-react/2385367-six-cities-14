import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { filterOffersByType } from '../../store/action';

type FiltersListType = Record<string, string>;

const filtersList: FiltersListType = {
  'popular' : 'Popular',
  'high' :'Price: low to high',
  'low' : 'Price: high to low',
  'top' : 'Top rated first',
};

function PlaceSort() {
  const [active, setActive] = useState(false);
  const [currentFilter, setCurrenFilter] = useState(filtersList.popular);

  const dispatch = useAppDispatch();

  const placeSortClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': active,
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setActive((prev) => !prev)}
      >
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={placeSortClass}>
        {Object.keys(filtersList).map((key) => {
          const keyValue = `${filtersList[key]}`;
          return (
            <li
              key={keyValue}
              className={classNames({
                'places__option': true,
                'places__option--active': currentFilter === filtersList[key]
              })}
              tabIndex={0}
              onClick={() => {
                setCurrenFilter(filtersList[key]);
                setActive((prev) => !prev);
                dispatch(filterOffersByType(key));
              }}
            >{filtersList[key]}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default PlaceSort;
