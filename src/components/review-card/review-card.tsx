import { Review } from '../../types/review';
import { months } from '../../const';

function ReviewCard({ date, user, comment, rating }: Review): JSX.Element {
  const formatDate = (dateString: string): string => {

    const currentDate = new Date(dateString);
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];

    return `${day < 10 ? '0' : ''}${day} ${month}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={ user.avatarUrl } width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{ user.name }</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating * 100 / 5}%` }}></span>
            <span className="visually-hidden">{ rating } </span>
          </div>
        </div>
        <p className="reviews__text">{ comment }</p>
        <time className="reviews__time" dateTime={ date.split('T')[0]}>{formatDate(date) }</time>
      </div>
    </li>
  );
}

export default ReviewCard;

