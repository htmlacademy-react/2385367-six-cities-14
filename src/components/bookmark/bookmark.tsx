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
   type: string;
   large?: boolean;
 }

function Bookmark({ id, isFavorite, onBookmarkClick, type, large = false }: BookmarkProps) {
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
      className={ classNames(`${type}__bookmark-button`, 'button', {[`${type}__bookmark-button--active`]: isFavorite && authorizationStatus === AuthorizationStatus.Auth}
      )}
    >
      <svg className={classNames(`${type}__bookmark-icon`)}
        width={large ? '31' : '18'}
        height={large ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
