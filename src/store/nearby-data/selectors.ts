import { createSelector } from '@reduxjs/toolkit';
import { NearbyData, State } from '../../types/state';
import { NameSpace } from '../../const';

export const getNearbyOffers = createSelector(
  (state: State) => state[NameSpace.NearPlaces],
  (state: NearbyData) => state.nearby
);
