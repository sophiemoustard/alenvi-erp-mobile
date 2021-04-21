import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import { Context as AuthContext } from '../../context/AuthContext';
import { GREY } from '../../styles/colors';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.view }>
      <Text>Welcome to Compani!!</Text>
      <NiSecondaryButton style={styles.button} color={GREY[600]} title='Me déconnecter' onPress={signOut} />
    </View>
  );
};

export default Profile;
