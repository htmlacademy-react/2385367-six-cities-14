import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { NearbyData } from '../../types/state';
import { fetchOfferNearbyAction } from '../api-action';

const initialState: NearbyData = {
  nearby: [],
  fetchingStatusNearby: RequestStatus.Unsent
};

export const nearbyData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferNearbyAction.pending, (state) => {
        state.fetchingStatusNearby = RequestStatus.Pending;
      })
      .addCase(fetchOfferNearbyAction.fulfilled, (state, action) => {
        state.fetchingStatusNearby = RequestStatus.Success;
        state.nearby = action.payload;
      })
      .addCase(fetchOfferNearbyAction.rejected, (state) => {
        state.fetchingStatusNearby = RequestStatus.Error;
      });
  },
});
