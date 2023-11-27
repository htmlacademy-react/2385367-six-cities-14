import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavorite, deleteFavorite } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import classNames from 'classnames';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offer';

 type BookmarkProps = {
   id: Offers['id'];
   isFavorite: Offers['isFavorite'];
   onBookmarkClick: () => void;
 }

function Bookmark({ id, isFavorite, onBookmarkClick }: BookmarkProps) {
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigateTo(AppRoute.Login);
    }

    onBookmarkClick();

    if (isFavorite) {
      dispatch(deleteFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  return (
    <button
      type="button"
      onClick={ handleBookmarkClick }
      className={ classNames({
        'place-card__bookmark-button button': true,
        'place-card__bookmark-button--active': isFavorite
      })}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
