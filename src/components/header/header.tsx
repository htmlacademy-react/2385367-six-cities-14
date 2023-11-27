import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, getUser } from '../../store/user-data/selectors';
import { getFavorites } from '../../store/favorites-data/selectors';

function Header() {
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favorites = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={ AppRoute.Main } className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorizationStatus === AuthorizationStatus.Auth
                ?
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={ AppRoute.Favorites }
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{ user?.email }</span>
                      <span className="header__favorite-count">{ favorites.length }</span>
                    </Link>
                  </li>

                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="#"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
                :
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={ AppRoute.Login }
                  >
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
