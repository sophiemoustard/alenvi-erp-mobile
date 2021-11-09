import React from 'react';
import { View, Text } from 'react-native';
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

  const unfocusedStyle = styles();

  const timeStampingIcon = ({ focused } : tabBarProps) => (
    <View style={unfocusedStyle.iconContainer}>
      <Feather name='clock' size={20} color={focused ? COPPER[600] : COPPER_GREY[800]} />
      <Text style={styles(focused).labelStyle}>Horodatage</Text>
    </View>
  );

  const profileIcon = ({ focused } : tabBarProps) => (
    <View style={unfocusedStyle.iconContainer}>
      <Feather name='user' size={20} color={focused ? COPPER[600] : COPPER_GREY[800]} />
      <Text style={styles(focused).labelStyle}>Profil</Text>
    </View>
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: unfocusedStyle.tabBar,
        activeTintColor: COPPER[600],
        inactiveTintColor: COPPER_GREY[800],
        labelStyle: unfocusedStyle.labelStyle,
        showLabel: false,
      }}
    >
      <Tab.Screen name='TimeStampingProfile' component={TimeStampingProfile}
        options={{ tabBarIcon: timeStampingIcon }} />
      <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon: profileIcon }} />
    </Tab.Navigator>
  );
};

export default Home;
