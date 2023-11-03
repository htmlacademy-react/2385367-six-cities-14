import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';

 type OfferListProps = {
   offers: Offers;
   onItemMouseEnter: (id: number) => void;
   onItemMouseLeave: () => void;
 }


function OfferList({ offers, onItemMouseEnter, onItemMouseLeave }: OfferListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={ offer.id }
          { ...offer }
          onCardMouseEnter={ () => onItemMouseEnter(offer.id) }
          onCardMouseLeave={ onItemMouseLeave }
        />)
      )}
    </div>
  );
}

export default OfferList;

