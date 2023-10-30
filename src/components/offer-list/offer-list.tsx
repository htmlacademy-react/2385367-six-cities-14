import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';

 type OfferListProps = {
   offers: Offers;
 }

function OfferList({offers}: OfferListProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardMouseEnter = (id: typeof activeCard) => {
    setActiveCard(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={ offer.id }
          { ...offer }
          onCardMouseEnter={ () => handleCardMouseEnter(offer.id) }
          onCardMouseLeave={ handleCardMouseLeave }
        />)
      )}
    </div>
  );
}

export default OfferList;

