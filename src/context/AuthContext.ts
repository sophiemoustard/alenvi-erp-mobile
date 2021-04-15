import createAuthContext, { StateType, ActionType } from './createAuthContext';
import Authentication from '../api/authentication';

const authReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'signin':
      return { ...state, alenviToken: action.payload };
    default:
      return state;
  }
};

const signIn = (dispatch: any) => async (payload: { email: string, password: string }) => {
  const { alenviToken } = await Authentication.authenticate(payload);
  dispatch({ type: 'signin', payload: alenviToken });
};

export const { Provider, Context } = createAuthContext(authReducer, { signIn }, { alenviToken: null });
