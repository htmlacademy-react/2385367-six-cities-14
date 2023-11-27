import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offers, Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { AuthorizedUser } from '../types/user-data';
import { Review, ReviewData } from '../types/review';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute, NameSpace, FavoriteStatus } from '../const';


export const fetchOffersAction = createAsyncThunk<Offers[], undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   `${NameSpace.Offers}/fetchOffers`,
   async (_arg, {extra: api}) => {
     const { data } = await api.get<Offers[]>(APIRoute.Offers);

     return data;
   }
 );

export const fetchOfferAction = createAsyncThunk<Offer, Offers['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offer}/fetchOffer`,
  async (id, {extra: api}) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], Offers['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, {extra: api}) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const fetchOfferNearbyAction = createAsyncThunk<Offers[], Offers['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.NearPlaces}/fetchNearPlace`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers[]>(`${APIRoute.Offers}/${id}/nearby`);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthorizedUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthorizedUser>(APIRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<AuthorizedUser, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, status} = await api.post<AuthorizedUser>(APIRoute.Login, {email, password});

    if (status >= 200 && status < 300) {
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
    }
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/logout`,
  async(_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const postReview = createAsyncThunk<Review, {reviewData: ReviewData; offerId: Offers['id']}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Reviews}/postReview`,
  async ({reviewData, offerId}, {extra: api}) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, reviewData);

    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offers[]>(APIRoute.Favorite);

    return data;
  }
);

export const addFavorite = createAsyncThunk<Offers, Offers['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/addFavorite`,
  async (id, {extra: api}) => {
    const { data } = await api.post<Offers>(`${APIRoute.Favorite}/${id}/${FavoriteStatus.Add}`);

    return data;
  }
);

export const deleteFavorite = createAsyncThunk<Offers, Offers['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Favorites}/deleteFavorite`,
  async (id, {extra: api}) => {
    const { data } = await api.post<Offers>(`${APIRoute.Favorite}/${id}/${FavoriteStatus.Delete}`);

    return data;
  }
);
