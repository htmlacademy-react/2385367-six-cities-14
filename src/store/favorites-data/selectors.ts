import { createSelector } from '@reduxjs/toolkit';
import { FavoritesData, State } from '../../types/state';
import { NameSpace } from '../../const';

export const getFavorites = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.favorites
);

export const getFetchingStatusFavorites = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.fetchingStatusFavorites
);
