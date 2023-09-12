import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Agenda from '../../screens/timeStamping/Agenda';
import Profile from '../../screens/Profile';
import { COPPER_GREY, COPPER } from '../../styles/colors';
import styles from './styles';

const Tab = createBottomTabNavigator();

const Home = () => {
  interface tabBarProps{
    focused: Boolean,
  }

  const unfocusedStyle = styles();

  const agendaIcon = ({ focused } : tabBarProps) => (
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
      screenOptions={{
        tabBarStyle: unfocusedStyle.tabBar,
        tabBarActiveTintColor: COPPER[600],
        tabBarInactiveTintColor: COPPER_GREY[800],
        tabBarLabelStyle: unfocusedStyle.labelStyle,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen name='Agenda' component={Agenda}
        options={{ tabBarIcon: agendaIcon }} />
      <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon: profileIcon }} />
    </Tab.Navigator>
  );
};

export default Home;
