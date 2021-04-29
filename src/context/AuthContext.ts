import React from 'react';
import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/Authentication';
import asyncStorage from '../core/helpers/asyncStorage';
import Users from '../api/Users';

const authReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn':
      return { ...state, alenviToken: action.payload.token, loggedUser: action.payload.loggedUser };
    case 'signOut':
      return { ...state, alenviToken: null };
    case 'render':
      return { ...state, appIsReady: true };
    default:
      return state;
  }
};

const signIn = (dispatch: React.Dispatch<ActionType>) => async (payload: { email: string, password: string }) => {
  const { token, tokenExpireDate, refreshToken, user } = await Authentication.authenticate(payload);

  await asyncStorage.setAlenviToken(token, tokenExpireDate);
  await asyncStorage.setRefreshToken(refreshToken);
  await asyncStorage.setUserId(user._id);

  const loggedUser = await Users.getById(user._id);

  dispatch({ type: 'signIn', payload: { token, loggedUser } });
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

  if (asyncStorage.isTokenValid(alenviToken, alenviTokenExpireDate)) {
    dispatch({ type: 'signIn', payload: { token: alenviToken } });
  } else {
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
    loggedUser: null,
    signIn: async () => {},
    tryLocalSignIn: async () => {},
    signOut: async () => {},
  }
);
