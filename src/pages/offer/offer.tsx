import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';

import { Review } from '../../types/review';
import { Offer } from '../../types/offer';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import FormComment from '../../components/form-comment/form-comment';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction } from '../../store/api-action';

 type OfferProps = {
   reviews: Review[];
 }
function OfferPage ({ reviews }: OfferProps): JSX.Element | null {

  const {id: offerId} = useParams();

  const isOfferDataLoading = useAppSelector((state) => state.isOfferDataLoading);
  const pageOffer = useAppSelector((state) => state.currentOffer);
  const offersNearby = useAppSelector((state) => state.offersNearby);

  const randomNearbyOffers = offersNearby.slice(1, 4);
  const randomNearbyMap = offersNearby.slice(1, 4);
  if (pageOffer) {
    randomNearbyMap.push(pageOffer);
  }

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );
  const handleItemMouseEnter = (id: string) => {
    const currentPoint = randomNearbyOffers.find((item) => item.id === id);
    setSelectedPoint(currentPoint);
  };
  const handleItemMouseLeave = () => {
    setSelectedPoint(undefined);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
    }
  }, [dispatch, offerId]);

  if (isOfferDataLoading) {
    return (
      <Loader />
    );
  }

  if (!pageOffer) {
    return (
      <Navigate to={ AppRoute.NotFound } />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>{ `6 cities - ${ pageOffer.title }` }</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              { pageOffer.images.slice(0, 6).map((image)=> (
                <div key={ image } className="offer__image-wrapper">
                  <img className="offer__image" src={ image } alt={ pageOffer.title } />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              { pageOffer.isPremium &&
                 <div className="offer__mark">
                   <span>Premium</span>
                 </div> }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  { pageOffer.title }
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
                  <span style={{ width: `${Math.round(pageOffer.rating) * 100 / 5}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{ pageOffer.rating }</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  { pageOffer.type }
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  { pageOffer.bedrooms } Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max { pageOffer.maxAdults } adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{ pageOffer.price }</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {pageOffer.goods.map((good) =>
                    <li key={ good } className="offer__inside-item">{ good }</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className= {pageOffer.host.isPro ? 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' : 'offer__avatar-wrapper user__avatar-wrapper' }>
                    <img className="offer__avatar user__avatar" src={ pageOffer.host.avatarUrl } width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{ pageOffer.host.name }</span>
                  <span className="offer__user-status">{ pageOffer.host.isPro ? 'Pro' : null }</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{ pageOffer.description }</p>
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
              city={ pageOffer.city }
              points={ randomNearbyMap }
              selectedPoint={ selectedPoint }
              pageOffer = { pageOffer }
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              type = 'near'
              offers={ randomNearbyOffers }
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
