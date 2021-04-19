import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/Authentication';
import asyncStorage from '../core/helpers/asyncStorage';

const authReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'signin':
      return { ...state, alenviToken: action.payload };
    default:
      return state;
  }
};

const signIn = (dispatch: any) => async (payload: { email: string, password: string }) => {
  const { token, tokenExpireDate } = await Authentication.authenticate(payload);
  await asyncStorage.setAlenviToken(token, tokenExpireDate);

  dispatch({ type: 'signin', payload: { alenviToken: token } });
};

export const { Provider, Context } = createAuthContext(authReducer, { signIn }, { alenviToken: null });
