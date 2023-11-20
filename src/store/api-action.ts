import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, OfferPageType } from '../types/offer';
import { loadOffers, loadOffersNearby, loadOffer, setOffersDataLoadingStatus, setOfferDataLoadingStatus, sortOffersByCityName } from './action';
import { APIRoute } from '../const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'data/fetchOffers',
   async (_arg, {dispatch, getState, extra: api}) => {
     const {city} = getState();
     dispatch(setOffersDataLoadingStatus(true));
     const {data} = await api.get<Offer[]>(APIRoute.Offers);
     dispatch(setOffersDataLoadingStatus(false));
     dispatch(loadOffers(data));
     dispatch(sortOffersByCityName(city));
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
    const {data: dataOfferNearby} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOfferDataLoadingStatus(false));
    dispatch(loadOffer(dataOffer));
    dispatch(loadOffersNearby(dataOfferNearby));
  }
);
