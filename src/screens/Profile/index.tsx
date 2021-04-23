import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import { Context as AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.view }>
      <Text>Welcome to Compani!!</Text>
      <NiSecondaryButton style={styles.button} title='Me déconnecter' onPress={signOut} />
    </View>
  );
};

export default Profile;
