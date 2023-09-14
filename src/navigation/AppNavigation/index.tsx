import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext } from '../../context/AuthContext';
import { navigationRef } from '../../navigationRef';
import Authentication from '../../screens/Authentication';
import PasswordReset from '../../screens/PasswordReset';
import PasswordEdition from '../../screens/PasswordEdition';
import ForgotPassword from '../../screens/ForgotPassword';
import ProfileEdition from '../../screens/ProfileEdition';
import ManualTimeStamping from '../../screens/timeStamping/ManualTimeStamping';
import QRCodeScanner from '../../screens/timeStamping/QRCodeScanner';
import EventEdition from '../../screens/timeStamping/EventEdition';
import CustomerProfile from '../../screens/CustomerProfile';
import Home from '../Home';

const MainStack = createStackNavigator();

const AppNavigation = () => {
  const { companiToken, appIsReady, tryLocalSignIn } = useContext(AuthContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);

  const authScreens = { Authentication, ForgotPassword, PasswordReset };
  const userScreens = {
    Home,
    ManualTimeStamping,
    QRCodeScanner,
    PasswordEdition,
    ProfileEdition,
    EventEdition,
    CustomerProfile,
  };

  if (!appIsReady) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(companiToken ? userScreens : authScreens)
          .map(([name, component]) => <MainStack.Screen key={name} name={name} component={component} />)}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
