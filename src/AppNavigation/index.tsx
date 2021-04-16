import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import Authentication from '../screens/Authentication';
import Home from '../screens/Home';

const AppNavigation = () => {
  const { alenviToken } = useContext(AuthContext);

  return alenviToken ? <Home /> : <Authentication />;
};

export default AppNavigation;
