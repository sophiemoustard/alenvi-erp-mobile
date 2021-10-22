import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import TimeStampingProfile from '../../screens/timeStamping/TimeStampingProfile';
import Profile from '../../screens/Profile';
import { COPPER_GREY, COPPER } from '../../styles/colors';
import styles from './styles';

const Tab = createBottomTabNavigator();

const Home = () => {
  interface tabBarProps{
    focused: Boolean,
  }

  const timeStampingIcon = ({ focused } : tabBarProps) => (focused
    ? <Feather name='clock' size={20} color={COPPER[600]} />
    : <Feather name='clock' size={20} color={COPPER_GREY[800]} />
  );

  const profileIcon = ({ focused } : tabBarProps) => (focused
    ? <Feather name='user' size={20} color={COPPER[600]} />
    : <Feather name='user' size={20} color={COPPER_GREY[800]} />
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: COPPER[600],
        inactiveTintColor: COPPER_GREY[800],
        labelStyle: styles.labelStyle,
      }}
    >
      <Tab.Screen name='Horodatage' component={TimeStampingProfile} options={{ tabBarIcon: timeStampingIcon }} />
      <Tab.Screen name='Profil' component={Profile} options={{ tabBarIcon: profileIcon }} />
    </Tab.Navigator>
  );
};

export default Home;
