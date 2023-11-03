import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OfferList from '../../components/offer-list/offer-list';
import { Offers } from '../../types/offer';
import { AppRoute } from '../../const';

 type FavoritesProps = {
   offers: Offers;
 }

function Favorites({ offers }: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>{ '6 cities - Favorites' }</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={ AppRoute.Main } className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OfferList
              offers={ offers }
              onItemMouseEnter={ () => '' }
              onItemMouseLeave={ () => '' }
            />
          </section>
        </div>
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
