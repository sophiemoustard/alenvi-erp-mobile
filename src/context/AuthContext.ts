import React from 'react';
import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/Authentication';
import asyncStorage from '../core/helpers/asyncStorage';

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

const signOut = (dispatch: React.Dispatch<ActionType>) => async () => {
  await Authentication.logOut();
  await asyncStorage.removeAlenviToken();
  await asyncStorage.removeRefreshToken();

  dispatch({ type: 'signOut' });
};

const refreshAlenviToken = (dispatch: React.Dispatch<ActionType>) => async (refreshToken: string | null) => {
  try {
    const { token, tokenExpireDate } = await Authentication.refreshToken({ refreshToken });
    await asyncStorage.setAlenviToken(token, tokenExpireDate);
    dispatch({ type: 'signIn', payload: token });
  } catch (e) {
    console.error(e);
  }
};

const tryLocalSignIn = (dispatch: React.Dispatch<ActionType>) => async () => {
  const { alenviToken, alenviTokenExpireDate } = await asyncStorage.getAlenviToken();
  if (asyncStorage.isTokenValid(alenviToken, alenviTokenExpireDate)) dispatch({ type: 'signIn', payload: alenviToken });
  else {
    const { refreshToken, refreshTokenExpireDate } = await asyncStorage.getRefreshToken();
    if (asyncStorage.isTokenValid(refreshToken, refreshTokenExpireDate)) {
      await refreshAlenviToken(dispatch)(refreshToken);
    } else await signOut(dispatch)();
  }

  dispatch({ type: 'render' });
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
