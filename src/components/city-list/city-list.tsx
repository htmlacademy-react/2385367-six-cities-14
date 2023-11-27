import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { setActiveCity } from '../../store/offers-data/offers-data';
import { CityMap } from '../../const';

 type CityListProps = {
   currentCity: string;
 }

function CityList({ currentCity }: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.values(CityMap).map((city) => {
              const keyValue = `${city.name}`;
              return (
                <li className="locations__item" key={keyValue}>
                  <Link
                    className={classNames({
                      'locations__item-link': true,
                      'tabs__item': true,
                      'tabs__item--active': currentCity === city.name
                    })}
                    to="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(setActiveCity(city));
                    }}
                  >
                    <span>{city.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

export const CityListMemo = memo(CityList);
