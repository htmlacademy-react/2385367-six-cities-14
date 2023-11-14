import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortedOffersCity, filterOffer } from './action';
import { offers } from '../mocks/offers';
import { pageOffers } from '../mocks/offer-page';
import { Offer, City, OfferPageType } from '../types/offer';
import { FilterType } from '../const';

 type InitialState = {
   city: City['name'];
   offers: Offer[];
   pageOffers: OfferPageType[];
   sortOffers: Offer[];
   filterOffer: Offer[];
 }

const initialState: InitialState = {
  city: 'Paris',
  offers,
  pageOffers,
  sortOffers: offers.filter((item) => item.city.name === 'Paris'),
  filterOffer: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortedOffersCity, (state, action) => {
      state.sortOffers = state.offers.filter((item) => item.city.name === action.payload);
    })
    .addCase(filterOffer, (state, action) => {
      switch (action.payload) {
        case FilterType.High:
          state.sortOffers.sort((a, b) => a.price - b.price);
          break;
        case FilterType.Low:
          state.sortOffers.sort((a, b) => b.price - a.price);
          break;
        case FilterType.Top:
          state.sortOffers.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffer = state.sortOffers;
      }
      state.city = action.payload;
    });
});

export {reducer};
