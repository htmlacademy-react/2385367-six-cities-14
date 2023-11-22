import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import classNames from 'classnames';
import { changeCity } from '../../store/action';
import { CityMap } from '../../const';

 type CityListProps = {
   currentCity: string;
 }

function CityList({ currentCity }: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {Object.values(CityMap).map((city, i) => {
        const keyValue = `${city.name}-${i}`;
        return (
          <li className="locations__item" key={keyValue}>
            <Link to={ '#' }
              className={classNames({
                'locations__item-link': true,
                'tabs__item': true,
                'tabs__item--active': currentCity === city.name
              })}

              onClick={(evt) => {
                evt.preventDefault();
                dispatch(changeCity(city));
              }}
            >
              <span>{city.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CityList;
