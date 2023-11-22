import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import FormComment from '../../components/form-comment/form-comment';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import OfferPicturesGallery from '../../components/offer-pictures-gallery/offer-pictures-gallery';
import DetailedOffer from '../../components/detailed-offer/detailed-offer';
import { AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction } from '../../store/api-action';


function OfferPage (): JSX.Element {

  const {id: offerId} = useParams();

  const isOfferDataLoading = useAppSelector((state) => state.isOfferDataLoading);
  const pageOffer = useAppSelector((state) => state.currentOffer);
  const reviews = useAppSelector((state) => state.reviews);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const isAuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferAction(offerId));
    }
  }, [dispatch, offerId]);

  const randomNearbyOffers = offersNearby.slice(1, 4);
  const randomNearbyMap = offersNearby.slice(1, 4);
  if (pageOffer) {
    randomNearbyMap.push(pageOffer);
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


  if (isOfferDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>{ `6 cities - ${ pageOffer?.title }` }</title>
      </Helmet>
      <Header/>
      {!isOfferDataLoading && pageOffer &&
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferPicturesGallery offer={ pageOffer } />

          <div className="offer__container container">
            <div className="offer__wrapper">
              <DetailedOffer
                offer={ pageOffer }
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
      </main>}
    </div>
  );
}

export default OfferPage;
