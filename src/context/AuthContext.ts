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
    default:
      return state;
  }
};

const signIn = (dispatch: React.Dispatch<ActionType>) => async (payload: { email: string, password: string }) => {
  const { token, tokenExpireDate } = await Authentication.authenticate(payload);
  await asyncStorage.setAlenviToken(token, tokenExpireDate);

  dispatch({ type: 'signIn', payload: token });
};

const tryLocalSignIn = (dispatch: React.Dispatch<ActionType>) => async () => {
  const { alenviToken, alenviTokenExpireDate } = await asyncStorage.getAlenviToken();

  if (DatesHelper.isSameOrAfter(new Date(), alenviTokenExpireDate)) return signOut(dispatch)();
  return dispatch({ type: 'signIn', payload: alenviToken });
};

const signOut = (dispatch: React.Dispatch<ActionType>) => async () => {
  await Authentication.logOut();
  await asyncStorage.removeAlenviToken();

  dispatch({ type: 'signOut' });
};

export const { Provider, Context } = createAuthContext(
  authReducer,
  { signIn, tryLocalSignIn, signOut },
  { alenviToken: null, signIn: async () => {}, tryLocalSignIn: async () => {}, signOut: async () => {} }
);
