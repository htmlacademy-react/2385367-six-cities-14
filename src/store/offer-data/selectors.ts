import { createSelector } from '@reduxjs/toolkit';
import { OfferData, State } from '../../types/state';
import { NameSpace } from '../../const';

export const getOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferData) => state.offer
);

export const getFetchingStatusOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferData) => state.fetchingStatusOffer
);
