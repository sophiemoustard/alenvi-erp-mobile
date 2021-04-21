import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import NiButton from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  const goToAuthentication = async () => {
    await signOut({});
  };

  return (
    <View>
      <Text>Welcome to Compani!!</Text>
      <NiButton customStyles={{ button: styles.button, textButton: styles.textButton }}
        title='Me déconnecter' onPress={goToAuthentication} />
    </View>
  );
};

export default Profile;
