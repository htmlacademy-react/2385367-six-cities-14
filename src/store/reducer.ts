import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortOffersByCityName, filterOffersByType } from './action';
import { offers } from '../mocks/offers';
import { pageOffers } from '../mocks/offer-page';
import { Offer, City, OfferPageType } from '../types/offer';
import { FilterType } from '../const';

 type InitialState = {
   city: City['name'];
   offers: Offer[];
   pageOffers: OfferPageType[];
   sortOffersByCityName: Offer[];
   filterOffersByType: Offer[];
 }

const initialState: InitialState = {
  city: 'Paris',
  offers,
  pageOffers,
  sortOffersByCityName: offers.filter((item) => item.city.name === 'Paris'),
  filterOffersByType: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffersByCityName, (state, action) => {
      state.sortOffersByCityName = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(filterOffersByType, (state, action) => {
      switch (action.payload) {
        case FilterType.High:
          state.sortOffersByCityName.sort((a, b) => a.price - b.price);
          break;
        case FilterType.Low:
          state.sortOffersByCityName.sort((a, b) => b.price - a.price);
          break;
        case FilterType.Top:
          state.sortOffersByCityName.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffersByType = state.sortOffersByCityName;
      }
    });
});

export {reducer};
