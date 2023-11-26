import { createSelector } from '@reduxjs/toolkit';
import { UserData, State } from '../../types/state';
import { NameSpace } from '../../const';

export const getUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.user
);

export const getAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.authorizationStatus
);
