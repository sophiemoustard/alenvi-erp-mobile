import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherButton from '../../components/FeatherButton';
import TimeStampingProfile from '../../screens/TimeStampingProfile';
import Profile from '../../screens/Profile';
import { NavigationType } from '../../types/NavigationType';
import { BLACK, GREY, PINK } from '../../styles/colors';
import styles from './styles';

const Tab = createBottomTabNavigator();

interface HomeProps {
  navigation: NavigationType,
}

const Home = ({ navigation }: HomeProps) => {
  interface tabBarProps{
    focused: Boolean,
  }

  const goToTimeStampingScreen = () => { navigation.navigate('TimeStampingProfile'); };
  const goToProfileScreen = () => { navigation.navigate('Profile'); };

  const timeStampingIcon = ({ focused } : tabBarProps) => (focused
    ? <FeatherButton name='clock' size={20} color={PINK[500]} onPress={goToTimeStampingScreen}/>
    : <FeatherButton name='clock' size={20} color={BLACK} onPress={goToTimeStampingScreen}/>
  );

  const profileIcon = ({ focused } : tabBarProps) => (focused
    ? <FeatherButton name='user' size={20} color={PINK[500]} onPress={goToProfileScreen}/>
    : <FeatherButton name='user' size={20} color={BLACK} onPress={goToProfileScreen}/>
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: PINK[500],
        inactiveTintColor: GREY[800],
        labelStyle: styles.labelStyle,
      }}
    >
      <Tab.Screen name='Horodatage' component={TimeStampingProfile} options={{ tabBarIcon: timeStampingIcon }} />
      <Tab.Screen name='Profil' component={Profile} options={{ tabBarIcon: profileIcon }} />
    </Tab.Navigator>
  );
};

export default Home;
