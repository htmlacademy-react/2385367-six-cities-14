import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

 type OfferCardProps = Offer & {
   handleCardMouseEnter: () => void;
   handleCardMouseLeave: () => void;
 };

function OfferCard(props: OfferCardProps): JSX.Element {
  const {id, title, type, price, isFavorite, previewImage, isPremium, rating, handleCardMouseEnter, handleCardMouseLeave} = props;

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={ handleCardMouseEnter }
      onMouseLeave={ handleCardMouseLeave }
    >
      {isPremium &&
         <div className="place-card__mark">
           <span>Premium</span>
         </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={ `${AppRoute.Offer}${id}` }>
          <img className="place-card__image" src={ previewImage } width="260" height="200" alt={ title } />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{ price }</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 100 / 5}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{ title }</Link>
        </h2>
        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
}

export default OfferCard;
