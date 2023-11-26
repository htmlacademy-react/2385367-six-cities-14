import ReviewCard from '../review-card/review-card';
import { Review } from '../../types/review';

const MAX_REVIEWS_QUANTITY = 10;

 type ReviewListProps = {
   reviews: Review[];
 };

function ReviewList({ reviews }: ReviewListProps): JSX.Element {

  const sortReviews = reviews.slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_QUANTITY);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ sortReviews.length }</span></h2>
      <ul className="reviews__list">
        { sortReviews.map((review) => (
          <ReviewCard
            key={ review.id }
            { ...review }
          />)
        )}
      </ul>
    </>
  );
}

export default ReviewList;
