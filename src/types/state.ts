import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const';
import { AuthorizedUser } from './user-data';
import { Offers, City, Offer } from './offer';
import { Review } from './review';

export type UserData = {
   user: AuthorizedUser | null;
   authorizationStatus: AuthorizationStatus;
   sendingStatusLogin: RequestStatus;
 }

export type OffersData = {
   offers: Offers[];
   fetchingStatusOffers: RequestStatus;
   activeCity: City;
 }

export type OfferData = {
   offer: Offer | null;
   fetchingStatusOffer: RequestStatus;
 }

export type ReviewsData = {
   reviews: Review[];
   fetchingStatusReviews: RequestStatus;
   sendingStatusReview: RequestStatus;
 }

export type NearbyData = {
   nearby: Offers[];
   fetchingStatusNearby: RequestStatus;
 }

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
