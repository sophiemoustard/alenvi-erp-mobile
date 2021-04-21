import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext } from '../context/AuthContext';
import { navigationRef } from '../navigationRef';
import Authentication from '../screens/Authentication';
import Profile from '../screens/Profile';
import ForgotPassword from '../screens/ForgotPassword';

const MainStack = createStackNavigator();

const AppNavigation = () => {
  const { alenviToken, appIsReady, tryLocalSignIn } = useContext(AuthContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  const authScreens = { Authentication, ForgotPassword };
  const userScreens = { Profile };

  if (!appIsReady) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(alenviToken ? userScreens : authScreens)
          .map(([name, component]) => <MainStack.Screen key={name} name={name} component={component} />)}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
