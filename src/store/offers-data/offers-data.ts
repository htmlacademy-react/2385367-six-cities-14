import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus, CityMap } from '../../const';
import { OffersData } from '../../types/state';
import { City } from '../../types/offer';
import { fetchOffersAction } from '../api-action';

const initialState: OffersData = {
  offers: [],
  fetchingStatusOffers: RequestStatus.Unsent,
  activeCity: CityMap.Paris
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<City>) {
      state.activeCity = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.fetchingStatusOffers = RequestStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.fetchingStatusOffers = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.fetchingStatusOffers = RequestStatus.Error;
      });
  },
});

export const { setActiveCity } = offersData.actions;
