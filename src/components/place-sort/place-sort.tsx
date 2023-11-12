import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { filterOffer } from '../../store/action';

const filtersList = [
  {
    name: 'Popular',
    type: 'popular'
  },
  {
    name: 'Price: low to high',
    type: 'high'
  },
  {
    name: 'Price: high to low',
    type: 'low'
  },
  {
    name: 'Top rated first',
    type: 'top'
  },
];

function PlaceSort() {
  const [active, setActive] = useState(false);
  const [currentFilter, setCurrenFilter] = useState('Popular');

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
        {filtersList.map((item, i) => {
          const keyValue = `${item.name}-${i}`;
          return (
            <li
              key={keyValue}
              className={classNames({
                'places__option': true,
                'places__option--active': currentFilter === item.name
              })}
              tabIndex={0}
              onClick={() => {
                setCurrenFilter(item.name);
                setActive((prev) => !prev);
                dispatch(filterOffer(item.type));
              }}
            >{item.name}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default PlaceSort;
