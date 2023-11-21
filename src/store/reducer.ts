import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sortOffersByCityName, filterOffersByType, loadOffers, loadOffer, setOffersDataLoadingStatus, setOfferDataLoadingStatus, loadOffersNearby,requireAuthorization } from './action';
import { Offer, City, OfferPageType } from '../types/offer';
import { FilterType, CityMap, AuthorizationStatus } from '../const';

 type InitialState = {
   city: City;
   offers: Offer[];
   offersNearby: Offer[];
   currentOffer: OfferPageType | null;
   sortOffersByCityName: Offer[];
   filterOffersByType: Offer[];
   isOffersDataLoading: boolean;
   isOfferDataLoading: boolean;
   authorizationStatus: AuthorizationStatus;
 }

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  offersNearby: [],
  currentOffer: null,
  sortOffersByCityName: [],
  filterOffersByType: [],
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffersByCityName, (state, action) => {
      state.sortOffersByCityName = state.offers.filter((item) => item.city.name === action.payload.name);
    })
    .addCase(filterOffersByType, (state, action) => {
      switch (action.payload) {
        case FilterType.High:
          state.filterOffersByType = state.sortOffersByCityName.sort((a, b) => a.price - b.price);
          break;
        case FilterType.Low:
          state.filterOffersByType = state.sortOffersByCityName.sort((a, b) => b.price - a.price);
          break;
        case FilterType.Top:
          state.filterOffersByType = state.sortOffersByCityName.sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.filterOffersByType = state.sortOffersByCityName.slice();
      }
    });
});

export {reducer};
