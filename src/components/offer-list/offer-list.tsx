import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';
import classNames from 'classnames';

 type OfferListProps = {
   type?: 'cities' | 'near';
   offers: Offer[];
   onItemMouseEnter: (id: number) => void;
   onItemMouseLeave: () => void;
 }


function OfferList({ offers, type, onItemMouseEnter, onItemMouseLeave }: OfferListProps): JSX.Element {

  const offerListClass = classNames({
    'places__list': true,
    'cities__places-list': type === 'cities',
    'near-places__list': type === 'near',
    'tabs__content': type === 'cities'
  });

  return (
    <div className={ offerListClass }>
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

