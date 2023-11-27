import { Offers } from '../../types/offer';
import {OfferCardMemo as OfferCard} from '../offer-card/offer-card';

 type FavoritesOffersProps = {
   offers: Array<[string, Offers[]]>;
 }

function FavoritesOffers({offers}: FavoritesOffersProps) {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {offers.map(([city, offersList]) => {
            const keyValue = `${city}`;
            return (
              <li className="favorites__locations-items" key={keyValue}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {offersList.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      {...offer}
                      favorite
                    />)
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FavoritesOffers;
