import React, { useReducer, createContext } from 'react';

export type boundFunctionsType = (payload?: any) => Promise<void>;

export interface StateType {
  alenviToken: string | null,
  appIsReady: boolean,
  signIn: boundFunctionsType,
  signOut: boundFunctionsType,
  tryLocalSignIn: boundFunctionsType,
}

export interface ActionType {
  type: string,
  payload?: any,
}

export type functionType = Record<string, (dispatch: React.Dispatch<ActionType>) => boundFunctionsType>;

interface createAuthContextType {
  Context: React.Context<StateType>,
  Provider: (children: {children: React.ReactNode}) => JSX.Element
}

export default (
  reducer: (state: StateType, actions: ActionType) => StateType,
  functions: functionType,
  defaultValue: StateType
): createAuthContextType => {
  const Provider = ({ children }: {children: React.ReactNode}) => {
    const [{ alenviToken, appIsReady }, dispatch] = useReducer(reducer, defaultValue);
    const state = { alenviToken, appIsReady };

    const boundFunctions: any = {};
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in functions) {
      boundFunctions[key] = functions[key](dispatch);
    }

    return (
      <Context.Provider value={{ ...state, ...boundFunctions } as StateType}>
        {children}
      </Context.Provider>
    );
  };
  const Context = createContext<StateType>(defaultValue);

  return { Context, Provider };
};
