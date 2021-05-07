import React from 'react';
import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/Authentication';
import Users from '../api/Users';
import asyncStorage from '../core/helpers/asyncStorage';

const authReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn':
      return { ...state, companiToken: action.payload };
    case 'loggedUser':
      return { ...state, loggedUser: action.payload };
    case 'signOut':
      return { ...state, companiToken: null };
    case 'render':
      return { ...state, appIsReady: true };
    default:
      return state;
  }
};

const signIn = (dispatch: React.Dispatch<ActionType>) => async (payload: { email: string, password: string }) => {
  const { token, tokenExpireDate, refreshToken, user } = await Authentication.authenticate(payload);

  await asyncStorage.setCompaniToken(token, tokenExpireDate);
  await asyncStorage.setRefreshToken(refreshToken);
  await asyncStorage.setUserId(user._id);

  dispatch({ type: 'signIn', payload: token });
};

const refreshLoggedUser = (dispatch: React.Dispatch<ActionType>) => async () => {
  const userId = await asyncStorage.getUserId();
  const loggedUser = await Users.getById(userId);

  dispatch({ type: 'loggedUser', payload: loggedUser });
};

const signOut = (dispatch: React.Dispatch<ActionType>) => async () => {
  await Authentication.logOut();
  await asyncStorage.removeCompaniToken();
  await asyncStorage.removeRefreshToken();

  dispatch({ type: 'signOut' });
};

const refreshCompaniToken = (dispatch: React.Dispatch<ActionType>) => async (refreshToken: string | null) => {
  try {
    const { token, tokenExpireDate } = await Authentication.refreshToken({ refreshToken });
    await asyncStorage.setCompaniToken(token, tokenExpireDate);
    dispatch({ type: 'signIn', payload: token });
  } catch (e) {
    console.error(e);
  }
};

const tryLocalSignIn = (dispatch: React.Dispatch<ActionType>) => async () => {
  const { companiToken, companiTokenExpireDate } = await asyncStorage.getCompaniToken();

  if (asyncStorage.isTokenValid(companiToken, companiTokenExpireDate)) {
    dispatch({ type: 'signIn', payload: companiToken });
  } else {
    const { refreshToken, refreshTokenExpireDate } = await asyncStorage.getRefreshToken();
    if (asyncStorage.isTokenValid(refreshToken, refreshTokenExpireDate)) {
      await refreshCompaniToken(dispatch)(refreshToken);
    } else await signOut(dispatch)();
  }

  dispatch({ type: 'render' });
};

export const { Provider, Context } = createAuthContext(
  authReducer,
  { signIn, tryLocalSignIn, signOut, refreshLoggedUser },
  {
    companiToken: null,
    appIsReady: false,
    loggedUser: null,
    signIn: async () => {},
    tryLocalSignIn: async () => {},
    signOut: async () => {},
    refreshLoggedUser: async () => {},
  }
);
