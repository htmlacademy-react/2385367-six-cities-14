import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';

 type FavoritesProps = {
   offers: Offer[];
 }

function Favorites({ offers }: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>{ '6 cities - Favorites' }</title>
      </Helmet>
      <Header/>
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
