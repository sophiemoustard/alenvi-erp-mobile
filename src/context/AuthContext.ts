import React from 'react';
import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/Authentication';
import asyncStorage from '../core/helpers/asyncStorage';

const authReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn':
      return { ...state, companiToken: action.payload.token, loggedUser: action.payload.loggedUser };
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

  dispatch({ type: 'signIn', payload: { token } });
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
    dispatch({ type: 'signIn', payload: { token: companiToken } });
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
  { signIn, tryLocalSignIn, signOut },
  {
    companiToken: null,
    appIsReady: false,
    loggedUser: null,
    signIn: async () => {},
    tryLocalSignIn: async () => {},
    signOut: async () => {},
  }
);
