import { ChangeEvent, useState, useEffect, FormEvent, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Offers } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReview } from '../../store/api-action';
import { getSendingStatusReview } from '../../store/reviews-data/selectors';
import { dropSendingStatusReview } from '../../store/reviews-data/reviews-data';
import { RequestStatus } from '../../const';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

 type FormCommentProps = {
   offerId: Offers['id'];
 }

function FormComment({offerId}: FormCommentProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(getSendingStatusReview);

  const isValid =
     comment.length >= MIN_COMMENT_LENGTH &&
     comment.length <= MAX_COMMENT_LENGTH &&
     rating !== '';

  const handleRadioChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postReview({reviewData: {comment, rating: Number(rating)}, offerId}));
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (sendingStatus) {
        case RequestStatus.Success:
          setComment('');
          setRating('');
          dispatch(dropSendingStatusReview());
          break;
        case RequestStatus.Pending:
          setIsSubmitting(true);
          break;
        case RequestStatus.Error:
          toast.warn('Комментарий не отправлен');
          setIsSubmitting(false);
          break;
        default:
          setIsSubmitting(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [sendingStatus, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={ handleFormSubmit }>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap).toReversed().map(([score, title]) => (
          <Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
              checked={rating === score}
              disabled={isSubmitting}
              onChange={handleRadioChange}
            />
            <label
              htmlFor={`${score}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isSubmitting}
        onChange={ handleTextAreaChange }
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                       To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>Submit</button>
      </div>
    </form>
  );
}

export default FormComment;

