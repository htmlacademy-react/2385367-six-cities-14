import { Offer, City, OfferPageType } from '../types/offer';
import { Review } from '../types/review';
import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<City>('list/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const loadOffer = createAction<OfferPageType>('data/loadOffer');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const addReview = createAction<Review>('review/addReview');

export const dropSendingStatus = createAction('review/dropSendingStatus');

export const loadReviews = createAction<Review[]>('data/loadReviews');
