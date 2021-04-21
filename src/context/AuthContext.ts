import React from 'react';
import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/Authentication';
import asyncStorage from '../core/helpers/asyncStorage';
import DatesHelper from '../core/helpers/dates';

const authReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn':
      return { ...state, alenviToken: action.payload };
    case 'signOut':
      return { ...state, alenviToken: null };
    case 'render':
      return { ...state, appIsReady: true };
    default:
      return state;
  }
};

const signIn = (dispatch: React.Dispatch<ActionType>) => async (payload: { email: string, password: string }) => {
  const { token, tokenExpireDate, refreshToken } = await Authentication.authenticate(payload);
  await asyncStorage.setAlenviToken(token, tokenExpireDate);
  await asyncStorage.setRefreshToken(refreshToken);

  dispatch({ type: 'signIn', payload: token });
};

const tryLocalSignIn = (dispatch: React.Dispatch<ActionType>) => async () => {
  const { alenviToken, alenviTokenExpireDate } = await asyncStorage.getAlenviToken();
  const { refreshToken, refreshTokenExpireDate } = await asyncStorage.getRefreshToken();

  if (DatesHelper.isSameOrAfter(new Date(), alenviTokenExpireDate)) {
    if (DatesHelper.isSameOrAfter(new Date(), refreshTokenExpireDate))(await signOut(dispatch)());
    else {
      const { token: newToken,
        tokenExpireDate: newExpireDate } = await Authentication.refreshToken({ refreshToken });
      await asyncStorage.setAlenviToken(newToken, newExpireDate);
      dispatch({ type: 'signIn', payload: newToken });
    }
  } else dispatch({ type: 'signIn', payload: alenviToken });

  dispatch({ type: 'render' });
};

const signOut = (dispatch: React.Dispatch<ActionType>) => async () => {
  await Authentication.logOut();
  await asyncStorage.removeAlenviToken();

  dispatch({ type: 'signOut' });
};

export const { Provider, Context } = createAuthContext(
  authReducer,
  { signIn, tryLocalSignIn, signOut },
  {
    alenviToken: null,
    appIsReady: false,
    signIn: async () => {},
    tryLocalSignIn: async () => {},
    signOut: async () => {},
  }
);
