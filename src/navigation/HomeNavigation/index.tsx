import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import TimeStampingProfile from '../../screens/TimeStampingProfile';
import Profile from '../../screens/Profile';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name='Horodatage' component={TimeStampingProfile}
      options={{
        tabBarIcon: () => (
          <AntDesign name="clockcircleo" size={20} color='black' />
        ),
      }}
    />
    <Tab.Screen name='Profil' component={Profile}
      options={{
        tabBarIcon: () => (
          <AntDesign name="user" size={20} color='black' />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomeNavigation;
