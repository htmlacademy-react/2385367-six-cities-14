import ReviewCard from '../review/review';
import { Review } from '../../types/review';

 type ReviewListProps = {
   reviews: Review[];
 };

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{ reviews.length }</span></h2>
      <ul className="reviews__list">
        { reviews.map((review) => (
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
