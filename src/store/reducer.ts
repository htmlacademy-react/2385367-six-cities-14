import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, loadOffer, setOffersDataLoadingStatus,
  setOfferDataLoadingStatus, loadOffersNearby,
  requireAuthorization, loadReviews, addReview, dropSendingStatus } from './action';
import { postReview } from './api-action';
import { Offer, City, OfferPageType } from '../types/offer';
import { Review } from '../types/review';
import { CityMap, AuthorizationStatus, RequestStatus } from '../const';

 type InitialState = {
   city: City;
   offers: Offer[];
   offersNearby: Offer[];
   currentOffer: OfferPageType | null;
   reviews: Review[];
   isOffersDataLoading: boolean;
   isOfferDataLoading: boolean;
   authorizationStatus: AuthorizationStatus;
   sendingReviewStatus: RequestStatus;
 }

const initialState: InitialState = {
  city: CityMap.Paris,
  offers: [],
  offersNearby: [],
  currentOffer: null,
  reviews: [],
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  sendingReviewStatus: RequestStatus.Unsent
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
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(postReview.pending, (state) => {
      state.sendingReviewStatus = RequestStatus.Pending;
    })
    .addCase(postReview.fulfilled, (state) => {
      state.sendingReviewStatus = RequestStatus.Success;
    })
    .addCase(postReview.rejected, (state) => {
      state.sendingReviewStatus = RequestStatus.Error;
    })
    .addCase(dropSendingStatus, (state) => {
      state.sendingReviewStatus = RequestStatus.Unsent;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
