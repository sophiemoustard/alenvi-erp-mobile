import React, { useReducer, createContext } from 'react';

interface createAuthContextType {
  Context: React.Context<StateType>,
  Provider: (children: {children: React.ReactNode}) => JSX.Element
}

export interface StateType {
  alenviToken: string | null,
}

export interface ActionType {
  type: string,
  payload: any,
}

export default (
  reducer: (state: StateType, actions: ActionType) => StateType,
  actions: any,
  defaultValue: StateType
): createAuthContextType => {
  const Provider = ({ children }: {children: React.ReactNode}) => {
    const [{ alenviToken }, dispatch] = useReducer(reducer, defaultValue);
    const state = { alenviToken };

    const boundActions: any = {};
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ ...state, ...boundActions } as StateType}>
        {children}
      </Context.Provider>
    );
  };
  const Context = createContext<StateType>(defaultValue);

  return { Context, Provider };
};
