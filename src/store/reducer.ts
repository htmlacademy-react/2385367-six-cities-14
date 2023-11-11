import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity } from './action';
import { offers } from '../mocks/offers';
import { pageOffers } from '../mocks/offer-page';
import { Offer, City, OfferPageType } from '../types/offer';

 type InitialState = {
   city: City['name'];
   offers: Offer[];
   pageOffers: OfferPageType[];
   sortOffers: Offer[];
 }

const initialState: InitialState = {
  city: 'Paris',
  offers,
  pageOffers,
  sortOffers: offers.filter((item) => item.city.name === 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortedOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    });
});

export {reducer};
