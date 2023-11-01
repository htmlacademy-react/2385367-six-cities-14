import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';

 type OfferListProps = {
   offers: Offers;
   onListItemHover: (id: string) => void;
 }


function OfferList({ offers, onListItemHover }: OfferListProps): JSX.Element {
  const handleCardHover = (id: string) => {
    onListItemHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={ offer.id }
          { ...offer }
          onCardHover={ () => handleCardHover(offer.id) }
        />)
      )}
    </div>
  );
}

export default OfferList;

