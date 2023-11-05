import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';

import { Offer, City } from '../../types/offer';
import { Review } from '../../types/review';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import FormComment from '../../components/form-comment/form-comment';
import { AppRoute } from '../../const';

 type OfferProps = {
   offers: Offer[];
   reviews: Review[];
   city: City;
 }
function OfferPage ({ offers, reviews, city }: OfferProps): JSX.Element | null {
  const params = useParams();
  const offer = offers.find((key) => key.id.toPrecision() === params.id);

  const [selectedPoint, setSelectedPoint] = useState<number | null>(
    null
  );
  const handleItemMouseEnter = (id: typeof selectedPoint) => {
    setSelectedPoint(id);
  };
  const handleItemMouseLeave = () => {
    setSelectedPoint(null);
  };

  if (!offer) {
    return <Navigate to={ AppRoute.NotFound } />;
  }
  return (
    <div className="page">
      <Helmet>
        <title>{ `6 cities - ${ offer.title }` }</title>
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
                  <Link to={ AppRoute.Favorites } className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              { offer.images.slice(0, 6).map((image)=> (
                <div key={ image } className="offer__image-wrapper">
                  <img className="offer__image" src={ image } alt={ offer.title } />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              { offer.isPremium &&
                 <div className="offer__mark">
                   <span>Premium</span>
                 </div> }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  { offer.title }
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(offer.rating) * 100 / 5}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{ offer.rating }</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  { offer.type }
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  { offer.bedrooms } Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max { offer.maxAdults } adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{ offer.price }</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) =>
                    <li key={ good } className="offer__inside-item">{ good }</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className= {offer.host.isPro ? 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' : 'offer__avatar-wrapper user__avatar-wrapper' }>
                    <img className="offer__avatar user__avatar" src={ offer.host.avatarUrl } width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{ offer.host.name }</span>
                  <span className="offer__user-status">{ offer.host.isPro ? 'Pro' : null }</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{ offer.description }</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList
                  reviews={ reviews }
                />
                <FormComment />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={ city }
              points={ offers.slice(0, 3) }
              selectedPoint={ selectedPoint }
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              type = 'near'
              offers={ offers.slice(0, 3) }
              onItemMouseEnter={ handleItemMouseEnter }
              onItemMouseLeave={ handleItemMouseLeave }
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
