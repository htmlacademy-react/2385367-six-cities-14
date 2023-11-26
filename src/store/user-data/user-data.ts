import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus, RequestStatus } from '../../const';
import { loginAction, logoutAction, checkAuthAction } from '../api-action';
import { UserData } from '../../types/state';

const initialState: UserData = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  sendingStatusLogin: RequestStatus.Unsent
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.sendingStatusLogin = RequestStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.sendingStatusLogin = RequestStatus.Success;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.sendingStatusLogin = RequestStatus.Error;
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
