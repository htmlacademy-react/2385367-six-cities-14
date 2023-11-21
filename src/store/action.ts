import { Offer, City, OfferPageType } from '../types/offer';

import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<City>('list/changeCity');

export const sortOffersByCityName = createAction<City>('offers/sortOffersByCityName');

export const filterOffersByType = createAction<string>('offers/filterOffersByType');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const loadOffer = createAction<OfferPageType>('data/loadOffer');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');
