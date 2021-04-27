import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherButton from '../../components/FeatherButton';
import TimeStampingProfile from '../../screens/TimeStampingProfile';
import Profile from '../../screens/Profile';
import { BLACK, GREY, BLUE } from '../../styles/colors';
import styles from './styles';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  interface tabBarProps{
    focused: Boolean,
  }

  const timeStampingIcon = ({ focused } : tabBarProps) => (focused
    ? <FeatherButton name='clock' size={20} color={BLUE} />
    : <FeatherButton name='clock' size={20} color={BLACK}/>
  );

  const profileIcon = ({ focused } : tabBarProps) => (focused
    ? <FeatherButton name='user' size={20} color={BLUE} />
    : <FeatherButton name='user' size={20} color={BLACK} />
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: BLUE,
        inactiveTintColor: GREY[800],
        labelStyle: styles.labelStyle,
      }}
    >
      <Tab.Screen name='Horodatage' component={TimeStampingProfile} options={{ tabBarIcon: timeStampingIcon }} />
      <Tab.Screen name='Profil' component={Profile} options={{ tabBarIcon: profileIcon }} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
