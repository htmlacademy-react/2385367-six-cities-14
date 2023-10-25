import { useState } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';

 type OfferListProps = {
   offers: Offers;
 }

function OfferList({offers}: OfferListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState('');

  const handleCardMouseEnter = (id: string) => {
    setActiveCard(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCard('');
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={ offer.id }
          { ...offer }
          handleCardMouseEnter={ () => handleCardMouseEnter(offer.id) }
          handleCardMouseLeave={ () => handleCardMouseLeave() }
        />)
      )}
    </div>
  );
}

export default OfferList;

