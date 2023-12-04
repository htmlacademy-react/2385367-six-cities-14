import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { offerData } from './offer-data/offer-data';
import { userData } from './user-data/user-data';
import { reviewsData } from './reviews-data/reviews-data';
import { nearbyData } from './nearby-data/nearby-data';
import { favoritesData } from './favorites-data/favorites-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.NearPlaces]: nearbyData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
});
