import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('list/changeCity');

export const sortOffersByCityName = createAction<string>('offers/sortOffersByCityName');

export const filterOffersByType = createAction<string>('offers/filterOffersByType');
