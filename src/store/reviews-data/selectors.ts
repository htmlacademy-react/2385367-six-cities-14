import { createSelector } from '@reduxjs/toolkit';
import { ReviewsData, State } from '../../types/state';
import { NameSpace } from '../../const';

export const getReviews = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.reviews
);

export const getSendingStatusReview = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.sendingStatusReview
);
