import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, OfferPageType } from '../types/offer';
import { loadOffers, loadOffersNearby, loadOffer, setOffersDataLoadingStatus, setOfferDataLoadingStatus, requireAuthorization, redirectToRoute, addReview, loadReviews } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, ReviewData } from '../types/review';
import { dropToken, saveToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'data/fetchOffers',
   async (_arg, {dispatch, extra: api}) => {
     dispatch(setOffersDataLoadingStatus(true));
     const {data} = await api.get<Offer[]>(APIRoute.Offers);
     dispatch(setOffersDataLoadingStatus(false));
     dispatch(loadOffers(data));
   }
 );

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatus(true));
    const {data: dataOffer} = await api.get<OfferPageType>(`${APIRoute.Offers}/${id}`);
    const {data: dataReviews} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    const {data: dataOfferNearby} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadOffer(dataOffer));
    dispatch(loadReviews(dataReviews));
    dispatch(loadOffersNearby(dataOfferNearby));
    dispatch(setOfferDataLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login)
      .then(() => dispatch(requireAuthorization(AuthorizationStatus.Auth)))
      .catch(() => dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, status} = await api.post<UserData>(APIRoute.Login, {email, password});

    if (status >= 200 && status < 300) {
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }
);

export const postReview = createAsyncThunk<void, {reviewData: ReviewData; offerId: Offer['id']}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/postReview',
  async ({reviewData, offerId}, {dispatch, extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, reviewData);
    dispatch(addReview(data));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Login));
  }
);
