import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import { OfferListMemo as OfferList } from '../../components/offer-list/offer-list';
import FormComment from '../../components/form-comment/form-comment';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import OfferPicturesGallery from '../../components/offer-pictures-gallery/offer-pictures-gallery';
import DetailedOffer from '../../components/detailed-offer/detailed-offer';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, fetchReviewsAction, fetchOfferNearbyAction, fetchFavoritesAction } from '../../store/api-action';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { getOffer } from '../../store/offer-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { getNearbyOffers } from '../../store/nearby-data/selectors';
import { getFetchingStatusOffer } from '../../store/offer-data/selectors';

const MAX_NEAR_PLACES = 3;
const MAX_MAP_PIN = 3;


function Offer (): JSX.Element {

  const {id: offerId} = useParams();

  const isOfferDataLoading = useAppSelector(getFetchingStatusOffer);
  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const offersNearby = useAppSelector(getNearbyOffers);
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      dispatch(fetchOfferNearbyAction(offerId));
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, offerId]);

  const randomNearbyOffers = offersNearby.slice(0, MAX_NEAR_PLACES);
  const randomNearbyMap = offersNearby.slice(0, MAX_MAP_PIN);
  if (offer) {
    randomNearbyMap.push(offer);
  }

  const [selectedPoint, setSelectedPoint] = useState<string | null>(
    null
  );
  const handleItemMouseEnter = (id: string) => {
    const currentPoint = randomNearbyOffers.slice().filter((item) => item.id === id);
    setSelectedPoint(currentPoint[0].id);
  };
  const handleItemMouseLeave = () => {
    setSelectedPoint(null);
  };


  if (isOfferDataLoading === RequestStatus.Pending) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>{ `6 cities - ${ offer?.title }` }</title>
      </Helmet>
      <Header/>
      {isOfferDataLoading === RequestStatus.Success && offer &&
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferPicturesGallery offer={ offer } />

          <div className="offer__container container">
            <div className="offer__wrapper">
              <DetailedOffer
                offer={ offer }
              />
              <section className="offer__reviews reviews">
                <ReviewList
                  reviews={reviews}
                />
                {isAuthorizationStatus === AuthorizationStatus.Auth &&
              <FormComment
                offerId={offerId as string}
              />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={ offer.city }
              points={ randomNearbyMap }
              selectedPoint={ selectedPoint }
              offer = { offer }
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
      </main>}
    </div>
  );
}

export default Offer;
