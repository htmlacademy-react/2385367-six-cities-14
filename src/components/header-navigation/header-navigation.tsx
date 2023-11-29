import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getFavorites } from '../../store/favorites-data/selectors';
import { getAuthorizationStatus, getUser } from '../../store/user-data/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';

function HeaderNavigation() {
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthorizationStatus === AuthorizationStatus.Auth
          ?
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{user?.email}</span>
                <span className="header__favorite-count">{favorites.length}</span>
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
          <li className="header__nav-item header__nav-link--profile">
            <Link
              className="header__nav-link"
              to={AppRoute.Login}
            >
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
